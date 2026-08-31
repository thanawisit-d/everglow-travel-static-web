import toursTh from '@/data/tours-th.json';
import toursEn from '@/data/tours-en.json';
import type { Locale } from '@/types/api';
import type { Tour } from '@/types/tour';
import { tourCountryLabel } from '@/types/tour';
import { toNumber } from '@/utils/price';

const cache: Record<Locale, readonly Tour[]> = {
  th: Object.freeze(toursTh as unknown as Tour[]),
  en: Object.freeze(toursEn as unknown as Tour[]),
};

export function getTours(locale: Locale = 'th'): Tour[] {
  return [...cache[locale]];
}

export function getTourById(id: string, locale: Locale = 'th'): Tour | undefined {
  return cache[locale].find((t) => t.id === id);
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

export function getCountries(locale: Locale = 'th'): string[] {
  const set = new Set<string>();
  for (const t of cache[locale]) {
    set.add(tourCountryLabel(t));
  }
  return Array.from(set).filter(Boolean).sort();
}
