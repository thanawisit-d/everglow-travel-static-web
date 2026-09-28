import { getYearMonthPrefix } from '@/lib/search-constants';
import { filterToursByPrefix, getTours } from '@/lib/tours-data';
import type { Locale } from '@/types/api';
import type { Tour } from '@/types/tour';

const MAX_FALLBACK_MONTHS = 3;
const MAX_TOURS = 6;

const DEFAULT_FEATURED_IDS: readonly string[] = [
  'EGT1D-02',
  'EGT1D-22',
  'EGT-SP-01',
  'EGT3D2N-FP-14',
  'EGT4D3N-FP-06',
  'EGT4D3N-FP-07',
];

export interface MonthlySelectionResult {
  tours: Tour[];
  sourceMonth: string | null;
  fallbackLevel: number;
}

export interface SelectMonthlyToursOptions {
  locale: Locale;
  currentDate?: Date;
}

function buildMonthFallbackPrefixes(date: Date): string[] {
  return [0, 1, 2, 3].map((offset) => getYearMonthPrefix(date, offset));
}

function resolveFeatured(locale: Locale, ids: readonly string[], max: number): Tour[] {
  const lookup = new Map(getTours(locale).map((t) => [t.id, t]));
  return ids.map((id) => lookup.get(id)).filter((t): t is Tour => Boolean(t)).slice(0, max);
}

function mapThToLocale(locale: Locale, thTours: Tour[]): Tour[] {
  if (locale === 'th') return thTours;
  const byId = new Map(getTours('en').map((t) => [t.id, t]));
  return thTours
    .map((t) => byId.get(t.id))
    .filter((t): t is Tour => Boolean(t));
}

function selectByMonth(
  locale: Locale,
  prefixes: string[],
  max: number,
): MonthlySelectionResult | null {
  for (const prefix of prefixes) {
    const thTours = filterToursByPrefix(prefix, 'th');
    if (thTours.length === 0) continue;
    const tours = mapThToLocale(locale, thTours).slice(0, max);
    if (tours.length === 0) continue;
    return {
      tours,
      sourceMonth: prefix,
      fallbackLevel: prefixes.indexOf(prefix),
    };
  }
  return null;
}

export function selectMonthlyTours({
  locale,
  currentDate = new Date(),
}: SelectMonthlyToursOptions): MonthlySelectionResult {
  const prefixes = buildMonthFallbackPrefixes(currentDate);
  const byMonth = selectByMonth(locale, prefixes, MAX_TOURS);
  if (byMonth) return byMonth;

  return {
    tours: resolveFeatured(locale, DEFAULT_FEATURED_IDS, MAX_TOURS),
    sourceMonth: null,
    fallbackLevel: MAX_FALLBACK_MONTHS + 1,
  };
}