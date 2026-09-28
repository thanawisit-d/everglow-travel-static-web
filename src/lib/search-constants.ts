export const THAI_MONTHS: Record<string, string> = {
  'มกราคม': '01',
  'กุมภาพันธ์': '02',
  'มีนาคม': '03',
  'เมษายน': '04',
  'พฤษภาคม': '05',
  'มิถุนายน': '06',
  'กรกฎาคม': '07',
  'สิงหาคม': '08',
  'กันยายน': '09',
  'ตุลาคม': '10',
  'พฤศจิกายน': '11',
  'ธันวาคม': '12',
};

export const MONTH_ALIASES: Record<string, string> = {
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

export const COUNTRY_ALIASES: Record<string, string> = {
  'เกาหลี': 'เกาหลีใต้',
};

export const PROMOTION_KEYWORDS = ['โปร', 'โปรโมชั่น', 'โปรโมชัน', 'ลดราคา', 'promotion'];

export function getYearMonthPrefix(date: Date, offset = 0): string {
  const year = date.getFullYear();
  const monthIndex = date.getMonth() + offset;
  const y = year + Math.floor(monthIndex / 12);
  const m = ((monthIndex % 12) + 12) % 12 + 1;
  return `${y}-${String(m).padStart(2, '0')}`;
}

export function buildMonthPrefix(monthNumber: string, year: number): string {
  return `${year}-${monthNumber}`;
}