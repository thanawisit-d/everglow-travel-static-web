'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import TourCard from '@/components/TourCard';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';
import ActiveFilters from '@/components/ActiveFilters';
import useToursFilter from '@/lib/useToursFilter';
import { parsePrice, paginate } from '@/lib/tour-utils';
import { provinceNameMap } from '@/lib/i18n';
import config from '@/data/site-config.json';

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
  const t = config[locale] || config.th;

  const {
    filters, page, mobileFilterOpen, setMobileFilterOpen,
    minPrice, maxPrice, isEn, updateFilter, setPage,
  } = useToursFilter({ tours, locale, extraFilters: { province: '' } });

  useEffect(() => {
    const d = searchParams.get('duration') || '';
    const p = searchParams.get('province') || '';
    const q = searchParams.get('q') || '';
    if (d) {
      const normalized = isEn ? (durationMapEnToTh[d] || d) : d;
      updateFilter('duration', normalized);
    }
    if (p) {
      updateFilter('province', p);
    }
    if (q) {
      updateFilter('search', q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isEn]);

  const filterOptions = useMemo(() => {
    const durations = [...new Set(tours.map(t => isEn ? t.duration_en : t.duration).filter(Boolean))].sort((a, b) => a.localeCompare(b, isEn ? 'en' : 'th'));
    const provinces = [...new Set(tours.flatMap(t => {
      const p = t.province;
      return Array.isArray(p) ? p : [p];
    }).filter(Boolean))].sort((a, b) => {
      if (isEn) return provinceNameMap[a].localeCompare(provinceNameMap[b], 'en');
      return a.localeCompare(b, 'th');
    });
    return { durations, provinces };
  }, [tours, isEn]);

  const filtered = useMemo(() => {
    let result = [...tours];

    if (filters.search) {
      const kw = filters.search;
      result = result.filter(t => {
        const prov = Array.isArray(t.province) ? t.province.join(' ') : (t.province || '');
        const provEn = Array.isArray(t.province) ? t.province.map(p => provinceNameMap[p] || p).join(' ') : (provinceNameMap[t.province] || t.province || '');
        return prov.includes(kw) || provEn.toLowerCase().includes(kw.toLowerCase()) ||
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

    const [minRaw, maxRaw] = filters.priceRange;
    const pMin = Math.min(minRaw, maxRaw);
    const pMax = Math.max(minRaw, maxRaw);

    result = result.filter(t => {
      const p = parsePrice(t.price);
      if (isNaN(p)) {
        if (process.env.NODE_ENV !== 'production') console.warn('parsePrice failed:', t.price, t.id ?? t.slug);
        return false;
      }
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

  const activeFilters = [
    { id: 'search', label: `"${filters.search}"`, active: !!filters.search, onClear: () => updateFilter('search', '') },
    { id: 'province', label: isEn ? (provinceNameMap[filters.province] || filters.province) : filters.province, active: !!filters.province, onClear: () => updateFilter('province', '') },
    { id: 'duration', label: filters.duration, active: !!filters.duration, onClear: () => updateFilter('duration', '') },
    { id: 'price', label: isEn ? `฿${filters.priceRange[0].toLocaleString()} – ฿${filters.priceRange[1].toLocaleString()}` : `฿${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}`, active: filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice, onClear: () => updateFilter('priceRange', [minPrice, maxPrice]) },
  ];

  const clearAllFilters = () => {
    updateFilter('search', '');
    updateFilter('province', '');
    updateFilter('duration', '');
    updateFilter('priceRange', [minPrice, maxPrice]);
    setPage(1);
  };

  const sidebarGroups = [
    {
      id: 'search',
      title: t.searchTitle,
      type: 'search',
      value: filters.search,
      onChange: v => updateFilter('search', v),
      placeholder: t.searchPlaceholderDomestic,
    },
    {
      id: 'province',
      title: t.destinationTitle,
      type: 'select',
      useChoices: true,
      options: filterOptions.provinces.map(p => ({ value: p, label: isEn ? provinceNameMap[p] || p : p })),
      value: filters.province,
      onChange: v => updateFilter('province', v),
    },
    {
      id: 'price',
      title: t.priceRangeTitle,
      type: 'range',
      min: minPrice,
      max: maxPrice,
      step: 500,
      valueMin: filters.priceRange[0],
      valueMax: filters.priceRange[1],
      onChange: ([min, max]) => updateFilter('priceRange', [min, max]),
      currency: isEn ? '' : '฿',
    },
    {
      id: 'duration',
      title: t.durationTitle,
      type: 'select',
      options: filterOptions.durations.map(d => ({ value: d, label: d })),
      value: filters.duration,
      onChange: v => updateFilter('duration', v),
    },
  ];

  return (
    <section className="page tour-list-page active">
      <div className="page-hero-band">
        <nav className="breadcrumb">
          <Link href={`/${locale}`}>{t.home}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">{t.breadcrumbDomestic}</span>
        </nav>
        <h1 className="page-title">{t.domesticTitle}</h1>
        <p className="page-subtitle">{t.domesticSubtitle}</p>
      </div>
      <div className="tour-list-body">
        <div className="tour-list-layout">
          <FilterSidebar
            locale={locale}
            groups={sidebarGroups}
            isMobileOpen={mobileFilterOpen}
            onMobileToggle={() => setMobileFilterOpen(!mobileFilterOpen)}
          />
          <div className="tour-list-content">
            <div className="results-toolbar">
              <span />
              <span className="results-count">{t.resultsFound.replace('{count}', filtered.length)}</span>
              <select
                className="sort-select"
                value={filters.sortBy}
                onChange={e => updateFilter('sortBy', e.target.value)}
                aria-label={t.sortLabel}
              >
                <option value="">{t.sortDefault}</option>
                <option value="price-asc">{t.sortPriceLow}</option>
                <option value="price-desc">{t.sortPriceHigh}</option>
              </select>
            </div>
            <ActiveFilters items={activeFilters} onClearAll={clearAllFilters} locale={locale} />
            <div className="tour-grid">
              {items.length === 0 ? (
                <div className="no-result">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                    <path d="M8 11h6" />
                  </svg>
                  <p>{t.noTours}</p>
                  <p className="no-result-hint">{t.noToursHint}</p>
                </div>
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
