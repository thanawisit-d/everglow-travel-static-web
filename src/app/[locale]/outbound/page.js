import { Suspense } from 'react';
import toursData from '@/data/tours.json';
import OutboundClient from './outbound-client';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
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
