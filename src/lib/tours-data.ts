import toursTh from '@/data/tours-th.json';
import toursEn from '@/data/tours-en.json';
import type { Locale } from '@/types/api';
import type { Tour } from '@/types/tour';
import { tourCountryLabel } from '@/types/tour';
import { toNumber } from '@/utils/price';
import { THAI_MONTHS, buildMonthPrefix } from '@/lib/search-constants';

const cache: Record<Locale, readonly Tour[]> = {
  th: Object.freeze(toursTh as unknown as Tour[]),
  en: Object.freeze(toursEn as unknown as Tour[]),
};

export function getTours(locale: Locale = 'th'): Tour[] {
  return [...cache[locale]];
}

export function getPopularTours(locale: Locale = 'th'): Tour[] {
  return cache[locale]
    .filter((t) => t.popular === true)
    .sort((a, b) => (a.popularOrder ?? 999) - (b.popularOrder ?? 999))
    .slice(0, 5);
}

export function searchTours(keyword: string, locale: Locale = 'th'): Tour[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return getTours(locale);
  return cache[locale].filter((t) => {
    const haystack = [
      tourCountryLabel(t),
      t.city,
      t.desc,
      t.desc_en,
      t.shortDesc,
      t.id,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export interface TourFilter {
  country?: string;
  type?: Tour['type'];
  minPrice?: number;
  maxPrice?: number;
}

export function filterTours(filters: TourFilter, locale: Locale = 'th'): Tour[] {
  return cache[locale].filter((t) => {
    if (filters.country) {
      const label = tourCountryLabel(t);
      if (label !== filters.country) return false;
    }
    if (filters.type && t.type !== filters.type) return false;
    const price = toNumber(t.price);
    if (filters.minPrice !== undefined && price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
    return true;
  });
}

function matchesCountry(tour: Tour, country?: string): boolean {
  if (!country) return true;
  return typeof tour.country === 'string'
    ? tour.country === country
    : Array.isArray(tour.country) && tour.country.includes(country);
}

export function filterToursByPrefix(
  prefix: string,
  locale: Locale = 'th',
  country?: string,
): Tour[] {
  return cache[locale].filter((t) => {
    if (t.startMonth?.startsWith(prefix) !== true) return false;
    return matchesCountry(t, country);
  });
}

export function filterToursByMonth(
  locale: Locale = 'th',
  month: string,
  country?: string,
): Tour[] {
  const monthNumber = THAI_MONTHS[month];
  if (!monthNumber) return [];
  const prefix = buildMonthPrefix(monthNumber, new Date().getFullYear());
  return filterToursByPrefix(prefix, locale, country);
}

export function getCountryNames(locale: Locale = 'th'): string[] {
  const set = new Set<string>();
  for (const t of cache[locale]) {
    if (typeof t.country === 'string') set.add(t.country);
    else if (Array.isArray(t.country)) t.country.forEach((c) => set.add(c));
  }
  return Array.from(set).sort((a, b) => b.length - a.length);
}
