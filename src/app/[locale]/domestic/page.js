import { Suspense } from 'react';
import toursData from '@/data/tours.json';
import DomesticClient from './domestic-client';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
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
