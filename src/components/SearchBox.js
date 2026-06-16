'use client';

import { useState, useMemo } from 'react';
import { assetPath } from '@/lib/utils';

export default function SearchBox({ locale, tours, onResult }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const locations = useMemo(() => {
    const set = new Set();
    tours.forEach((t) => {
      if (t.country) set.add(t.country);
      if (t.province) set.add(t.province);
    });
    return [...set].sort();
  }, [tours]);

  const handleSearch = (e) => {
    e.preventDefault();
    const selectedMonth = date ? date.substring(0, 7) : '';
    const filtered = tours.filter((tour) => {
      const matchLocation = !location ||
        (tour.country || '').includes(location) ||
        (tour.province || '').includes(location);
      const matchKeyword = !keyword ||
        (tour.id || '').toLowerCase().includes(keyword.toLowerCase()) ||
        (tour.desc || '').toLowerCase().includes(keyword.toLowerCase());
      const matchDate = !selectedMonth || !tour.startMonth ||
        (selectedMonth >= tour.startMonth && selectedMonth <= tour.endMonth);
      return matchLocation && matchKeyword && matchDate;
    });
    onResult(filtered);
  };

  return (
    <section className="search-box">
      <h2>
        <img src={assetPath('assets/images/search.png')} className="search-icon" alt="" />
        {locale === 'th' ? 'ค้นหาโปรแกรมทัวร์' : 'Search Tour Programs'}
      </h2>
      <form onSubmit={handleSearch}>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">{locale === 'th' ? 'เลือกประเทศ/จังหวัด' : 'Destination'}</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder={locale === 'th' ? 'รหัสทัวร์ / คำค้น' : 'Tour ID / Keyword'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">{locale === 'th' ? 'ค้นหา' : 'Search'}</button>
      </form>
    </section>
  );
}
