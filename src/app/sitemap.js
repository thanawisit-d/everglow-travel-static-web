export const dynamic = 'force-static';

import toursDataTh from '@/data/tours-th.json';
import reviewsData from '@/data/reviews.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

const staticPages = [
  '', '/domestic', '/outbound', '/about', '/contact', '/reviews',
];

export default async function sitemap() {
  const locales = ['th', 'en'];
  const entries = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  for (const locale of locales) {
    for (const tour of toursDataTh) {
      entries.push({
        url: `${siteUrl}/${locale}/tours/${tour.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  const reviewIds = [...new Set(reviewsData.map((r) => r.id))];
  for (const locale of locales) {
    for (const reviewId of reviewIds) {
      entries.push({
        url: `${siteUrl}/${locale}/reviews/${reviewId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
