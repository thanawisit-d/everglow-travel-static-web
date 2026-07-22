'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import config from '@/data/site-config.json';
import { provinceNameMap } from '@/lib/i18n';

export default function SearchBox({ locale, tours }) {
  const t = config[locale] || config.th;
  const router = useRouter();
  const isEn = locale === 'en';
  const [province, setProvince] = useState('');
  const [keyword, setKeyword] = useState('');

  const provinces = useMemo(() => {
    if (!tours) return [];
    const set = new Set();
    tours.forEach((tour) => {
      const p = tour.province;
      if (Array.isArray(p)) p.forEach(v => set.add(v));
      else if (p) set.add(p);
    });
    return [...set].sort((a, b) => {
      if (isEn) return (provinceNameMap[a] || a).localeCompare(provinceNameMap[b] || b, 'en');
      return a.localeCompare(b, 'th');
    });
  }, [tours, isEn]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (province) params.set('province', province);
    if (keyword) params.set('q', keyword);
    router.push(`/${locale}/domestic${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="search-panel">
      <h2>
        <Search size={18} strokeWidth={2.5} />
        {t.searchTitle}
      </h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="search-province" className="sr-only">{t.destination}</label>
        <select id="search-province" value={province} onChange={(e) => setProvince(e.target.value)}>
          <option value="">{t.destination}</option>
          {provinces.map((prov) => (
            <option key={prov} value={prov}>{isEn ? (provinceNameMap[prov] || prov) : prov}</option>
          ))}
        </select>
        <label htmlFor="search-keyword" className="sr-only">{t.tourKeyword}</label>
        <input
          id="search-keyword"
          type="text"
          placeholder={t.tourKeyword}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">{t.searchBtn}</button>
      </form>
    </div>
  );
}
