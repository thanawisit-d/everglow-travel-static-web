import reviewsData from '@/data/reviews.json';
import ReviewDetail from '@/components/ReviewDetail';
import config from '@/data/site-config.json';

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const review of reviewsData) {
    const locales = review.category === 'outbound' ? ['th'] : ['th', 'en'];
    for (const locale of locales) {
      params.push({ locale, id: review.id });
    }
  }
  return params;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglow-travel-static-web.vercel.app';

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const review = reviewsData.find((r) => r.id === id);
  const t = config[locale] || config.th;
  if (!review || (locale === 'en' && review.category === 'outbound')) {
    return { title: t.tourNotFound };
  }
  const isEn = locale === 'en';
  const displayTag = isEn && review.tag_en ? review.tag_en : review.tag;
  const displayText = isEn && review.text_en ? review.text_en : review.text;
  const desc = displayText ? displayText.slice(0, 160) : displayTag;
  const reviewPath = `/reviews/${review.id}`;
  const isThOnly = review.category === 'outbound';
  return {
    title: displayTag,
    description: desc,
    openGraph: {
      title: displayTag,
      description: desc,
      locale: isEn ? 'en_US' : 'th_TH',
      url: `/${locale}${reviewPath}`,
      images: review.image ? [{ url: `${siteUrl}/${encodeURI(review.image)}`, width: 800, height: 600 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTag,
      description: desc,
      images: review.image ? [`${siteUrl}/${encodeURI(review.image)}`] : [],
    },
    alternates: isThOnly
      ? {
          canonical: `/th${reviewPath}`,
          languages: {
            th: `/th${reviewPath}`,
            'x-default': `/th${reviewPath}`,
          },
        }
      : {
          canonical: `/${locale}${reviewPath}`,
          languages: {
            th: `/th${reviewPath}`,
            en: `/en${reviewPath}`,
            'x-default': `/th${reviewPath}`,
          },
        },
  };
}

export default async function ReviewDetailPage({ params }) {
  const { locale, id } = await params;
  const t = config[locale] || config.th;
  const review = reviewsData.find((r) => r.id === id) || null;
  if (!review || (locale === 'en' && review.category === 'outbound')) {
    return (
      <div className="page review-detail-page">
        <div className="review-detail-body not-found">
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
  return <ReviewDetail review={review} locale={locale} />;
}
