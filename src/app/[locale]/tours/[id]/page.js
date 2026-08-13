import { notFound } from 'next/navigation';
import toursDataTh from '@/data/tours-th.json';
import TourDetail from '@/components/TourDetail';

export function generateStaticParams() {
  const locales = ['th', 'en'];
  const params = [];
  for (const locale of locales) {
    for (const tour of toursDataTh) {
      params.push({ locale, id: tour.id });
    }
  }
  return params;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const tour = toursDataTh.find((t) => t.id === id);
  if (!tour) {
    return { title: 'Tour Not Found' };
  }
  const isEn = locale === 'en';
  const desc = isEn && tour.desc_en ? tour.desc_en : tour.desc;
  const raw = desc || tour.id;
  const name = raw.length > 70 ? `${raw.slice(0, 70).trimEnd()}…` : raw;
  const tourPath = `/tours/${tour.id}`;
  return {
    title: name,
    description: desc ? `${desc} | ${isEn ? 'Starting at' : 'เริ่มต้น'} ${tour.price} บาท` : `Tour ${tour.id}`,
    openGraph: {
      title: name,
      description: desc || `Tour ${tour.id}`,
      locale: isEn ? 'en_US' : 'th_TH',
      url: `/${locale}${tourPath}`,
      images: tour.image ? [{ url: `${siteUrl}${tour.image.startsWith('/') ? '' : '/'}${tour.image}`, width: 800, height: 600 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: desc || `Tour ${tour.id}`,
      images: tour.image ? [`${siteUrl}${tour.image.startsWith('/') ? '' : '/'}${tour.image}`] : [],
    },
    alternates: {
      canonical: `/${locale}${tourPath}`,
      languages: {
        th: `/th${tourPath}`,
        en: `/en${tourPath}`,
        'x-default': `/th${tourPath}`,
      },
    },
  };
}

export default async function TourDetailPage({ params }) {
  const { locale, id } = await params;
  const tour = toursDataTh.find((t) => t.id === id) || null;
  if (!tour) {
    notFound();
  }
  return (
    <>
      <TourJSONLD tour={tour} siteUrl={siteUrl} locale={locale} />
      <TourDetail locale={locale} tour={tour} />
    </>
  );
}

function isoDurationFrom(duration) {
  if (!duration) return null;
  const m = String(duration).match(/(\d+)\s*day/i);
  return m ? `P${m[1]}D` : null;
}

function TourJSONLD({ tour, siteUrl, locale }) {
  const price = parseFloat(String(tour.price).replace(/,/g, '')) || 0;
  const tourUrl = `${siteUrl}/${locale}/tours/${tour.id}`;
  const listPath = tour.type === 'domestic' ? 'domestic' : 'outbound';
  const listName = tour.type === 'domestic' ? 'Domestic Tours' : 'Outbound Tours';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.desc || tour.id,
    description: tour.desc_en || tour.desc || '',
    image: tour.image ? `${siteUrl}${tour.image.startsWith('/') ? '' : '/'}${tour.image}` : undefined,
    url: tourUrl,
    duration: isoDurationFrom(tour.duration_en || tour.duration),
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
      url: tourUrl,
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Everglow Travel', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: listName, item: `${siteUrl}/${locale}/${listPath}` },
      { '@type': 'ListItem', position: 3, name: tour.desc || tour.id, item: tourUrl },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
