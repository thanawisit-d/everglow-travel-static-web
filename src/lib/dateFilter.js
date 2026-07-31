const THAI_MONTH = {
  'ม.ค.': 1, 'ก.พ.': 2, 'มี.ค.': 3, 'เม.ย.': 4,
  'พ.ค.': 5, 'มิ.ย.': 6, 'ก.ค.': 7, 'ส.ค.': 8,
  'ก.ย.': 9, 'ต.ค.': 10, 'พ.ย.': 11, 'ธ.ค.': 12,
  'มกราคม': 1, 'กุมภาพันธ์': 2, 'มีนาคม': 3, 'เมษายน': 4,
  'พฤษภาคม': 5, 'มิถุนายน': 6, 'กรกฎาคม': 7, 'สิงหาคม': 8,
  'กันยายน': 9, 'ตุลาคม': 10, 'พฤศจิกายน': 11, 'ธันวาคม': 12,
};

const BUDDHIST_YEAR_OFFSET = 543;
const pad = n => String(n).padStart(2, '0');
const toGregorianYear = y => parseInt(y, 10) - BUDDHIST_YEAR_OFFSET;
const monthOf = s => THAI_MONTH[s];

/**
 * Parses domestic tours' free-text periodText (e.g. "ก.พ. - มิ.ย. 2569")
 * into a comparable { startYM: 'YYYY-MM', endYM: 'YYYY-MM' } range.
 *
 * Supported formats:
 *   "ก.พ. - มิ.ย. 2569"          two months, single trailing year (may wrap year)
 *   "ต.ค. 2569 - ม.ค. 2570"     cross-year, explicit year after each month
 *   "20 - 22 มิ.ย. 2569"        day range, single month
 *   "เมษายน - มิถุนายน 2569"    full month names
 *   "ตลอดเดือนมีนาคม 2569"      single month
 *
 * Returns null when unparseable — callers should keep the tour visible
 * rather than wrongly excluding it.
 */
export function parsePeriodTextToRange(periodText) {
  if (!periodText) return null;

  // day range: "20 - 22 มิ.ย. 2569"
  let m = periodText.match(/(\d{1,2})\s*-\s*(\d{1,2})\s+(\S+\.?)\s+(\d{4})/);
  if (m) {
    const month = monthOf(m[3]);
    if (!month) return null;
    const y = toGregorianYear(m[4]);
    return { startYM: `${y}-${pad(month)}`, endYM: `${y}-${pad(month)}` };
  }

  // cross-year with explicit year per month: "ต.ค. 2569 - ม.ค. 2570"
  m = periodText.match(/(\S+\.?)\s+(\d{4})\s*-\s*(\S+\.?)\s+(\d{4})/);
  if (m) {
    const sm = monthOf(m[1]);
    const em = monthOf(m[3]);
    if (!sm || !em) return null;
    return { startYM: `${toGregorianYear(m[2])}-${pad(sm)}`, endYM: `${toGregorianYear(m[4])}-${pad(em)}` };
  }

  // two months, trailing year: "ก.พ. - มิ.ย. 2569" (may wrap into next year)
  m = periodText.match(/(\S+\.?)\s*-\s*(\S+\.?)\s+(\d{4})/);
  if (m) {
    const sm = monthOf(m[1]);
    const em = monthOf(m[2]);
    if (!sm || !em) return null;
    const y = toGregorianYear(m[3]);
    const ey = em < sm ? y + 1 : y;
    return { startYM: `${y}-${pad(sm)}`, endYM: `${ey}-${pad(em)}` };
  }

  // single month: "ตลอดเดือนมีนาคม 2569" / "ตุลาคม 2569"
  m = periodText.match(/(?:ตลอดเดือน)?(\S+\.?)\s+(\d{4})/);
  if (m) {
    const month = monthOf(m[1]);
    if (!month) return null;
    const y = toGregorianYear(m[2]);
    return { startYM: `${y}-${pad(month)}`, endYM: `${y}-${pad(month)}` };
  }

  return null;
}

function isWithinRange(selectedYM, startYM, endYM) {
  return selectedYM >= startYM && selectedYM <= endYM;
}

/**
 * selectedYM: 'YYYY-MM' string from <input type="month">
 * tour: a domestic or outbound tour object
 */
export function tourMatchesMonth(tour, selectedYM) {
  if (!selectedYM) return true;

  if (tour.startMonth && tour.endMonth) {
    return isWithinRange(selectedYM, tour.startMonth, tour.endMonth);
  }

  const range = parsePeriodTextToRange(tour.periodText);
  if (!range) return true;

  return isWithinRange(selectedYM, range.startYM, range.endYM);
}

const MONTHS_FULL_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTHS_FULL_TH = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

/**
 * Formats 'YYYY-MM' into a locale label: TH → "กุมภาพันธ์ 2569", EN → "February 2026".
 * Returns the raw input when it cannot be parsed.
 */
export function formatMonthLabel(ym, locale = 'th') {
  if (!ym) return '';
  const month = parseInt(ym.slice(5, 7), 10);
  const year = parseInt(ym.slice(0, 4), 10);
  if (isNaN(month) || month < 1 || month > 12 || isNaN(year)) return ym;
  if (locale === 'en') return `${MONTHS_FULL_EN[month - 1]} ${year}`;
  return `${MONTHS_FULL_TH[month - 1]} ${year + BUDDHIST_YEAR_OFFSET}`;
}
