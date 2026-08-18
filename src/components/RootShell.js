'use client';

import { useState, useEffect, useCallback } from 'react';
import { Kanit, Poppins, Koulen } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { FacebookPixel } from '@/components/FacebookPixel';
import CookieConsent from '@/components/CookieConsent';
import SkipToContent from '@/components/SkipToContent';
import ScrollToTop from '@/components/ScrollToTop';
import "../app/globals.css";

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-kanit',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-koulen',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

export default function RootShell({ lang, children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const fbId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const [consent, setConsent] = useState({ analytics: false, marketing: false });

  const handleConsent = useCallback((c) => {
    setConsent(c);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Everglow Travel',
    legalName: 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด (สำนักงานใหญ่)',
    taxID: '0125568006295',
    url: siteUrl,
    telephone: '+66996326146',
    email: 'everglowtravel@gmail.com',
    image: `${siteUrl}/og-image.jpg`,
    sameAs: [
      'https://www.facebook.com/people/Everglow-Travel/61580670863894/',
      'https://www.instagram.com/everglow_travel',
      'https://lin.ee/xXcNI1w',
    ],
  };

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${kanit.variable} ${poppins.variable} ${koulen.variable}`}>
        {gaId && <GoogleAnalytics gaId={gaId} consent={consent.analytics} />}
        {fbId && <FacebookPixel fbId={fbId} consent={consent.marketing} />}
        <CookieConsent lang={lang} onConsent={handleConsent} />
        <SkipToContent href="#main-content" />
        <div className="min-h-screen w-full relative">
          <div className="absolute inset-0 z-0 bg-gradient-custom" />
          <div id="main-content" className="relative z-[1]">{children}</div>
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
