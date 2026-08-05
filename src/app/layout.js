import { Kanit, Poppins, Cinzel } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { FacebookPixel } from '@/components/FacebookPixel';
import FloatingContact from '@/components/FloatingContact';
import SkipToContent from '@/components/SkipToContent';
import ScrollToTop from '@/components/ScrollToTop';
import "./globals.css";

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

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

export const metadata = {
  title: {
    default: 'Everglow Travel',
    template: '%s | Everglow Travel',
  },
  description: 'Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    siteName: 'Everglow Travel',
    title: 'Everglow Travel',
    description: 'Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Everglow Travel',
    description: 'Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      th: '/th',
      en: '/en',
    },
  },
  other: {
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

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
  address: {
    '@type': 'PostalAddress',
    streetAddress: '25/163 ม.4 ต.บางไผ่ อ.เมือง',
    addressLocality: 'นนทบุรี',
    addressRegion: 'นนทบุรี',
    postalCode: '11000',
    addressCountry: 'TH',
  },
  sameAs: [
    'https://www.facebook.com/people/Everglow-Travel/61580670863894/',
    'https://www.instagram.com/everglow_travel',
    'https://lin.ee/xXcNI1w',
  ],
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const fbId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" href="/assets/images/backgrounds/Home4.jpg" as="image" fetchPriority="high" />
      </head>
      <body className={`${kanit.variable} ${poppins.variable} ${cinzel.variable}`}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {fbId && <FacebookPixel fbId={fbId} />}
        <SkipToContent href="#main-content" />
        <div className="min-h-screen w-full relative">
          <div className="absolute inset-0 z-0 bg-gradient-custom" />
          <div id="main-content" className="relative z-[1]">{children}</div>
          <ScrollToTop />
        </div>
        <FloatingContact />
      </body>
    </html>
  );
}