'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export function GoogleAnalytics({ gaId, consent }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.gtag) return;

    if (consent) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      if (!tracked.current) {
        tracked.current = true;
        window.gtag('event', 'page_view', { page_path: window.location.pathname });
      }
    } else {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
  }, [consent]);

  if (!consent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
