'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TourCard from '@/components/TourCard';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';
import useToursFilter from '@/lib/useToursFilter';
import { parsePrice, paginate } from '@/lib/tour-utils';

const durationMapEnToTh = {
  '1 day': '1 วัน',
  '2 days 1 night': '2 วัน 1 คืน',
  '3 days 2 night': '3 วัน 2 คืน',
  '4 days 3 night': '4 วัน 3 คืน',
  '5 days 4 night': '5 วัน 4 คืน',
};

export default function DomesticClient({ locale, tours }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    filters, page, mobileFilterOpen, setMobileFilterOpen,
    minPrice, maxPrice, isEn, updateFilter, setPage,
  } = useToursFilter({ tours, locale, extraFilters: { province: '' } });

  useEffect(() => {
    const d = searchParams.get('duration') || '';
    if (d) {
      const normalized = isEn ? (durationMapEnToTh[d] || d) : d;
      updateFilter('duration', normalized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isEn]);

  const filterOptions = useMemo(() => {
    const durations = [...new Set(tours.map(t => isEn ? t.duration_en : t.duration).filter(Boolean))].sort();
    const provinces = [...new Set(tours.flatMap(t => {
      const p = t.province;
      return Array.isArray(p) ? p : [p];
    }).filter(Boolean))].sort();
    return { durations, provinces };
  }, [tours, isEn]);

  const filtered = useMemo(() => {
    let result = [...tours];

    if (filters.search) {
      const kw = filters.search;
      result = result.filter(t => {
        const prov = Array.isArray(t.province) ? t.province.join(' ') : (t.province || '');
        return prov.includes(kw) ||
          (isEn ? (t.desc_en || '') : (t.desc || '')).includes(kw) ||
          (t.id || '').toLowerCase().includes(kw.toLowerCase());
      });
    }

    if (filters.duration) {
      result = result.filter(t => (isEn ? t.duration_en : t.duration) === filters.duration);
    }

    if (filters.province) {
      result = result.filter(t => {
        const prov = t.province;
        return Array.isArray(prov) ? prov.includes(filters.province) : prov === filters.province;
      });
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
      type: 'select',
      useChoices: true,
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
