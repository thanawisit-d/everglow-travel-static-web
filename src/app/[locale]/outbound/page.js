import { Suspense } from 'react';
import toursData from '@/data/tours.json';
import OutboundClient from './outbound-client';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

const meta = {
  th: { title: 'ทัวร์ต่างประเทศ', description: 'ทัวร์ต่างประเทศ พร้อมเปิดประสบการณ์การเดินทางสู่จุดหมายปลายทางทั่วโลก' },
  en: { title: 'Outbound Tours', description: 'Explore extraordinary destinations around the world with Everglow Travel.' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = meta[locale] || meta.th;
  return { title: m.title, description: m.description };
}

export default async function OutboundPage({ params }) {
  const { locale } = await params;
  const tours = toursData.filter((t) => t.type === 'outbound');
  return (
    <Suspense fallback={<section className="page tour-list-page active"><h1>{locale === 'en' ? 'Outbound Tours' : 'ทัวร์ต่างประเทศ'}</h1></section>}>
      <OutboundClient locale={locale} tours={tours} />
    </Suspense>
  );
}
