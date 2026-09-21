import type { Locale } from '@/types/api';
import type { SearchFilters, Tour } from '@/types/tour';
import { tourCountryLabel } from '@/types/tour';
import { getTours, getCountryNames } from '@/lib/tours-data';
import { toNumber } from '@/utils/price';
import { THAI_MONTHS, MONTH_ALIASES, COUNTRY_ALIASES, PROMOTION_KEYWORDS } from '@/lib/search-constants';

const COUNTRY_NAMES = getCountryNames();

const THAI_MONTH_NAMES = Object.keys(THAI_MONTHS);

// "เดือน..." ทุกรูปแบบด้วย regex เดียว — จับชื่อเต็มหรือชื่อย่อของ 12 เดือน
// หลังคำนำหน้า: เดือน / ช่วงเดือน / ต้นเดือน / กลางเดือน / ปลายเดือน
const MONTH_PREFIX = new RegExp(
  '(?:ต้นเดือน|ปลายเดือน|กลางเดือน|ช่วงเดือน|เดือน)?' +
    '(' +
    THAI_MONTH_NAMES.join('|') +
    '|' +
    Object.keys(MONTH_ALIASES).map((m) => m.replace(/\./g, '\\.')).join('|') +
    ')',
);

// Extract every search condition from a raw customer message.
// Pure function: does not read tours JSON or build replies.
export function extractSearchFilters(text: string): SearchFilters {
  const input = (text || '').trim();
  const filters: SearchFilters = {};

  // 1. Promotion (exclude "โปรแกรม" and "โปรตุเกส" false positives)
  const lower = input
    .toLowerCase()
    .replace(/โปรแกรม/g, '')
    .replace(/โปรตุเกส/g, '');
  if (PROMOTION_KEYWORDS.some((kw) => lower.includes(kw))) {
    filters.promotion = true;
  }

  // 2. Country (full names first, then aliases)
  for (const name of COUNTRY_NAMES) {
    if (input.includes(name)) {
      filters.country = name;
      break;
    }
  }
  if (!filters.country) {
    for (const [alias, canonical] of Object.entries(COUNTRY_ALIASES)) {
      if (input.includes(alias)) {
        filters.country = canonical;
        break;
      }
    }
  }

  // 3. Month — regex เดียว จับเดือน+คำนำหน้า แล้ว normalize ชื่อย่อ → ชื่อเต็ม
  const monthMatch = input.match(MONTH_PREFIX);
  if (monthMatch && monthMatch[1]) {
    filters.month = MONTH_ALIASES[monthMatch[1]] ?? monthMatch[1];
  }

  // 4. Budget — strip thousands separators, then find a 4-6 digit amount
  const digits = input.replace(/[,.]/g, '');
  const priceMatch = digits.match(/\d{4,6}/);
  if (priceMatch) filters.maxPrice = Number(priceMatch[0]);

  // 5. Duration — only "X วัน" (leads a "X วัน Y คืน" pattern)
  const dayMatch = input.match(/(\d+)\s*วัน/);
  if (dayMatch) filters.duration = Number(dayMatch[1]);

  return filters;
}

// Filter tours by every condition at once. Order is preserved from the JSON
// unless it is a promotion-only search (which sorts by price ascending).
export function filterTours(filters: SearchFilters, locale: Locale = 'th'): Tour[] {
  let tours = getTours(locale);

  const isPromotionOnly =
    filters.promotion === true &&
    filters.country === undefined &&
    filters.month === undefined &&
    filters.maxPrice === undefined &&
    filters.duration === undefined;

  if (filters.country) {
    tours = tours.filter((tour) => tourCountryLabel(tour) === filters.country);
  }

  if (filters.month) {
    const prefix = THAI_MONTHS[filters.month];
    if (prefix) {
      tours = tours.filter((tour) => tour.startMonth?.startsWith(prefix) === true);
    }
  }

  if (filters.maxPrice !== undefined) {
    const max = filters.maxPrice;
    tours = tours.filter((tour) => toNumber(tour.price) <= max);
  }

  if (filters.duration !== undefined) {
    const days = filters.duration;
    tours = tours.filter((tour) => {
      const match = tour.duration.match(/^(\d+)/);
      const tourDays = match ? Number(match[1]) : undefined;
      return tourDays === days;
    });
  }

  // Promotion-only search sorts by price (matches existing promotion behavior);
  // multi-condition search keeps the original JSON order.
  if (isPromotionOnly) {
    tours = [...tours].sort((a, b) => toNumber(a.price) - toNumber(b.price));
  }

  return tours;
}