export type TourType = 'domestic' | 'outbound';

export interface TransportInfo {
  name?: string;
  icon?: string;
  name_en?: string;
}

export interface ItineraryDay {
  day?: number;
  title?: string;
  title_en?: string;
  items?: Array<{
    time?: string;
    time_en?: string;
    description?: string;
    description_en?: string;
  }>;
}

export interface Tour {
  id: string;
  type: TourType;
  country?: string | string[];
  city?: string;
  province?: string;
  startMonth?: string;
  endMonth?: string;
  periodText: string;
  periodText_en?: string;
  image: string;
  price: string | number;
  duration: string;
  duration_en?: string;
  airline?: string;
  shortDesc?: string;
  desc: string;
  desc_en?: string;
  pdf?: string;
  transport?: TransportInfo;
  itinerary?: ItineraryDay[];
}

export function tourCountryLabel(tour: Tour, locale: 'th' | 'en' = 'th'): string {
  const c = tour.country;
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) return c.join(locale === 'en' ? ', ' : ' / ');
  if (tour.province) return tour.province;
  return tour.city || tour.id;
}
