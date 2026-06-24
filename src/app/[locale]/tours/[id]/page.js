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
  if (!tour) {
    return (
      <div className="page tour-detail-page">
        <div className="tour-detail-container" style={{ textAlign: 'center', padding: '80px 34px' }}>
          <h1>{locale === 'en' ? 'Tour Not Found' : 'ไม่พบข้อมูลทัวร์'}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>
            {locale === 'en' ? 'The tour you are looking for does not exist or has been removed.' : 'ไม่พบข้อมูลทัวร์ที่คุณค้นหา หรือทัวร์อาจถูกลบไปแล้ว'}
          </p>
          <a href={`/${locale}`} className="back-btn" style={{ position: 'static', display: 'inline-flex', marginTop: 24 }}>
            {locale === 'en' ? 'Back to Home' : 'กลับหน้าแรก'}
          </a>
        </div>
      </div>
    );
  }
  return <TourDetail locale={locale} tour={tour} />;
}
