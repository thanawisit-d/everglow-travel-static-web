import type { Locale } from '@/types/api';
import type { ReplyPayload } from '@/types/line';
import { getPopularTours, getTours } from '@/lib/tours-data';
import { buildTourCarousel } from '@/lib/line-flex';
import { toNumber } from '@/utils/price';

export type BroadcastType = 'monthly' | 'promotion';

// Logic เดียวกับ promotionSearch ใน line-reply (keyword="") — แสดงทัวร์ทั้งหมด
// เรียงราคาจากถูกไปแพง ตาม Canonical "โปรโมชั่นล่าสุด" เดิม
function filterPromotionTours(locale: Locale = 'th') {
  return [...getTours(locale)].sort((a, b) => toNumber(a.price) - toNumber(b.price));
}

export function buildBroadcastPayload(type: BroadcastType, locale: Locale = 'th'): ReplyPayload {
  if (type === 'monthly') {
    const tours = getPopularTours(locale);
    return {
      text:
        '🌟 โปรแกรมทัวร์ประจำเดือนนี้\n' +
        'รวม 5 โปรแกรมยอดนิยมที่กำลังเปิดรับจอง พร้อมราคาพิเศษ ✈️',
      flex: buildTourCarousel(tours, locale),
    };
  }

  const tours = filterPromotionTours(locale);
  return {
    text:
      '🎉 โปรโมชั่นล่าสุดจาก Everglow Travel\n' +
      'รวมโปรแกรมทัวร์ที่กำลังมีโปรโมชันในขณะนี้ รีบจองก่อนหมดโปรค่ะ ✨',
    flex: buildTourCarousel(tours, locale),
  };
}