'use client';

import { useState, useCallback } from 'react';

export default function useToursFilter({ tours, locale, extraFilters = {} }) {
  const isEn = locale === 'en';

  const minPrice = 0;
  const maxPrice = 200000;

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
