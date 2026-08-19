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
      'x-default': '/',
    },
  },
  other: {
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function LandingLayout({ children }) {
  return children;
}
