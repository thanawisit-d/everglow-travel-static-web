import HomeClient from './home-client';

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
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocalePage({ params }) {
  const { locale } = await params;
  return <HomeClient locale={locale} />;
}
