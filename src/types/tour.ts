export type TourType = 'domestic' | 'outbound';

export interface TransportInfo {
  name?: string;
  name_en?: string;
  icon?: string;
}

export interface ItineraryDay {
  day?: number;
  title?: string;
  items?: Array<{
    time?: string;
    description?: string;
  }>;
}

export interface Tour {
  id: string;
  type: TourType;
  popular?: boolean;
  popularOrder?: number;
  country?: string | string[];
  city?: string;
  province?: string;
  startMonth?: string;
  endMonth?: string;
  periodText: string;
  image: string;
  price: string | number;
  duration: string;
  duration_en?: string;
  airline?: string;
  shortDesc?: string;
  shortDesc_en?: string;
  desc: string;
  desc_en?: string;
  periodText_en?: string;
  pdf?: string;
  transport?: TransportInfo;
  itinerary?: ItineraryDay[];
}

export interface SearchFilters {
  country?: string;
  month?: string;
  maxPrice?: number;
  duration?: number;
  promotion?: boolean;
}

export function tourCountryLabel(tour: Tour, locale: 'th' | 'en' = 'th'): string {
  const c = tour.country;
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) return c.join(locale === 'en' ? ', ' : ' / ');
  if (tour.province) return tour.province;
  return tour.city || tour.id;
}
