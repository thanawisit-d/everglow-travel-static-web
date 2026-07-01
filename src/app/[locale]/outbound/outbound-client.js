'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fieldIncludes, countryNameMap } from '@/lib/i18n';
import TourCard from '@/components/TourCard';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';
import useToursFilter from '@/lib/useToursFilter';
import { parsePrice, paginate } from '@/lib/tour-utils';
import config from '@/data/site-config.json';

function getCountryLabel(countryTh, isEn) {
  if (isEn) return countryNameMap[countryTh] || countryTh;
  return countryTh;
}

export default function OutboundClient({ locale, tours }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const countryToContinent = useMemo(() => {
    const map = {};
    config.countryGroups.forEach(g => g.items.forEach(c => { map[c.name] = g.label; }));
    return map;
  }, []);

  const {
    filters, page, mobileFilterOpen, setMobileFilterOpen,
    minPrice, maxPrice, isEn, updateFilter, setPage,
  } = useToursFilter({ tours, locale, extraFilters: { country: '', continent: [] } });

  useEffect(() => {
    const c = searchParams.get('country') || '';
    if (c) {
      updateFilter('country', c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterOptions = useMemo(() => {
    const countries = [...new Set(tours.flatMap(t => {
      const c = t.country;
      return Array.isArray(c) ? c : [c];
    }).filter(Boolean))].sort();
    const durations = [...new Set(tours.map(t => isEn ? t.duration_en : t.duration).filter(Boolean))].sort();
    return { countries, durations };
  }, [tours, isEn]);

  const filtered = useMemo(() => {
    let result = [...tours];

    if (filters.search) {
      const kw = filters.search;
      result = result.filter(t =>
        (t.desc || t.desc_en || '').includes(kw) ||
        fieldIncludes(t.country, kw) ||
        (t.id || '').toLowerCase().includes(kw.toLowerCase())
      );
    }

    if (filters.country) {
      result = result.filter(t => {
        const c = t.country;
        return Array.isArray(c) ? c.includes(filters.country) : c === filters.country;
      });
    }

    if (filters.continent?.length) {
      result = result.filter(t => {
        const countries = Array.isArray(t.country) ? t.country : [t.country];
        return countries.some(c => filters.continent.includes(countryToContinent[c]));
      });
    }

    if (filters.duration) {
      result = result.filter(t => (isEn ? t.duration_en : t.duration) === filters.duration);
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
      placeholder: isEn ? 'Search country, tour code...' : 'ค้นหาประเทศ, รหัสทัวร์...',
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
    {
      id: 'continent',
      title: isEn ? 'Continent' : 'ทวีป',
      type: 'checkbox',
      value: filters.continent,
      onChange: v => updateFilter('continent', v),
      options: config.countryGroups.map(g => ({
        value: g.label,
        label: isEn ? g.labelEn : g.label,
      })),
    },
    {
      id: 'country',
      title: isEn ? 'Country' : 'ประเทศ',
      type: 'select',
      useChoices: true,
      options: filterOptions.countries.map(c => ({ value: c, label: getCountryLabel(c, isEn) })),
      value: filters.country,
      onChange: v => updateFilter('country', v),
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
  ];

  return (
    <section className="page tour-list-page active">
      <div className="tour-list-container">
      <h1>{isEn ? 'Outbound Tours' : 'ทัวร์ต่างประเทศ'}</h1>
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
              <TourCard key={t.id} locale={locale} tour={t} onClick={() => router.push(`/${locale}/tours/${t.id}`)} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }} />
        </div>
      </div>
      </div>
    </section>
  );
}
