'use client';

import { useState } from 'react';
import { assetPath, formatPrice } from '@/lib/utils';
import toursData from '@/data/tours.json';

const thaiCountries = [
  'ญี่ปุ่น', 'เกาหลีใต้', 'จีน', 'ไต้หวัน', 'ฝรั่งเศส', 'อิตาลี',
  'สวิตเซอร์แลนด์', 'เยอรมนี', 'อังกฤษ', 'สเปน', 'เนเธอร์แลนด์',
  'สหรัฐอเมริกา', 'แคนาดา', 'สิงคโปร์', 'มาเลเซีย', 'เวียดนาม',
  'อินโดนีเซีย', 'ดูไบ (UAE)', 'ฮ่องกง',
];

export default function SearchBox({ locale, tours, onResult }) {
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = tours.filter((tour) => {
      const matchCountry = !country || (tour.country || '').includes(country);
      const matchCode = !code || (tour.id || '').toLowerCase().includes(code.toLowerCase());
      return matchCountry && matchCode;
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
        {locale === 'th' ? (
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">เลือกประเทศ</option>
            {thaiCountries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ) : (
          <select id="city">
            <option value="">Destination</option>
            {['Bangkok','Krabi','Kanchanaburi','Chiang Mai','Chiang Rai','Phuket','Pattaya'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder={locale === 'th' ? 'รหัสทัวร์ / โปรแกรม' : 'Tour ID'}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input type="text" placeholder={locale === 'th' ? 'ช่วงวันเดินทาง' : 'Travel Date'} onFocus={(e) => { e.target.type = 'date'; }} />
        <button type="submit">{locale === 'th' ? 'ค้นหา' : 'Search'}</button>
      </form>
    </section>
  );
}
