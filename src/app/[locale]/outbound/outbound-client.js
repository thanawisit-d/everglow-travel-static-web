'use client';

import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fieldIncludes, countryNameMap } from '@/lib/i18n';
import TourCard from '@/components/TourCard';
import TourCardSkeleton from '@/components/TourCardSkeleton';
import Pagination from '@/components/Pagination';
import FilterSidebar from '@/components/FilterSidebar';
import ActiveFilters from '@/components/ActiveFilters';
import useToursFilter from '@/lib/useToursFilter';
import { tourMatchesMonth, formatMonthLabel } from '@/lib/dateFilter';
import { parsePrice, paginate } from '@/lib/tour-utils';
import { trackSearch, trackFilter } from '@/lib/tracking';
import config from '@/data/site-config.json';

function getCountryLabel(countryTh, isEn) {
  if (isEn) return countryNameMap[countryTh] || countryTh;
  return countryTh;
}

export default function OutboundClient({ locale, tours }) {
  const searchParams = useSearchParams();
  const t = config[locale] || config.th;

  const countryToContinent = useMemo(() => {
    const map = {};
    config.countryGroups.forEach(g => g.items.forEach(c => { map[c.name] = g.label; }));
    return map;
  }, []);

  const {
    filters, page, mobileFilterOpen, setMobileFilterOpen,
    minPrice, maxPrice, isEn, updateFilter, setPage,
  } = useToursFilter({ tours, locale, extraFilters: { country: '', continent: [] } });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef(null);

  const triggerTransition = useCallback(() => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setIsTransitioning(true);
    transitionTimer.current = setTimeout(() => setIsTransitioning(false), 320);
  }, []);

  useEffect(() => () => { if (transitionTimer.current) clearTimeout(transitionTimer.current); }, []);

  const wrappedUpdateFilter = useCallback((key, value) => {
    if (key !== 'search') triggerTransition();
    updateFilter(key, value);
    if (key === 'search' && !value) {
      trackSearch('', { locale, tourType: 'outbound' });
    } else if (key !== 'search') {
      trackFilter(key, value, { locale, tourType: 'outbound' });
    }
  }, [triggerTransition, updateFilter, locale]);

  useEffect(() => {
    const c = searchParams.get('country') || '';
    const q = searchParams.get('q') || '';
    const d = searchParams.get('date') || '';
    if (c) {
      updateFilter('country', c);
    }
    if (q) {
      updateFilter('search', q);
    }
    if (d) {
      updateFilter('date', d);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterOptions = useMemo(() => {
    const countries = [...new Set(tours.flatMap(t => {
      const c = t.country;
      return Array.isArray(c) ? c : [c];
    }).filter(Boolean))].sort((a, b) => {
      if (isEn) {
        return getCountryLabel(a, true).localeCompare(getCountryLabel(b, true), 'en');
      }
      return a.localeCompare(b, 'th');
    });
    const durations = [...new Set(tours.map(t => isEn ? t.duration_en : t.duration).filter(Boolean))].sort((a, b) => a.localeCompare(b, isEn ? 'en' : 'th'));
    return { countries, durations };
  }, [tours, isEn]);

  const filtered = useMemo(() => {
    let result = [...tours];

    if (filters.search) {
      const kw = filters.search.toLowerCase();
      result = result.filter(t =>
        (isEn ? (t.desc_en || t.desc || '') : (t.desc || t.desc_en || '')).toLowerCase().includes(kw) ||
        fieldIncludes(t.country, kw) ||
        (t.id || '').toLowerCase().includes(kw)
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

    if (filters.date) {
      result = result.filter(t => tourMatchesMonth(t, filters.date));
    }

    if (filters.duration) {
      result = result.filter(t => (isEn ? t.duration_en : t.duration) === filters.duration);
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
  }, [tours, filters, isEn, countryToContinent]);

  const { items, totalPages } = paginate(filtered, page);

  const activeFilters = [
    { id: 'search', label: `"${filters.search}"`, active: !!filters.search, onClear: () => wrappedUpdateFilter('search', '') },
    { id: 'continent', label: filters.continent.join(', '), active: filters.continent.length > 0, onClear: () => wrappedUpdateFilter('continent', []) },
    { id: 'country', label: getCountryLabel(filters.country, isEn), active: !!filters.country, onClear: () => wrappedUpdateFilter('country', '') },
    { id: 'duration', label: filters.duration, active: !!filters.duration, onClear: () => wrappedUpdateFilter('duration', '') },
    { id: 'date', label: formatMonthLabel(filters.date, isEn ? 'en' : 'th'), active: !!filters.date, onClear: () => wrappedUpdateFilter('date', '') },
    { id: 'price', label: isEn ? `฿${filters.priceRange[0].toLocaleString()} – ฿${filters.priceRange[1].toLocaleString()}` : `฿${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}`, active: filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice, onClear: () => wrappedUpdateFilter('priceRange', [minPrice, maxPrice]) },
  ];

  const clearAllFilters = () => {
    wrappedUpdateFilter('search', '');
    wrappedUpdateFilter('continent', []);
    wrappedUpdateFilter('country', '');
    wrappedUpdateFilter('duration', '');
    wrappedUpdateFilter('date', '');
    wrappedUpdateFilter('priceRange', [minPrice, maxPrice]);
    setPage(1);
  };

  const sidebarGroups = [
    {
      id: 'search',
      title: t.searchTitle,
      type: 'search',
      value: filters.search,
      onChange: v => wrappedUpdateFilter('search', v),
      placeholder: t.searchPlaceholderOutbound,
    },
    {
      id: 'date',
      title: t.monthTitle,
      type: 'month',
      value: filters.date,
      onChange: v => wrappedUpdateFilter('date', v),
    },
    {
      id: 'continent',
      title: t.continentTitle,
      type: 'checkbox',
      value: filters.continent,
      onChange: v => wrappedUpdateFilter('continent', v),
      options: config.countryGroups.map(g => ({
        value: g.label,
        label: isEn ? g.labelEn : g.label,
      })),
    },
    {
      id: 'country',
      title: t.destinationTitle,
      type: 'select',
      useChoices: true,
      options: filterOptions.countries.map(c => ({ value: c, label: getCountryLabel(c, isEn) })),
      value: filters.country,
      onChange: v => wrappedUpdateFilter('country', v),
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
      onChange: ([min, max]) => wrappedUpdateFilter('priceRange', [min, max]),
      currency: isEn ? '' : '฿',
    },
    {
      id: 'duration',
      title: t.durationTitle,
      type: 'select',
      options: filterOptions.durations.map(d => ({ value: d, label: d })),
      value: filters.duration,
      onChange: v => wrappedUpdateFilter('duration', v),
    },
  ];

  return (
    <section className="page tour-list-page active">
      <div className="page-hero-band">
        <nav className="breadcrumb">
          <Link href={`/${locale}`}>{t.home}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">{t.breadcrumbOutbound}</span>
        </nav>
        <h1 className="page-title">{t.outboundTitle}</h1>
        <p className="page-subtitle">{t.outboundSubtitle}</p>
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
                onChange={e => wrappedUpdateFilter('sortBy', e.target.value)}
                aria-label={t.sortLabel}
              >
                <option value="">{t.sortDefault}</option>
                <option value="price-asc">{t.sortPriceLow}</option>
                <option value="price-desc">{t.sortPriceHigh}</option>
              </select>
            </div>
            <ActiveFilters items={activeFilters} onClearAll={clearAllFilters} locale={locale} />
            <div className={`tour-grid-wrapper ${isTransitioning ? 'tour-grid--transitioning' : 'tour-grid--loaded'}`}>
              <div className="tour-grid">
                {isTransitioning ? (
                  Array.from({ length: Math.min(items.length || 8, 8) }).map((_, i) => (
                    <TourCardSkeleton key={`skel-${i}`} />
                  ))
                ) : items.length === 0 ? (
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
                  <TourCard key={t.id} locale={locale} tour={t} href={`/${locale}/tours/${t.id}`} />
                ))}
              </div>
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
