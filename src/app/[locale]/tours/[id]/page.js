import toursData from '@/data/tours.json';
import TourDetail from '@/components/TourDetail';
import config from '@/data/site-config.json';

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
  const t = config[locale] || config.th;
  const tour = toursData.find((t) => t.id === id) || null;
  if (!tour) {
    return (
      <div className="page tour-detail-page">
        <div className="tour-detail-container not-found">
          <h1>{t.tourNotFound}</h1>
          <p className="not-found-msg">
            {t.tourNotFoundMsg}
          </p>
          <a href={`/${locale}`} className="back-btn not-found-btn">
            {t.backToHome}
          </a>
        </div>
      </div>
    );
  }
  return <TourDetail locale={locale} tour={tour} />;
}
