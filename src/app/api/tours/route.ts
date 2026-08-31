import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { filterTours, getTours, searchTours } from '@/lib/tours-data';
import { toNumber } from '@/utils/price';
import type { ToursResponse } from '@/types/api';

export const runtime = 'nodejs';

export function GET(request: NextRequest): NextResponse<ToursResponse> {
  const { searchParams } = request.nextUrl;
  const locale = searchParams.get('locale') === 'en' ? 'en' : 'th';
  const country = searchParams.get('country') ?? undefined;
  const q = searchParams.get('q') ?? undefined;
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');

  let tours = q ? searchTours(q, locale) : getTours(locale);

  tours = filterTours(
    {
      country,
      minPrice: minPriceParam ? toNumber(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? toNumber(maxPriceParam) : undefined,
    },
    locale,
  );

  return NextResponse.json({
    success: true,
    total: tours.length,
    tours,
  });
}
