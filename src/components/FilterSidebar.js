'use client';

import { useEffect, useRef } from 'react';
import FilterChoices from './FilterChoices';

export default function FilterSidebar({ locale, groups, isMobileOpen, onMobileToggle }) {
  const isEn = locale === 'en';
  const asideRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isMobileOpen) return;
    const timer = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const aside = asideRef.current;
    if (!aside) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onMobileToggle();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = aside.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isMobileOpen, onMobileToggle]);

  return (
    <>
      <button
        className="filter-toggle-btn"
        onClick={onMobileToggle}
        aria-label={isEn ? 'Toggle filters' : 'เปิด/ปิดตัวกรอง'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        {isEn ? 'Filters' : 'ตัวกรอง'}
      </button>

      {isMobileOpen && <div className="filter-overlay" onClick={onMobileToggle} />}

      <aside ref={asideRef} className={`filter-sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="filter-sidebar-header">
          <h2>{isEn ? 'Filters' : 'ตัวกรอง'}</h2>
          <button ref={closeBtnRef} className="filter-close-btn" onClick={onMobileToggle} aria-label={isEn ? 'Close filters' : 'ปิดตัวกรอง'}>×</button>
        </div>

        {groups.map(group => (
          <div className="filter-group" key={group.id}>
            <h3 className="filter-group-title">{group.title}</h3>
            {group.type === 'search' && (
              <input
                type="text"
                className="filter-search-input"
                placeholder={group.placeholder || (isEn ? 'Search...' : 'ค้นหา...')}
                value={group.value || ''}
                onChange={e => group.onChange(e.target.value)}
                aria-label={group.title || (isEn ? 'Search' : 'ค้นหา')}
              />
            )}
            {group.type === 'checkbox' && group.options?.map(opt => (
              <label className="filter-checkbox" key={opt.value}>
                <input
                  type="checkbox"
                  checked={(group.value || []).includes(opt.value)}
                  onChange={() => {
                    const current = group.value || [];
                    const idx = current.indexOf(opt.value);
                    const next = idx === -1 ? [...current, opt.value] : current.filter(v => v !== opt.value);
                    group.onChange(next);
                  }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
            {group.type === 'sort' && (
              <select
                className="filter-select"
                value={group.value || ''}
                onChange={e => group.onChange(e.target.value)}
              >
                <option value="">{isEn ? 'Default' : 'เรียงลำดับ'}</option>
                {group.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
            {group.type === 'select' && (
              group.useChoices ? (
                <FilterChoices
                  value={group.value || ''}
                  onChange={group.onChange}
                  options={group.options}
                  placeholder={isEn ? 'All' : 'ทั้งหมด'}
                />
              ) : (
                <select
                  className="filter-select"
                  value={group.value || ''}
                  onChange={e => group.onChange(e.target.value)}
                >
                  <option value="">{isEn ? 'All' : 'ทั้งหมด'}</option>
                  {group.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )
            )}
            {group.type === 'range' && (
              <div className="range-slider">
                <div className="range-inputs">
                  <input
                    type="number"
                    className="range-number"
                    min={group.min}
                    max={group.max}
                    step={group.step || 1}
                    value={group.valueMin ?? group.min}
                    onChange={e => {
                      const raw = e.target.value;
                      if (raw === '') return;
                      let v = Number(raw);
                      if (isNaN(v)) return;
                      v = Math.max(group.min, Math.min(v, group.max));
                      const currentMax = group.valueMax ?? group.max;
                      v = Math.min(v, currentMax);
                      group.onChange([v, currentMax]);
                    }}
                    onBlur={e => {
                      if (e.target.value === '') {
                        group.onChange([group.valueMin ?? group.min, group.valueMax ?? group.max]);
                      }
                    }}
                    aria-label={isEn ? 'Minimum price' : 'ราคาต่ำสุด'}
                  />
                  <span className="range-sep">—</span>
                  <input
                    type="number"
                    className="range-number"
                    min={group.min}
                    max={group.max}
                    step={group.step || 1}
                    value={group.valueMax ?? group.max}
                    onChange={e => {
                      const raw = e.target.value;
                      if (raw === '') return;
                      let v = Number(raw);
                      if (isNaN(v)) return;
                      v = Math.max(group.min, Math.min(v, group.max));
                      const currentMin = group.valueMin ?? group.min;
                      v = Math.max(v, currentMin);
                      group.onChange([currentMin, v]);
                    }}
                    onBlur={e => {
                      if (e.target.value === '') {
                        group.onChange([group.valueMin ?? group.min, group.valueMax ?? group.max]);
                      }
                    }}
                    aria-label={isEn ? 'Maximum price' : 'ราคาสูงสุด'}
                  />
                </div>
                <div className="range-track-wrap">
                  <div className="range-bg" />
                  <div
                    className="range-fill"
                    style={{
                      left: `${(((group.valueMin ?? group.min) - group.min) / (group.max - group.min)) * 100}%`,
                      width: `${(((group.valueMax ?? group.max) - (group.valueMin ?? group.min)) / (group.max - group.min)) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    className="range-input range-input-min"
                    min={group.min}
                    max={group.max}
                    step={group.step || 1}
                    value={group.valueMin ?? group.min}
                    onChange={e => {
                      let v = Number(e.target.value);
                      if (isNaN(v)) return;
                      v = Math.max(group.min, Math.min(v, group.max));
                      const currentMax = group.valueMax ?? group.max;
                      v = Math.min(v, currentMax);
                      group.onChange([v, currentMax]);
                    }}
                    aria-label={isEn ? 'Minimum price slider' : 'แถบเลื่อนราคาต่ำสุด'}
                  />
                  <input
                    type="range"
                    className="range-input range-input-max"
                    min={group.min}
                    max={group.max}
                    step={group.step || 1}
                    value={group.valueMax ?? group.max}
                    onChange={e => {
                      let v = Number(e.target.value);
                      if (isNaN(v)) return;
                      v = Math.max(group.min, Math.min(v, group.max));
                      const currentMin = group.valueMin ?? group.min;
                      v = Math.max(v, currentMin);
                      group.onChange([currentMin, v]);
                    }}
                    aria-label={isEn ? 'Maximum price slider' : 'แถบเลื่อนราคาสูงสุด'}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </aside>
    </>
  );
}
