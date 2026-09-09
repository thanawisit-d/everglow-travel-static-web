import type { Intent } from '@/types/intent';
import type { IntentResult, ReplyPayload } from '@/types/line';
import type { Locale } from '@/types/api';
import { lineConfig } from '@/lib/line-config';
import { searchTours, getTours, getPopularTours } from '@/lib/tours-data';
import { tourCountryLabel } from '@/types/tour';
import { formatPrice, toNumber } from '@/utils/price';
import { buildTourFlex, buildTourCarousel } from '@/lib/line-flex';

const GREETING_KEYWORDS = ['สวัสดี', 'hello', 'hi', 'หวัดดี', 'สวัสดีครับ', 'สวัสดีค่ะ'];
const PRICE_KEYWORDS = ['ราคา', 'price', 'กี่บาท', 'เท่าไหร่', 'งบ', 'budget', 'ไม่เกิน', 'ต่ำกว่า', 'แพง', 'ถูก'];
const CONTACT_KEYWORDS = ['ติดต่อ', 'contact', 'แอดมิน', 'admin', 'คุยกับคน', 'เจ้าหน้าที่', 'staff'];
const PROMOTION_KEYWORDS = ['โปร', 'โปรโมชั่น', 'ลดราคา', 'promotion'];
const MONTHLY_PROGRAM_KEYWORDS = ['โปรแกรมประจำเดือน', 'โปรแกรมเดือนนี้', 'โปรแกรมยอดนิยม'];

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

  keyword = keyword.replace(/\s+/g, ' ').trim();

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

  for (const kw of CONTACT_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) return { intent: 'contactAdmin' };
  }

  for (const kw of MONTHLY_PROGRAM_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) return { intent: 'monthlyProgram' };
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
    };
  }

  // 2. ถ้ามี keyword หรือ city ให้ถือว่าเป็น Search Tour
  if (parsed.keyword || parsed.city) {
    return {
      intent: 'searchTour',
      keyword: parsed.keyword,
      city: parsed.city,
      maxPrice: parsed.maxPrice,
      days: parsed.days,
    };
  }

  // 3. ไม่มีปลายทาง แต่มีคำเกี่ยวกับราคา
  if (containsPriceKeyword) {
    return {
      intent: 'priceSearch',
      maxPrice: parsed.maxPrice,
    };
  }

  return { intent: 'unknown' };
}

export function buildReply(result: IntentResult, locale: Locale = 'th'): ReplyPayload {
  switch (result.intent) {
    case 'greeting':
      return { text: locale === 'en' ? lineConfig.welcomeMessageEn : lineConfig.welcomeMessage };

    case 'monthlyProgram': {
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

    case 'searchTour': {
      const keyword = result.keyword || '';

      let tours = keyword ? searchTours(keyword, locale) : getTours(locale);

      // กรองตามเมือง
      if (result.city) {
        const city = result.city;
        tours = tours.filter((tour) => tour.city?.toLowerCase().includes(city.toLowerCase()));
      }

      // กรองตามจำนวนวัน
      if (result.days) {
        tours = tours.filter((tour) => {
          const match = tour.duration.match(/^(\d+)/);
          const days = match ? Number(match[1]) : undefined;
          return days === result.days;
        });
      }

      // กรองตามงบประมาณ
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

        return {
          text: `ไม่พบทัวร์ ${conditions.join(' ')} ลองเพิ่มงบหรือค้นหาปลายทางอื่นนะคะ`,
        };
      }

      const conditions: string[] = [];
      if (keyword) conditions.push(`ประเทศ "${keyword}"`);
      if (result.city) conditions.push(`เมือง "${result.city}"`);
      if (result.days) conditions.push(`${result.days} วัน`);
      if (result.maxPrice) conditions.push(`ไม่เกิน ${formatPrice(result.maxPrice)} บาท`);

      const header = `พบ ${tours.length} รายการ สำหรับ ${conditions.join(' • ')}`;
      const footer = tours.length > 5 ? `\n\nแสดง 5 จาก ${tours.length} รายการ` : '';

      return {
        flex: buildTourCarousel(tours, locale),
        text: `${header}${footer}`,
      };
    }

    case 'priceSearch': {
      let tours = getTours(locale);

      if (result.maxPrice) {
        const max = result.maxPrice;
        tours = tours.filter((tour) => toNumber(tour.price) <= max);
      }

      tours = [...tours].sort((a, b) => toNumber(a.price) - toNumber(b.price));

      const lines = tours.slice(0, 5).map((tour, i) => {
        const name = tourCountryLabel(tour, locale);
        return `${i + 1}. ${name} · ${tour.duration} · ${formatPrice(tour.price)} บาท (${tour.id})`;
      });

      const title = result.maxPrice
        ? `ทัวร์ไม่เกิน ${formatPrice(result.maxPrice)} บาท แนะนำ:`
        : 'ตัวอย่างราคาทัวร์:';

      return { text: `${title}\n${lines.join('\n')}` };
    }

    case 'promotionSearch': {
      const keyword = result.keyword || '';

      let tours = keyword ? searchTours(keyword, locale) : getTours(locale);

      // กรองตามเมือง
      if (result.city) {
        const city = result.city;
        tours = tours.filter((tour) => tour.city?.toLowerCase().includes(city.toLowerCase()));
      }

      // กรองจำนวนวัน (ถ้ามี)
      if (result.days) {
        tours = tours.filter((tour) => {
          const match = tour.duration.match(/^(\d+)/);
          const days = match ? Number(match[1]) : undefined;
          return days === result.days;
        });
      }

      // กรองงบประมาณ (ถ้ามี)
      if (result.maxPrice) {
        const max = result.maxPrice;
        tours = tours.filter((tour) => toNumber(tour.price) <= max);
      }

      // เรียงจากราคาถูกที่สุด
      tours = [...tours].sort((a, b) => toNumber(a.price) - toNumber(b.price));

      if (tours.length === 0) {
        const conditions: string[] = [];
        if (keyword) conditions.push(`"${keyword}"`);
        if (result.maxPrice) conditions.push(`ไม่เกิน ${formatPrice(result.maxPrice)} บาท`);

        return {
          text: `ยังไม่มีโปรโมชั่น ${conditions.join(' ')} ในขณะนี้ค่ะ`,
        };
      }

      const title = keyword.length > 0 ? `🔥 โปรโมชั่น ${keyword}` : '🔥 โปรโมชั่นแนะนำ';
      const footer = tours.length > 5 ? `\n\nแสดง 5 จาก ${tours.length} รายการ` : '';

      return {
        flex: buildTourCarousel(tours, locale),
        text: `${title}\nพบ ${tours.length} รายการ${footer}`,
      };
    }

    case 'contactAdmin':
      return { text: 'กรุณารอสักครู่ค่ะ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด 🙏' };

    default:
      return {
        text: locale === 'en' ? lineConfig.unknownReplyEn : lineConfig.unknownReply,
      };
  }
}

export function createToursMessage(locale: Locale = 'th'): ReplyPayload {
  return buildReply({ intent: 'searchTour', keyword: '' }, locale);
}
