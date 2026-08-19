import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const description = isEn
    ? 'Everglow Travel offers premium domestic and outbound tour packages with professional service.'
    : 'เอเวอร์โกลว์ ท่องเที่ยว บริการทัวร์ในประเทศและต่างประเทศ พร้อมทีมงานมืออาชีพ';
  return {
    title: {
      default: 'Everglow Travel',
      template: '%s | Everglow Travel',
    },
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'th_TH',
      siteName: 'Everglow Travel',
      title: 'Everglow Travel',
      description,
      url: `/${locale}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Everglow Travel',
      description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/${locale}`,
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
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
