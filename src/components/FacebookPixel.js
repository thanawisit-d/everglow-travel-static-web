'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export function FacebookPixel({ fbId, consent }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.fbq) return;

    if (consent) {
      window.fbq('consent', 'grant');
      if (!tracked.current) {
        tracked.current = true;
        window.fbq('track', 'PageView');
      }
    } else {
      window.fbq('consent', 'revoke');
    }
  }, [consent]);

  if (!consent) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('consent', 'grant');
          fbq('init', '${fbId}');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${fbId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
