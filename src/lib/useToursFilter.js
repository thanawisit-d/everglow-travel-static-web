'use client';

import { useState, useMemo, useCallback } from 'react';
import { parsePrice } from './tour-utils';

export default function useToursFilter({ tours, locale, extraFilters = {} }) {
  const isEn = locale === 'en';

  const allPrices = useMemo(() => tours.map(t => parsePrice(t.price)).filter(p => p > 0), [tours]);
  const minPrice = useMemo(() => Math.floor(Math.min(...allPrices) / 1000) * 1000, [allPrices]);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...allPrices) / 1000) * 1000, [allPrices]);

  const [filters, setFilters] = useState({
    search: '',
    duration: '',
    priceRange: [minPrice, maxPrice],
    sortBy: '',
    ...extraFilters,
  });
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  return {
    filters,
    setFilters,
    page,
    setPage,
    mobileFilterOpen,
    setMobileFilterOpen,
    updateFilter,
    minPrice,
    maxPrice,
    isEn,
  };
}
