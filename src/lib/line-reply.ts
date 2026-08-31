import type { Intent } from '@/types/intent';
import type { IntentResult } from '@/types/line';
import type { Locale } from '@/types/api';
import { lineConfig } from '@/lib/line-config';
import { searchTours, getTours } from '@/lib/tours-data';
import { tourCountryLabel } from '@/types/tour';
import { formatPrice } from '@/utils/price';

const GREETING_KEYWORDS = ['สวัสดี', 'hello', 'hi', 'หวัดดี', 'สวัสดีครับ', 'สวัสดีค่ะ'];
const PRICE_KEYWORDS = ['ราคา', 'price', 'กี่บาท', 'เท่าไหร่', 'งบ', 'budget', 'แพง', 'ถูก'];
const CONTACT_KEYWORDS = ['ติดต่อ', 'contact', 'แอดมิน', 'admin', 'คุยกับคน', 'เจ้าหน้าที่', 'staff'];

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

  if (t.length > 1) return { intent: 'searchTour', keyword: text.trim() };

  return { intent: 'unknown' };
}

export function buildReply(result: IntentResult, locale: Locale = 'th'): string {
  switch (result.intent) {
    case 'greeting':
      return locale === 'en' ? lineConfig.welcomeMessageEn : lineConfig.welcomeMessage;

    case 'searchTour': {
      const keyword = result.keyword || '';
      const tours = keyword ? searchTours(keyword, locale) : getTours(locale);
      if (tours.length === 0) {
        return locale === 'en'
          ? `No tours found for "${keyword}". Try another destination.`
          : `ไม่พบทัวร์ "${keyword}" ลองค้นหาปลายทางอื่นนะคะ`;
      }
      const lines = tours.slice(0, 5).map((tour, i) => {
        const name = tourCountryLabel(tour, locale);
        return `${i + 1}. ${name} · ${tour.duration} · ${formatPrice(tour.price)} บาท (${tour.id})`;
      });
      return `พบ ${tours.length} รายการ สำหรับ "${keyword}":\n${lines.join('\n')}`;
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
