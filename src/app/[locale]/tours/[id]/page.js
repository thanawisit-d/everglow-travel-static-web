import toursData from '@/data/tours.json';
import TourDetail from '@/components/TourDetail';

export function generateStaticParams() {
  const ids = toursData.map((t) => t.id);
  const locales = ['th', 'en'];
  const params = [];
  for (const locale of locales) {
    for (const id of ids) {
      params.push({ locale, id });
    }
  }
  return params;
}

export default async function TourDetailPage({ params }) {
  const { locale, id } = await params;
  const tour = toursData.find((t) => t.id === id) || null;
  return <TourDetail locale={locale} tour={tour} />;
}
