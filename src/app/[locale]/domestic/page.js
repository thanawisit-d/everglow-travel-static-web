import { Suspense } from 'react';
import toursData from '@/data/tours.json';
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
  return { title: m.title, description: m.description };
}

export default async function DomesticPage({ params }) {
  const { locale } = await params;
  const tours = toursData.filter((t) => t.type === 'domestic');
  return (
    <Suspense fallback={<section className="page tour-list-page active"><h1>{locale === 'en' ? 'Thailand Tours' : 'ทัวร์ในประเทศ'}</h1></section>}>
      <DomesticClient locale={locale} tours={tours} />
    </Suspense>
  );
}
