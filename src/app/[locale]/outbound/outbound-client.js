'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fieldIncludes } from '@/lib/i18n';
import TourCard from '@/components/TourCard';
import Pagination from '@/components/Pagination';

const PER_PAGE = 12;

function paginate(items, page) {
  const totalPages = Math.ceil(items.length / PER_PAGE) || 1;
  return {
    items: items.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    totalPages,
  };
}

export default function OutboundClient({ locale, tours }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEn = locale === 'en';
  const initialCountry = searchParams.get('country') || '';

  const [country, setCountry] = useState(initialCountry);
  const [cityFilter, setCityFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCountry(searchParams.get('country') || '');
    setPage(1);
  }, [searchParams]);

  const byCountry = country
    ? tours.filter((t) => fieldIncludes(t.country, country))
    : tours;

  const filtered = cityFilter
    ? byCountry.filter((t) =>
        (t.desc || '').includes(cityFilter) ||
        fieldIncludes(t.country, cityFilter) ||
        (t.id || '').toLowerCase().includes(cityFilter.toLowerCase())
      )
    : byCountry;

  const { items, totalPages } = paginate(filtered, page);

  return (
    <section className="page tour-list-page active">
      <h1>{isEn ? 'Outbound Tours' : 'ทัวร์ต่างประเทศ'}</h1>
      <div className="city-filter-wrap">
        <label htmlFor="ob-city-filter" className="sr-only">{isEn ? 'Search city' : 'ค้นหาเมือง'}</label>
        <input id="ob-city-filter" type="text" placeholder={isEn ? 'Search city...' : 'ค้นหาเมือง...'} value={cityFilter} onChange={(e) => { setCityFilter(e.target.value); setPage(1); }} />
      </div>
      <div className="tour-grid">
        {items.map((t) => (
          <TourCard key={t.id} locale={locale} tour={t} onClick={() => router.push(`/${locale}/tours/${t.id}`)} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }} />
    </section>
  );
}
