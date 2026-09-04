import type { Intent } from '@/types/intent';
import type { IntentResult } from '@/types/line';
import type { Locale } from '@/types/api';
import { lineConfig } from '@/lib/line-config';
import { searchTours, getTours } from '@/lib/tours-data';
import { tourCountryLabel } from '@/types/tour';
import { formatPrice, toNumber } from '@/utils/price';

const GREETING_KEYWORDS = ['สวัสดี', 'hello', 'hi', 'หวัดดี', 'สวัสดีครับ', 'สวัสดีค่ะ'];
const PRICE_KEYWORDS = ['ราคา', 'price', 'กี่บาท', 'เท่าไหร่', 'งบ', 'budget', 'แพง', 'ถูก'];
const CONTACT_KEYWORDS = ['ติดต่อ', 'contact', 'แอดมิน', 'admin', 'คุยกับคน', 'เจ้าหน้าที่', 'staff'];

function parseSearchText(text: string) {
  const input = text.trim();

  // หาเลข 4–6 หลัก เช่น 3000, 15900, 30000
  const priceMatch = input.match(/\d{4,6}/);
  const maxPrice = priceMatch ? Number(priceMatch[0]) : undefined;

  // หาจำนวนวัน เช่น "5 วัน", "8วัน"
  const dayMatch = text.match(/(\d+)\s*วัน/);
  const days = dayMatch ? Number(dayMatch[1]) : undefined;

  // ลบคำว่า "ทัวร์", ตัวเลข, และ "X วัน" ออก เหลือชื่อประเทศ/เมือง
  const keyword = input
    .replace(/ทัวร์/gi, '')
    .replace(/\d{4,6}/g, '')
    .replace(/\d+\s*วัน/g, '')
    .replace(/ไม่เกิน|ต่ำกว่า|งบ/gi, '')
    .trim();

  return {
    keyword,
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

  for (const kw of PRICE_KEYWORDS) {
    if (t.includes(kw.toLowerCase())) {
      return { intent: 'priceSearch', keyword: 'price' };
    }
  }

  if (t.length > 1) {
    const parsed = parseSearchText(text);

    return {
      intent: 'searchTour',
      keyword: parsed.keyword,
      maxPrice: parsed.maxPrice,
      days: parsed.days,
    };
  }

  return { intent: 'unknown' };
}

export function buildReply(result: IntentResult, locale: Locale = 'th'): string {
  switch (result.intent) {
    case 'greeting':
      return locale === 'en' ? lineConfig.welcomeMessageEn : lineConfig.welcomeMessage;

    case 'searchTour': {
      const keyword = result.keyword || '';

      let tours = keyword ? searchTours(keyword, locale) : getTours(locale);

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
        if (keyword) conditions.push(`"${keyword}"`);
        if (result.days) conditions.push(`${result.days} วัน`);
        if (result.maxPrice) conditions.push(`ราคาไม่เกิน ${formatPrice(result.maxPrice)} บาท`);

        return `ไม่พบทัวร์ ${conditions.join(' ')} ลองเพิ่มงบหรือค้นหาปลายทางอื่นนะคะ`;
      }

      const lines = tours.slice(0, 5).map((tour, i) => {
        const name = tourCountryLabel(tour, locale);
        return `${i + 1}. ${name} · ${tour.duration} · ${formatPrice(tour.price)} บาท (${tour.id})`;
      });

      const conditions: string[] = [];
      if (keyword) conditions.push(`"${keyword}"`);
      if (result.days) conditions.push(`${result.days} วัน`);
      if (result.maxPrice) conditions.push(`ไม่เกิน ${formatPrice(result.maxPrice)} บาท`);

      const header = `พบ ${tours.length} รายการ สำหรับ ${conditions.join(' • ')}`;
      const footer = tours.length > 5 ? `\n\nแสดง 5 จาก ${tours.length} รายการ` : '';

      return `${header}:\n${lines.join('\n')}${footer}`;
    }

    case 'priceSearch': {
      const tours = getTours(locale).slice(0, 5);
      const lines = tours.map((tour, i) => {
        const name = tourCountryLabel(tour, locale);
        return `${i + 1}. ${name} · ${tour.duration} · ${formatPrice(tour.price)} บาท (${tour.id})`;
      });
      return `ตัวอย่างราคาทัวร์:\n${lines.join('\n')}`;
    }

    case 'contactAdmin':
      return 'กรุณารอสักครู่ค่ะ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด 🙏';

    default:
      return locale === 'en' ? lineConfig.unknownReplyEn : lineConfig.unknownReply;
  }
}

export function createToursMessage(locale: Locale = 'th'): string {
  return buildReply({ intent: 'searchTour', keyword: '' }, locale);
}
