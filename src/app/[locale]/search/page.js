import { Suspense } from 'react';
import toursData from '@/data/tours.json';
import SearchClient from './search-client';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

export default async function SearchPage({ params }) {
  const { locale } = await params;
  return (
    <Suspense fallback={<section className="page search-results-page active"><h1>{locale === 'en' ? 'Search Results' : 'ผลการค้นหา'}</h1></section>}>
      <SearchClient locale={locale} tours={toursData} />
    </Suspense>
  );
}
