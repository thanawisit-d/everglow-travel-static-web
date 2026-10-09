export const dynamic = 'force-static';

import toursDataTh from '@/data/tours-th.json';
import toursDataEn from '@/data/tours-en.json';
import reviewsTh from '@/data/reviews-th.json';
import reviewsEn from '@/data/reviews-en.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglow-travel-static-web.vercel.app';
const locales = ['th', 'en'];

export default async function sitemap() {
  const entries = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  ];

  const staticPages = [
    '', '/domestic', '/outbound', '/about', '/contact', '/reviews', '/privacy',
  ];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 0.9 : 0.7,
        alternates: {
          languages: {
            th: `${siteUrl}/th${page}`,
            en: `${siteUrl}/en${page}`,
          },
        },
      });
    }
  }

  const enIds = new Set(toursDataEn.map((t) => t.id));
  for (const tour of toursDataTh) {
    entries.push({
      url: `${siteUrl}/th/tours/${tour.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      ...(enIds.has(tour.id)
        ? { alternates: { languages: { th: `${siteUrl}/th/tours/${tour.id}`, en: `${siteUrl}/en/tours/${tour.id}` } } }
        : {}),
    });
  }

  const thIds = new Set(toursDataTh.map((t) => t.id));
  for (const tour of toursDataEn) {
    entries.push({
      url: `${siteUrl}/en/tours/${tour.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      ...(thIds.has(tour.id)
        ? { alternates: { languages: { th: `${siteUrl}/th/tours/${tour.id}`, en: `${siteUrl}/en/tours/${tour.id}` } } }
        : {}),
    });
  }

  const reviewEnIds = new Set(reviewsEn.map((r) => r.id));
  for (const review of reviewsTh) {
    const hasEn = reviewEnIds.has(review.id);
    entries.push({
      url: `${siteUrl}/th/reviews/${review.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      ...(hasEn
        ? { alternates: { languages: { th: `${siteUrl}/th/reviews/${review.id}`, en: `${siteUrl}/en/reviews/${review.id}` } } }
        : {}),
    });
  }

  for (const review of reviewsEn) {
    entries.push({
      url: `${siteUrl}/en/reviews/${review.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: { languages: { th: `${siteUrl}/th/reviews/${review.id}`, en: `${siteUrl}/en/reviews/${review.id}` } },
    });
  }

  return entries;
}