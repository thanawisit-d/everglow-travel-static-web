import HomeClient from './home-client';
import RecentlyViewed from '@/components/RecentlyViewed';

export function generateStaticParams() {
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

const pageMeta = {
  th: {
    title: 'Everglow Travel',
    description: 'เอเวอร์โกลว์ ท่องเที่ยว บริการทัวร์ในประเทศและต่างประเทศ พร้อมทีมงานมืออาชีพ',
  },
  en: {
    title: 'Everglow Travel',
    description: 'Everglow Travel offers premium domestic and outbound tour packages with professional service.',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = pageMeta[locale] || pageMeta.th;
  return {
    title: { absolute: 'Everglow Travel' },
    description: meta.description,
    openGraph: {
      title: 'Everglow Travel',
      description: meta.description,
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      url: `/${locale}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Everglow Travel',
      description: meta.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        th: '/th',
        en: '/en',
      },
    },
  };
}

export default async function LocalePage({ params }) {
  const { locale } = await params;
  return (
    <>
      <HomeClient locale={locale} />
      <RecentlyViewed locale={locale} />
    </>
  );
}
