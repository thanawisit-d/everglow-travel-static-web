'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function SearchBox({ locale, tours }) {
  const t = config[locale] || config.th;
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const locations = useMemo(() => {
    if (!tours) return [];
    const set = new Set();
    tours.forEach((tour) => {
      [tour.country, tour.province].forEach(f => {
        if (Array.isArray(f)) f.forEach(v => set.add(v));
        else if (f) set.add(f);
      });
    });
    return [...set].sort();
  }, [tours]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (keyword) params.set('q', keyword);
    if (date) params.set('date', date);
    router.push(`/${locale}/search?${params.toString()}`);
  };

  return (
    <div className="search-panel">
      <h2>
        <Image src={assetPath('assets/images/icons/search.png')} width={22} height={22} className="search-icon" alt="" />
        {t.searchTitle}
      </h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="search-destination" className="sr-only">{t.destination}</label>
        <select id="search-destination" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">{t.destination}</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
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
        <label htmlFor="search-date" className="sr-only">{t.selectDate}</label>
        <input
          id="search-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">{t.searchBtn}</button>
      </form>
    </div>
  );
}