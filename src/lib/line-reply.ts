import type { Intent } from '@/types/intent';
import type { IntentResult, ReplyPayload } from '@/types/line';
import type { Locale } from '@/types/api';
import { lineConfig } from '@/lib/line-config';
import { searchTours, getTours, getPopularTours, filterToursByMonth, getCountryNames } from '@/lib/tours-data';
import { extractSearchFilters, filterTours } from '@/lib/search-filters';
import { tourCountryLabel, type SearchFilters, type Tour } from '@/types/tour';
import { formatPrice, toNumber } from '@/utils/price';
import { buildTourFlex, buildTourCarousel } from '@/lib/line-flex';
import { THAI_MONTHS, COUNTRY_ALIASES, PROMOTION_KEYWORDS } from '@/lib/search-constants';

const GREETING_KEYWORDS = ['สวัสดี', 'hello', 'hi', 'หวัดดี', 'สวัสดีครับ', 'สวัสดีค่ะ'];
const PRICE_KEYWORDS = ['ราคา', 'price', 'กี่บาท', 'เท่าไหร่', 'งบ', 'budget', 'ไม่เกิน', 'ต่ำกว่า', 'แพง', 'ถูก'];
const CONTACT_KEYWORDS = ['ติดต่อ', 'contact', 'แอดมิน', 'admin', 'คุยกับคน', 'เจ้าหน้าที่', 'staff'];
const MONTHLY_PROGRAM_KEYWORDS = ['โปรแกรมประจำเดือน', 'โปรแกรมเดือนนี้', 'โปรแกรมยอดนิยม'];
const BOOKING_GUIDE_KEYWORDS = ["วิธีจองทัวร์", "ขั้นตอนการจอง", "จองยังไง"];
const BOOKING_KEYWORDS = ['จองทัวร์', 'จอง', 'book tour', 'book'];
const INQUIRY_PREFIXES = ['สอบถามทัวร์', 'สนใจทัวร์'];

const CITY_KEYWORDS = [
  'โตเกียว',
  'โอซาก้า',
  'ฟุกุโอกะ',
  'ฮอกไกโด',
  'ซัปโปโร',
  'โซล',
  'ปูซาน',
  'ไทเป',
  'ฮ่องกง',
  'เซี่ยงไฮ้',
];

// Country names as they appear in tours JSON (longest first for matching).
const COUNTRY_NAMES = getCountryNames();
// Display flag for the reply header (found results only).
const COUNTRY_FLAGS: Record<string, string> = {
  'ฮ่องกง': '🇭🇰',
  'มาเก๊า': '🇲🇴',
  'ญี่ปุ่น': '🇯🇵',
  'จีน': '🇨🇳',
  'เกาหลีใต้': '🇰🇷',
  'เวียดนาม': '🇻🇳',
  'ไต้หวัน': '🇹🇼',
  'สเปน': '🇪🇸',
  'ตุรกี': '🇹🇷',
  'ออสเตรเลีย': '🇦🇺',
  'เมียนมา': '🇲🇲',
  'อินเดีย': '🇮🇳',
  'มองโกเลีย': '🇲🇳',
  'ฟิลิปปินส์': '🇵🇭',
  'ภูฏาน': '🇧🇹',
  'อิตาลี': '🇮🇹',
};
const MONTH_NAMES = Object.keys(THAI_MONTHS);
const SEARCH_FOOTER = 'เลื่อนดูโปรแกรมที่สนใจได้เลย ✈️';

function detectCountry(t: string): string | undefined {
  for (const name of COUNTRY_NAMES) {
    if (t.includes(name)) return name;
  }
  for (const [alias, canonical] of Object.entries(COUNTRY_ALIASES)) {
    if (t.includes(alias)) return canonical;
  }
  return undefined;
}

const STOP_WORDS = [
  'อยากไป',
  'ไป',
  'เที่ยว',
  'หา',
  'มี',
  'ไหม',
  'หน่อย',
  'ครับ',
  'ค่ะ',
  'ที',
  'ให้',
  'ดู',
  'ขอ',
];

function parseSearchText(text: string) {
  const input = text.trim();

  // หาเลข 4–6 หลัก เช่น 3000, 15900, 30000
  const priceMatch = input.match(/\d{4,6}/);
  const maxPrice = priceMatch ? Number(priceMatch[0]) : undefined;

  // หาจำนวนวัน เช่น "5 วัน", "8วัน"
  const dayMatch = text.match(/(\d+)\s*วัน/);
  const days = dayMatch ? Number(dayMatch[1]) : undefined;

  // หาชื่อเมือง เช่น โตเกียว, โอซาก้า, โซล
  const city = CITY_KEYWORDS.find((name) => input.includes(name));

  // ลบคำฟุ่มเฟือย ออกจาก keyword เหลือชื่อประเทศ/เมือง
  let keyword = input
    .replace(/ทัวร์/gi, '')
    .replace(/โปรโมชั่น|โปร|ลดราคา/gi, '')
    .replace(/\d{4,6}/g, '')
    .replace(/\d+\s*วัน/g, '')
    .replace(city ?? '', '')
    .trim();

  for (const word of [...STOP_WORDS].sort((a, b) => b.length - a.length)) {
    keyword = keyword.replace(new RegExp(word, 'gi'), ' ');
  }

  for (const word of PRICE_KEYWORDS) {
    keyword = keyword.replace(new RegExp(word, 'gi'), ' ');
  }

  keyword = keyword.replace(/\s+/g, ' ').replace(/^[-–/]+|[-–/]+$/g, '').trim();

  return {
    keyword,
    city,
    maxPrice,
    days,
  };
}

export function detectIntent(text: string): IntentResult {
  const t = (text || '').toLowerCase().trim();

  for (const kw of GREETING_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) return { intent: 'greeting' };
  }

  if (text.includes('^')) return { intent: 'priceSearch', keyword: 'price' };

  // Rich Menu button sends the exact text "ติดต่อแอดมิน" → dedicated intent
  if (t === 'ติดต่อแอดมิน') {
    return { intent: 'contactAdminRequest', keyword: text };
  }

  for (const kw of CONTACT_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) return { intent: 'contactAdmin' };
  }

  // Booking guide must be checked BEFORE bookingTour, because phrases like
  // "วิธีจองทัวร์" also contain the "จองทัวร์" booking keyword.
  for (const kw of BOOKING_GUIDE_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) return { intent: 'bookingGuide' };
  }

  if (BOOKING_KEYWORDS.some((kw) => t.includes(kw.toLowerCase()))) {
    return { intent: 'bookingTour' };
  }

  for (const kw of MONTHLY_PROGRAM_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) return { intent: 'monthlyProgram' };
  }

  const inquiryPrefix = INQUIRY_PREFIXES.find((p) => text.startsWith(p));
  if (inquiryPrefix) {
    return {
      intent: 'tourInquiry',
      keyword: text.slice(inquiryPrefix.length).trim(),
    };
  }

  // Exact "latest promotion" phrases → show ALL promotions (empty keyword).
  // Must be checked before generic PROMOTION_KEYWORDS so "ล่าสุด" is not
  // treated as a search term.
  const LATEST_PROMOTION_PHRASES = ['โปรโมชั่นล่าสุด', 'โปรล่าสุด', 'โปรโมชันล่าสุด'];
  if (LATEST_PROMOTION_PHRASES.some((p) => t === p)) {
    return { intent: 'promotionSearch', keyword: '' };
  }

  const parsed = parseSearchText(text);
  const containsPromotion = PROMOTION_KEYWORDS.some((kw) => t.includes(kw));
  const containsPriceKeyword = PRICE_KEYWORDS.some((kw) => t.includes(kw.toLowerCase()));

  // 1. Promotion มาก่อน
  if (containsPromotion) {
    return {
      intent: 'promotionSearch',
      keyword: parsed.keyword,
      city: parsed.city,
      maxPrice: parsed.maxPrice,
      days: parsed.days,
      filters: extractSearchFilters(text),
    };
  }

  // เดือนในประโยค เช่น "ตุลาคม", "เดือนตุลาคม", "ญี่ปุ่นเดือนเมษายน",
  // "ไปญี่ปุ่นช่วงพฤศจิกายน", "มีนาคมไปไหนได้บ้าง" → monthSearch
  // (ต้องมาก่อน searchTour; promotion ตรวจแล้วก่อนหน้านี้)
  const monthInText = MONTH_NAMES.find((m) => t.includes(m));
  if (monthInText) {
    const country = detectCountry(t);
    return {
      intent: 'monthSearch',
      keyword: monthInText,
      city: country,
      filters: extractSearchFilters(text),
    };
  }

  // 2. ถ้ามี keyword หรือ city ให้ถือว่าเป็น Search Tour
  if (parsed.keyword || parsed.city) {
    // keyword ภาษาอังกฤษล้วน (ไม่มีอักษรไทย) → unknown เฉพาะเมื่อคำนั้น (และทุก
    // token ที่แยกด้วยเว้นวรรค) ไม่ตรงกับทัวร์ใดเลย เช่น "abcxyz"
    // แต่ "japan october" ยังเข้า Search Tour เพราะ token "japan" มีผลค้นหา
    if (parsed.keyword && !/[\u0E00-\u0E7F]/.test(parsed.keyword)) {
      const tokens = parsed.keyword.split(/[\s-]+/);
      const matchesAnyToken = tokens.some((token) => searchTours(token, 'th').length > 0);
      if (!matchesAnyToken) {
        return { intent: 'unknown' };
      }
    }
    return {
      intent: 'searchTour',
      keyword: parsed.keyword,
      city: parsed.city,
      maxPrice: parsed.maxPrice,
      days: parsed.days,
      filters: extractSearchFilters(text),
    };
  }

  // 3. ไม่มีปลายทาง แต่มีคำเกี่ยวกับราคา
  if (containsPriceKeyword) {
    return {
      intent: 'priceSearch',
      maxPrice: parsed.maxPrice,
      city: parsed.city,
      days: parsed.days,
      filters: extractSearchFilters(text),
    };
  }

  return { intent: 'unknown' };
}

// Shared search reply builders — every search intent uses extractSearchFilters +
// filterTours + buildTourCarousel (or buildTourFlex for single results).
// Summary/builders are split out so promotion / month / price / search paths
// reuse the exact same reply assembly (single source of truth).
function buildSearchLines(filters: SearchFilters): string[] {
  const lines: string[] = [];
  if (filters.country) lines.push(`ประเทศ: ${filters.country}`);
  if (filters.month) lines.push(`เดือนเดินทาง: ${filters.month}`);
  if (filters.maxPrice !== undefined) lines.push(`งบไม่เกิน: ฿${formatPrice(filters.maxPrice)}`);
  if (filters.duration !== undefined) lines.push(`ระยะเวลา: ${filters.duration} วัน`);
  return lines;
}

function buildSearchSummary(filters: SearchFilters, total: number): string {
  const lines = buildSearchLines(filters);
  const flag = filters.country ? (COUNTRY_FLAGS[filters.country] ?? '🌍') : '📅';

  if (filters.country && !filters.month && filters.maxPrice === undefined && filters.duration === undefined) {
    // ปลายทางอย่างเดียว
    return `${flag} พบ ${total} โปรแกรมในประเทศ${filters.country}\n\n${SEARCH_FOOTER}`;
  }
  if (filters.month && !filters.country && filters.maxPrice === undefined && filters.duration === undefined) {
    // เดือนอย่างเดียว
    return `📅 พบ ${total} โปรแกรมที่เดินทางในเดือน${filters.month}\n\n${SEARCH_FOOTER}`;
  }
  if (filters.maxPrice !== undefined && !filters.country && !filters.month && filters.duration === undefined) {
    // งบอย่างเดียว
    return `💰 พบ ${total} โปรแกรมในงบไม่เกิน ฿${formatPrice(filters.maxPrice)}\n\n${SEARCH_FOOTER}`;
  }
  if (lines.length === 0) {
    return `พบ ${total} โปรแกรมที่ตรงกับเงื่อนไข\n\n${SEARCH_FOOTER}`;
  }
  return `${flag} พบ ${total} โปรแกรมที่ตรงกับเงื่อนไข\n\n${lines.join('\n')}\n\n${SEARCH_FOOTER}`;
}

function buildEmptySearchReply(filters: SearchFilters): ReplyPayload {
  return {
    text: '😥 ยังไม่พบทัวร์ที่ตรงกับเงื่อนไขนี้\nลองเปลี่ยนเดือน งบประมาณ หรือปลายทาง แล้วค้นหาอีกครั้งได้เลยค่ะ ✈️',
  };
}

function buildPromotionReply(filters: SearchFilters, tours: Tour[], locale: Locale): ReplyPayload {
  return {
    flex: buildTourCarousel(tours, locale),
    text: `🎉 พบ ${tours.length} โปรแกรมโปรโมชั่นที่ตรงกับเงื่อนไข\n${buildSearchLines(filters).join('\n')}\nรีบจองก่อนหมดโปรค่ะ ✨`,
  };
}

function buildSearchEngineReply(filters: SearchFilters, locale: Locale): ReplyPayload {
  const tours = filterTours(filters, locale);

  if (tours.length === 0) {
    return buildEmptySearchReply(filters);
  }

  if (filters.promotion) {
    return buildPromotionReply(filters, tours, locale);
  }

  return {
    flex: buildTourCarousel(tours, locale),
    text: buildSearchSummary(filters, tours.length),
  };
}

function buildMonthlyProgramReply(locale: Locale): ReplyPayload {
  const tours = getPopularTours(locale);

  if (tours.length === 0) {
    return {
      text: 'ขออภัย ขณะนี้ยังไม่มีโปรแกรมประจำเดือนค่ะ 🙏',
    };
  }

  return {
    flex: buildTourCarousel(tours, locale),
    text: `🌟 โปรแกรมทัวร์ประจำเดือนนี้\nพบ ${tours.length} โปรแกรมยอดนิยม\nเลื่อนดูการ์ดด้านบนเพื่อเลือกโปรแกรมที่สนใจได้เลย ✈️`,
  };
}

// Fallback: legacy single-intent paths when no filters were extracted
// (createToursMessage + direct IntentResult created outside detectIntent).
function buildFallbackSearchReply(result: IntentResult, locale: Locale): ReplyPayload {
  if (result.intent === 'monthSearch') {
    const month = result.keyword || '';
    const country = result.city || '';
    const tours = filterToursByMonth(locale, month, country || undefined);
    if (tours.length === 0) {
      const head = country ? `📅 ${country} เดือน${month}` : `📅 เดือน${month}`;
      return { text: `${head}\nขออภัยค่ะ ยังไม่มีโปรแกรมที่เดินทางในช่วงนี้ 😊` };
    }
    const head = country
      ? `${COUNTRY_FLAGS[country] ?? '🌍'} โปรแกรม${country} เดือน${month}`
      : `📅 โปรแกรมเดินทางเดือน${month}`;
    return { flex: buildTourCarousel(tours, locale), text: `${head}\nพบทั้งหมด ${tours.length} โปรแกรม ✈️` };
  }
  if (result.intent === 'searchTour') {
    const keyword = result.keyword || '';
    let tours = keyword ? searchTours(keyword, locale) : getTours(locale);
    if (result.city) {
      const city = result.city;
      tours = tours.filter((tour) => tour.city?.toLowerCase().includes(city.toLowerCase()));
    }
    if (result.days) {
      tours = tours.filter((tour) => {
        const match = tour.duration.match(/^(\d+)/);
        const days = match ? Number(match[1]) : undefined;
        return days === result.days;
      });
    }
    if (result.maxPrice) {
      const max = result.maxPrice;
      tours = tours.filter((tour) => toNumber(tour.price) <= max);
    }
    if (tours.length === 0) {
      const conditions: string[] = [];
      if (keyword) conditions.push(`ประเทศ "${keyword}"`);
      if (result.city) conditions.push(`เมือง "${result.city}"`);
      if (result.days) conditions.push(`${result.days} วัน`);
      if (result.maxPrice) conditions.push(`ราคาไม่เกิน ${formatPrice(result.maxPrice)} บาท`);
      return { text: `ไม่พบทัวร์ ${conditions.join(' ')} ลองเพิ่มงบหรือค้นหาปลายทางอื่นนะคะ` };
    }
    const conditions: string[] = [];
    if (keyword) conditions.push(`ประเทศ "${keyword}"`);
    if (result.city) conditions.push(`เมือง "${result.city}"`);
    if (result.days) conditions.push(`${result.days} วัน`);
    if (result.maxPrice) conditions.push(`ไม่เกิน ${formatPrice(result.maxPrice)} บาท`);
    const header = `พบ ${tours.length} รายการ สำหรับ ${conditions.join(' • ')}`;
    const footer = tours.length > 5 ? `\n\nแสดง 5 จาก ${tours.length} รายการ` : '';
    return { flex: buildTourCarousel(tours, locale), text: `${header}${footer}` };
  }
  // priceSearch fallback (no filters)
  let priceTours = getTours(locale);
  if (result.maxPrice) {
    const max = result.maxPrice;
    priceTours = priceTours.filter((tour) => toNumber(tour.price) <= max);
  }
  priceTours = [...priceTours].sort((a, b) => toNumber(a.price) - toNumber(b.price));
  const lines = priceTours.slice(0, 5).map((tour, i) => {
    const name = tourCountryLabel(tour, locale);
    return `${i + 1}. ${name} · ${tour.duration} · ${formatPrice(tour.price)} บาท (${tour.id})`;
  });
  const title = result.maxPrice
    ? `ทัวร์ไม่เกิน ${formatPrice(result.maxPrice)} บาท แนะนำ:`
    : 'ตัวอย่างราคาทัวร์:';
  return { text: `${title}\n${lines.join('\n')}` };
}

function buildPromotionSearchReply(result: IntentResult, locale: Locale): ReplyPayload {
  // Exception (Sprint 5.0.2): exact "โปรโมชั่นล่าสุด" → all-promotion carousel.
  if (!result.keyword && !result.filters?.country && !result.filters?.month) {
    const tours = [...getTours(locale)].sort((a, b) => toNumber(a.price) - toNumber(b.price));
    return {
      flex: buildTourCarousel(tours, locale),
      text: '🎉 โปรโมชั่นล่าสุดของ Everglow Travel\n\nรวมโปรแกรมทัวร์ที่กำลังมีโปรโมชั่นในขณะนี้ค่ะ ✈️',
    };
  }
  if (result.filters) {
    return buildSearchEngineReply(result.filters, locale);
  }
  const promoKeyword = result.keyword || '';
  const promoCity = result.city;
  let promo = promoKeyword ? searchTours(promoKeyword, locale) : getTours(locale);
  if (promoCity) {
    promo = promo.filter((tour) => tour.city?.toLowerCase().includes(promoCity.toLowerCase()));
  }
  promo = [...promo].sort((a, b) => toNumber(a.price) - toNumber(b.price));
  if (promo.length === 0) {
    return { text: `ยังไม่มีโปรโมชั่น "${promoKeyword}" ในขณะนี้ค่ะ` };
  }
  const promoTours = promo.slice(0, 5);
  return {
    flex: buildTourCarousel(promoTours, locale),
    text: `🔥 โปรโมชั่น ${promoKeyword}\nพบ ${promo.length} รายการ`,
  };
}

export function buildReply(result: IntentResult, locale: Locale = 'th'): ReplyPayload {
  switch (result.intent) {
    case 'greeting':
      return { text: locale === 'en' ? lineConfig.welcomeMessageEn : lineConfig.welcomeMessage };

    case 'monthlyProgram':
      return buildMonthlyProgramReply(locale);

    case 'monthSearch':
    case 'searchTour':
      return result.filters
        ? buildSearchEngineReply(result.filters, locale)
        : buildFallbackSearchReply(result, locale);

    // priceSearch มีงบ/เงื่อนไข → Search Engine; ถาม "ราคา" ลอยๆ (ไม่มีงบ)
    // → แสดงตัวอย่างราคาแทน (fallback) เพื่อไม่ให้ตอบ "พบ 123 โปรแกรม" เปล่าๆ
    case 'priceSearch':
      return result.filters &&
        (result.filters.maxPrice !== undefined ||
          result.filters.country !== undefined ||
          result.filters.duration !== undefined)
        ? buildSearchEngineReply(result.filters, locale)
        : buildFallbackSearchReply(result, locale);

    case 'promotionSearch':
      return buildPromotionSearchReply(result, locale);

    case 'contactAdmin':
      return { text: 'กรุณารอสักครู่ค่ะ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด 🙏' };

    case 'contactAdminRequest':
      return {
        text:
          '💬 รับคำขอเรียบร้อยค่ะ\n' +
          'เจ้าหน้าที่ของ Everglow Travel จะติดต่อกลับโดยเร็วที่สุด 🙏',
      };

    case 'bookingGuide':
      return {
        text:
          '📝 วิธีจองทัวร์กับ Everglow Travel\n\n' +
          'เพื่อความสะดวก รบกวนส่งข้อมูลดังนี้ค่ะ\n' +
          '1. โปรแกรมที่ต้องการจอง\n' +
          '2. จำนวนผู้เดินทาง\n' +
          '3. วันที่เดินทาง (ถ้ามี)\n\n' +
          'เจ้าหน้าที่จะติดต่อกลับผ่าน LINE นี้โดยเร็วที่สุดค่ะ 😊',
      };

    case 'bookingTour':
      return {
        text:
          'จองทัวร์ Everglow Travel\n\n' +
          'กรุณาส่งข้อมูลดังนี้\n' +
          '1. โปรแกรมที่ต้องการจอง\n' +
          '2. รหัสทัวร์ (ถ้ามี)\n' +
          '3. จำนวนผู้เดินทาง\n' +
          '4. วันที่ต้องการเดินทาง\n' +
          '5. ชื่อและเบอร์โทรติดต่อ\n\n' +
          'เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุดค่ะ 😊',
      };

    case 'tourInquiry':
      return {
        text:
          `📩 รับคำขอสอบถามเรียบร้อยค่ะ\n\n` +
          `โปรแกรม: ${result.keyword || '-'}\n\n` +
          'เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด 🙏',
      };

    default:
      return {
        text: locale === 'en' ? lineConfig.unknownReplyEn : lineConfig.unknownReply,
      };
  }
}

export function createToursMessage(locale: Locale = 'th'): ReplyPayload {
  return buildReply({ intent: 'searchTour', keyword: '' }, locale);
}

function padZero(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatThaiDateTime(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('th-TH', {
    timeZone: 'Asia/Bangkok',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? '';

  const dst = Number(get('day'));
  const month = get('month');
  const year = get('year');
  const hour = get('hour');
  const minute = get('minute');

  return `${dst} ${month} ${year} ${padZero(Number(hour))}:${padZero(Number(minute))} น.`;
}

// Builds the LINE push message text sent to the admin when a customer triggers
// bookingTour, tourInquiry, or contactAdminRequest. No database lookup — uses
// event fields only. Never includes the customer's LINE User ID.
export function buildAdminNotification(params: {
  intent: 'bookingTour' | 'tourInquiry' | 'contactAdminRequest';
  displayName: string;
  text: string;
  tourId?: string;
  messageTime?: Date;
}): string {
  const { intent, displayName, text, tourId, messageTime } = params;

  const time = formatThaiDateTime(messageTime ? new Date(messageTime) : new Date());

  if (intent === 'contactAdminRequest') {
    return [
      '💬 มีลูกค้าต้องการสอบถามเพิ่มเติม',
      '',
      '👤 ชื่อใน LINE',
      displayName || '-',
      '💬 ข้อความลูกค้า',
      text,
      '🕒 เวลา',
      time,
    ].join('\n');
  }

  if (intent === 'bookingTour') {
    return [
      '📝 มีคำขอจองทัวร์ใหม่',
      '',
      '👤 ชื่อใน LINE',
      displayName || '-',
      '💬 ข้อความลูกค้า',
      text,
      '🕒 เวลา',
      time,
    ].join('\n');
  }

  return [
    '📩 มีลูกค้าสนใจทัวร์',
    '',
    '👤 ชื่อใน LINE',
    displayName || '-',
    '📦 รหัสทัวร์',
    tourId || '-',
    '💬 ข้อความลูกค้า',
    text,
    '🕒 เวลา',
    time,
  ].join('\n');
}
