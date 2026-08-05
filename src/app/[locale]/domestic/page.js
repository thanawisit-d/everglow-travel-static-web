import { Suspense } from 'react';
import toursDataTh from '@/data/tours-th.json';
import toursDataEn from '@/data/tours-en.json';
import DomesticClient from './domestic-client';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

const meta = {
  th: { title: 'ทัวร์ในประเทศ', description: 'ทัวร์ในประเทศ เที่ยวไทย สัมผัสประสบการณ์สุดพิเศษทั่วทุกจังหวัด' },
  en: { title: 'Thailand Tours', description: 'Discover Thailand with premium domestic tour packages across all provinces.' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = meta[locale] || meta.th;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      url: `/${locale}/domestic`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/${locale}/domestic`,
      languages: {
        th: '/th/domestic',
        en: '/en/domestic',
      },
    },
  };
}

export default async function DomesticPage({ params }) {
  const { locale } = await params;
  const source = locale === 'th' ? toursDataTh : toursDataEn;
  const tours = source.filter((t) => t.type === 'domestic');
  return (
    <Suspense fallback={<section className="page tour-list-page active"><h1>{locale === 'en' ? 'Thailand Tours' : 'ทัวร์ในประเทศ'}</h1></section>}>
      <DomesticClient locale={locale} tours={tours} />
    </Suspense>
  );
}
