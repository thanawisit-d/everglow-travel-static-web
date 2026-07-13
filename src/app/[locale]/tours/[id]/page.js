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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const tour = toursData.find((t) => t.id === id);
  if (!tour) {
    return { title: 'Tour Not Found' };
  }
  const isEn = locale === 'en';
  const desc = isEn && tour.desc_en ? tour.desc_en : tour.desc;
  const name = desc?.split(isEn ? ' tour' : ' เที่ยว')[0] || tour.id;
  return {
    title: name,
    description: desc ? `${desc} | ${isEn ? 'Starting at' : 'เริ่มต้น'} ${tour.price} บาท` : `Tour ${tour.id}`,
    openGraph: {
      title: name,
      description: desc || `Tour ${tour.id}`,
      url: `/${locale}/tours/${tour.id}`,
      images: tour.image ? [{ url: `${siteUrl}${tour.image.startsWith('/') ? '' : '/'}${tour.image}`, width: 800, height: 600 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: desc || `Tour ${tour.id}`,
      images: tour.image ? [`${siteUrl}${tour.image.startsWith('/') ? '' : '/'}${tour.image}`] : [],
    },
    alternates: {
      canonical: `/${locale}/tours/${tour.id}`,
    },
  };
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
  return (
    <>
      <TourJSONLD tour={tour} siteUrl={siteUrl} />
      <TourDetail locale={locale} tour={tour} />
    </>
  );
}

function TourJSONLD({ tour, siteUrl }) {
  const price = parseFloat(String(tour.price).replace(/,/g, '')) || 0;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tour.desc || tour.id,
    description: tour.desc_en || tour.desc || '',
    image: tour.image ? `${siteUrl}${tour.image.startsWith('/') ? '' : '/'}${tour.image}` : undefined,
    sku: tour.id,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/${tour.type === 'domestic' ? 'th' : 'en'}/tours/${tour.id}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
