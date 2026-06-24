'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assetPath, fieldIncludes } from '@/lib/utils';

export default function SearchBox({ locale, tours }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const locations = useMemo(() => {
    const set = new Set();
    tours.forEach((t) => {
      [t.country, t.province].forEach(f => {
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
        <Image src={assetPath('assets/images/search.png')} width={22} height={22} className="search-icon" alt="" />
        {locale === 'th' ? 'ค้นหาโปรแกรมทัวร์' : 'Search Tour Programs'}
      </h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="search-destination" className="sr-only">{locale === 'th' ? 'เลือกประเทศ/จังหวัด' : 'Destination'}</label>
        <select id="search-destination" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">{locale === 'th' ? 'เลือกประเทศ/จังหวัด' : 'Destination'}</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <label htmlFor="search-keyword" className="sr-only">{locale === 'th' ? 'รหัสทัวร์ / คำค้น' : 'Tour ID / Keyword'}</label>
        <input
        
          id="search-keyword"
          type="text"
          placeholder={locale === 'th' ? 'รหัสทัวร์ / คำค้น' : 'Tour ID / Keyword'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <label htmlFor="search-date" className="sr-only">{locale === 'th' ? 'เลือกวันที่' : 'Select date'}</label>
        <input
          id="search-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">{locale === 'th' ? 'ค้นหา' : 'Search'}</button>
      </form>
    </div>
  );
}