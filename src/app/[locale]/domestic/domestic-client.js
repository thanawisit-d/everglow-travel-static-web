'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TourCard from '@/components/TourCard';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';

const PER_PAGE = 12;

const durationMapEnToTh = {
  '1 day': '1 วัน',
  '2 days 1 night': '2 วัน 1 คืน',
  '3 days 2 night': '3 วัน 2 คืน',
  '4 days 3 night': '4 วัน 3 คืน',
  '5 days 4 night': '5 วัน 4 คืน',
};

function parsePrice(p) {
  return parseInt((p || '').replace(/,/g, ''), 10) || 0;
}

function paginate(items, page) {
  const totalPages = Math.ceil(items.length / PER_PAGE) || 1;
  return {
    items: items.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    totalPages,
  };
}

export default function DomesticClient({ locale, tours }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEn = locale === 'en';

  const allPrices = useMemo(() => tours.map(t => parsePrice(t.price)).filter(p => p > 0), [tours]);
  const minPrice = useMemo(() => Math.floor(Math.min(...allPrices) / 1000) * 1000, [allPrices]);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...allPrices) / 1000) * 1000, [allPrices]);

  const [filters, setFilters] = useState({
    search: '',
    duration: '',
    priceRange: [minPrice, maxPrice],
    province: [],
    sortBy: '',
  });
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const d = searchParams.get('duration') || '';
    if (d) {
      const normalized = isEn ? (durationMapEnToTh[d] || d) : d;
      setFilters(prev => ({ ...prev, duration: normalized }));
      setPage(1);
    }
  }, [searchParams, isEn]);

  useEffect(() => {
    setFilters(prev => {
      if (prev.priceRange[0] === 0 && prev.priceRange[1] === 0) {
        return { ...prev, priceRange: [minPrice, maxPrice] };
      }
      return prev;
    });
  }, [minPrice, maxPrice]);

  const filterOptions = useMemo(() => {
    const durations = [...new Set(tours.map(t => isEn ? t.duration_en : t.duration).filter(Boolean))].sort();
    const provinces = [...new Set(tours.map(t => t.province).filter(Boolean))].sort();
    return { durations, provinces };
  }, [tours, isEn]);

  const filtered = useMemo(() => {
    let result = [...tours];

    if (filters.search) {
      const kw = filters.search;
      result = result.filter(t =>
        (t.province || '').includes(kw) ||
        (isEn ? (t.desc_en || '') : (t.desc || '')).includes(kw) ||
        (t.id || '').toLowerCase().includes(kw.toLowerCase())
      );
    }

    if (filters.duration) {
      result = result.filter(t => (isEn ? t.duration_en : t.duration) === filters.duration);
    }

    if (filters.province.length > 0) {
      result = result.filter(t => filters.province.includes(t.province));
    }

    const [pMin, pMax] = filters.priceRange;
    result = result.filter(t => {
      const p = parsePrice(t.price);
      return p >= pMin && p <= pMax;
    });

    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return result;
  }, [tours, filters, isEn]);

  const { items, totalPages } = paginate(filtered, page);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const sidebarGroups = [
    {
      id: 'search',
      title: isEn ? 'Search' : 'ค้นหา',
      type: 'search',
      value: filters.search,
      onChange: v => updateFilter('search', v),
      placeholder: isEn ? 'Search province, tour code...' : 'ค้นหาจังหวัด, รหัสทัวร์...',
    },
    {
      id: 'duration',
      title: isEn ? 'Duration' : 'ระยะเวลา',
      type: 'select',
      options: filterOptions.durations.map(d => ({ value: d, label: d })),
      value: filters.duration,
      onChange: v => updateFilter('duration', v),
    },
    {
      id: 'price',
      title: isEn ? 'Price Range' : 'ช่วงราคา',
      type: 'range',
      min: minPrice,
      max: maxPrice,
      valueMin: filters.priceRange[0],
      valueMax: filters.priceRange[1],
      onChange: ([min, max]) => updateFilter('priceRange', [min, max]),
      currency: isEn ? '' : '฿',
    },
    {
      id: 'province',
      title: isEn ? 'Province' : 'จังหวัด',
      type: 'checkbox',
      options: filterOptions.provinces.map(p => ({ value: p, label: p })),
      value: filters.province,
      onChange: v => updateFilter('province', v),
    },
    {
      id: 'sort',
      title: isEn ? 'Sort By' : 'เรียงลำดับ',
      type: 'sort',
      value: filters.sortBy,
      onChange: v => updateFilter('sortBy', v),
      options: [
        { value: 'price-asc', label: isEn ? 'Price Low-High' : 'ราคาต่ำ-สูง' },
        { value: 'price-desc', label: isEn ? 'Price High-Low' : 'ราคาสูง-ต่ำ' },
      ],
    },
  ];

  return (
    <section className="page tour-list-page active">
      <div className="tour-list-container">
      <h1>{isEn ? 'Thailand Tours' : 'ทัวร์ในประเทศ'}</h1>
      <div className="tour-list-layout">
        <FilterSidebar
          locale={locale}
          groups={sidebarGroups}
          isMobileOpen={mobileFilterOpen}
          onMobileToggle={() => setMobileFilterOpen(!mobileFilterOpen)}
        />
        <div className="tour-list-content">
          <div className="tour-grid">
            {items.length === 0 ? (
              <p className="no-result">{isEn ? 'No tours found' : 'ไม่พบทัวร์ที่ค้นหา'}</p>
            ) : items.map((t) => (
              <TourCard key={t.id} locale={locale} tour={t} onClick={() => router.push(`/${locale}/tours/${t.id}`)} isDomestic />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }} />
        </div>
      </div>
      </div>
    </section>
  );
}
