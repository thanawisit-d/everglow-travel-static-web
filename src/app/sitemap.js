export const dynamic = 'force-static';

import toursData from '@/data/tours.json';

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

  const tourIds = [...new Set(toursData.map((t) => t.id))];
  for (const locale of locales) {
    for (const tourId of tourIds) {
      entries.push({
        url: `${siteUrl}/${locale}/tours/${tourId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
