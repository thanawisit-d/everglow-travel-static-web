'use client';

import { useState, useRef, useEffect } from 'react';
import { thaiProvinces } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function ProvinceSelector({ tours, onSelect, locale }) {
  const t = config[locale];
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
      <h2>
        {t.selectProvince}
      </h2>
      <div className="province-search-wrapper" ref={wrapperRef}>
        <label htmlFor="province-search" className="sr-only">{t.searchProvince}</label>
        <input
          id="province-search"
          type="text"
          placeholder={t.searchProvincePlaceholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        <div className={`province-dropdown ${open ? 'show' : ''}`}>
          {filtered.length === 0 ? (
            <div className="empty-result">
              {t.noProvince}
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
