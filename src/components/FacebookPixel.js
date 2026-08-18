'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export function FacebookPixel({ fbId, consent }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.fbq) return;

    if (consent) {
      window.fbq('consent', 'grant');
      window.fbq('track', 'PageView');
    } else {
      window.fbq('consent', 'revoke');
    }
  }, [consent]);

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
          fbq('consent', 'revoke');
          fbq('init', '${fbId}');
        `}
      </Script>
      {consent && (
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
      )}
    </>
  );
}
