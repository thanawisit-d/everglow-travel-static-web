import Reviews from '@/components/Reviews';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

const meta = {
  th: { title: 'รีวิว', description: 'รีวิวและรูปภาพความประทับใจจากลูกค้า Everglow Travel' },
  en: { title: 'Reviews', description: 'See what our customers say about Everglow Travel experiences.' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = meta[locale] || meta.th;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      url: `/${locale}/reviews`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/${locale}/reviews`,
      languages: {
        th: '/th/reviews',
        en: '/en/reviews',
      },
    },
  };
}

export default async function ReviewsPage({ params }) {
  const { locale } = await params;
  return (
    <div className="reviews-page">
      <Reviews locale={locale} standalone />
    </div>
  );
}
