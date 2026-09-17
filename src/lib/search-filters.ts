import type { Locale } from '@/types/api';
import type { SearchFilters, Tour } from '@/types/tour';
import { tourCountryLabel } from '@/types/tour';
import { getTours, THAI_MONTHS, getCountryNames } from '@/lib/tours-data';
import { toNumber } from '@/utils/price';

const COUNTRY_NAMES = getCountryNames();

const COUNTRY_ALIASES: Record<string, string> = {
  'เกาหลี': 'เกาหลีใต้',
};

const THAI_MONTH_NAMES = Object.keys(THAI_MONTHS);

const MONTH_ABBREVIATIONS: Record<string, string> = {
  'ม.ค.': 'มกราคม',
  'ก.พ.': 'กุมภาพันธ์',
  'มี.ค.': 'มีนาคม',
  'เม.ย.': 'เมษายน',
  'พ.ค.': 'พฤษภาคม',
  'มิ.ย.': 'มิถุนายน',
  'ก.ค.': 'กรกฎาคม',
  'ส.ค.': 'สิงหาคม',
  'ก.ย.': 'กันยายน',
  'ต.ค.': 'ตุลาคม',
  'พ.ย.': 'พฤศจิกายน',
  'ธ.ค.': 'ธันวาคม',
};

const PROMOTION_KEYWORDS = ['โปร', 'โปรโมชั่น', 'โปรโมชัน', 'ลดราคา', 'promotion'];

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

  // 3. Month (full names first, then abbreviations → normalize to full name)
  const fullMonth = THAI_MONTH_NAMES.find((m) => input.includes(m));
  if (fullMonth) {
    filters.month = fullMonth;
  } else {
    for (const [abbr, full] of Object.entries(MONTH_ABBREVIATIONS)) {
      if (input.includes(abbr)) {
        filters.month = full;
        break;
      }
    }
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