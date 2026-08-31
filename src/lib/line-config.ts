import type { Locale } from '@/types/api';

export const lineConfig = {
  welcomeMessage: 'สวัสดีค่ะ ยินดีต้อนรับสู่ Everglow Travel! 😊\nพิมพ์ชื่อประเทศหรือชื่อทัวร์เพื่อค้นหาโปรแกรม หรือพิม "ราคา" เพื่อสอบถามราคาค่ะ',
  welcomeMessageEn: 'Welcome to Everglow Travel! 😊\nType a country or tour name to search, or type "price" to ask about pricing.',
  adminNotificationEnabled: process.env.ADMIN_NOTIFICATION_ENABLED !== 'false',
  unknownReply: 'ขออภัยค่ะ ยังไม่เข้าใจคำถาม\nลองพิมพ์ชื่อประเทศ เช่น "ญี่ปุ่น" หรือ "ราคา" ได้นะคะ',
  unknownReplyEn: 'Sorry, I did not understand.\nTry typing a country name like "Japan" or "price".',
  defaultLocale: 'th' as Locale,
};

export function defaultLocale(): Locale {
  return lineConfig.defaultLocale;
}
