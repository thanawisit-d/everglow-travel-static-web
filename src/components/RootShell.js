'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { FacebookPixel } from '@/components/FacebookPixel';
import CookieConsent from '@/components/CookieConsent';
import SkipToContent from '@/components/SkipToContent';
import ScrollToTop from '@/components/ScrollToTop';

export default function RootShell({ children }) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'th';

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const fbId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const [consent, setConsent] = useState({ analytics: false, marketing: false });

  const handleConsent = useCallback((c) => {
    setConsent(c);
  }, []);

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} consent={consent.analytics} />}
      {fbId && <FacebookPixel fbId={fbId} consent={consent.marketing} />}
      <CookieConsent lang={locale} onConsent={handleConsent} />
      <SkipToContent href="#main-content" />
      <div className="min-h-screen w-full relative">
        <div className="absolute inset-0 z-0 bg-gradient-custom" />
        <div id="main-content" className="relative z-[1]">{children}</div>
        <ScrollToTop />
      </div>
    </>
  );
}
