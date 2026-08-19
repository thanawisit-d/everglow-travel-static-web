import { Kanit, Poppins, Koulen } from 'next/font/google';
import RootShell from '@/components/RootShell';
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

export default function RootLayout({ children }) {
  return (
    <html lang="th">
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
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
