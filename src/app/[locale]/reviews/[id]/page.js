import reviewsTh from '@/data/reviews-th.json';
import reviewsEn from '@/data/reviews-en.json';
import ReviewDetail from '@/components/ReviewDetail';
import config from '@/data/site-config.json';

const REVIEWS_BY_LOCALE = { th: reviewsTh, en: reviewsEn };

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const review of reviewsTh) params.push({ locale: 'th', id: review.id });
  for (const review of reviewsEn) params.push({ locale: 'en', id: review.id });
  return params;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglow-travel-static-web.vercel.app';

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  const review = (REVIEWS_BY_LOCALE[locale] || reviewsTh).find((r) => r.id === id);
  const t = config[locale] || config.th;
  if (!review) {
    return { title: t.tourNotFound };
  }
  const isEn = locale === 'en';
  const displayTag = review.tag;
  const displayText = review.text;
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
  const review = (REVIEWS_BY_LOCALE[locale] || reviewsTh).find((r) => r.id === id) || null;
  if (!review) {
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
