'use client';

import { useState, useRef, useEffect } from 'react';
import { thaiProvinces } from '@/lib/utils';

export default function ProvinceSelector({ tours, onSelect, locale }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filtered = thaiProvinces.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <section className="province-section">
      <h2 style={{ textAlign: 'center', margin: '30px 0', color: '#1a2a4a' }}>
        {locale === 'th' ? 'เลือกจังหวัดที่ต้องการเดินทาง' : 'Select Province'}
      </h2>
      <div className="province-search-wrapper" ref={wrapperRef}>
        <label htmlFor="province-search" className="sr-only">{locale === 'th' ? 'ค้นหาจังหวัด' : 'Search province'}</label>
        <input
          id="province-search"
          type="text"
          placeholder={locale === 'th' ? 'ค้นหาหรือเลือกจังหวัด' : 'Search province'}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        <div className={`province-dropdown ${open ? 'show' : ''}`}>
          {filtered.length === 0 ? (
            <div style={{ padding: 14, color: '#999' }}>
              {locale === 'th' ? 'ไม่พบจังหวัด' : 'No province found'}
            </div>
          ) : (
            filtered.map((p) => (
              <button key={p} type="button" onClick={() => { setQuery(p); setOpen(false); onSelect(p); }}>
                {p}
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
