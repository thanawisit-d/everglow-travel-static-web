'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTHS_TH = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

const pad = (n) => String(n).padStart(2, '0');

export default function MonthPicker({ id, value = '', onChange, locale = 'th', placeholder = '' }) {
  const isEn = locale === 'en';
  const months = isEn ? MONTHS_EN : MONTHS_TH;
  const yearDisplayOffset = isEn ? 0 : 543;

  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedYear = value ? parseInt(value.slice(0, 4), 10) : null;
  const selectedMonth = value ? parseInt(value.slice(5, 7), 10) : null;

  const [viewYear, setViewYear] = useState(() => {
    const now = new Date();
    return selectedYear || now.getFullYear();
  });

  useEffect(() => {
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const today = new Date();
  const todayYM = `${today.getFullYear()}-${pad(today.getMonth() + 1)}`;
  const panelId = id ? `${id}-panel` : 'month-picker-panel';

  const displayLabel = value
    ? `${months[selectedMonth - 1]} ${selectedYear + yearDisplayOffset}`
    : '';

  const openPicker = () => {
    setIsOpen(true);
    requestAnimationFrame(() => {
      const cells = rootRef.current?.querySelectorAll('.month-cell') || [];
      const idx = selectedMonth ? selectedMonth - 1 : today.getMonth();
      cells[idx]?.focus();
    });
  };

  const selectMonth = (m) => {
    onChange(`${viewYear}-${pad(m + 1)}`);
    setIsOpen(false);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange('');
  };

  const handleTriggerKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      openPicker();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleCellKeyDown = (e) => {
    const cells = Array.from(rootRef.current?.querySelectorAll('.month-cell') || []);
    const idx = cells.indexOf(e.currentTarget);
    if (idx === -1) return;

    let next = idx;
    if (e.key === 'ArrowRight') next = Math.min(idx + 1, 11);
    else if (e.key === 'ArrowLeft') next = Math.max(idx - 1, 0);
    else if (e.key === 'ArrowDown') next = Math.min(idx + 3, 11);
    else if (e.key === 'ArrowUp') next = Math.max(idx - 3, 0);
    else return;

    e.preventDefault();
    cells[next]?.focus();
  };

  return (
    <div className="month-picker" ref={rootRef}>
      <div className="combobox-input-row">
        <Calendar size={18} strokeWidth={2} className="search-input-icon" />
        <input
          id={id}
          type="text"
          readOnly
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-haspopup="dialog"
          placeholder={placeholder}
          value={displayLabel}
          onFocus={openPicker}
          onClick={openPicker}
          onKeyDown={handleTriggerKeyDown}
        />
        {value ? (
          <button
            type="button"
            className="combobox-clear"
            onClick={clearSelection}
            aria-label={isEn ? 'Clear' : 'ล้าง'}
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        ) : (
          <ChevronDown size={16} className="search-input-chevron" />
        )}
      </div>

      {isOpen && (
        <div className="month-picker-panel" id={panelId} role="dialog" aria-label={isEn ? 'Select month' : 'เลือกเดือนเดินทาง'}>
          <div className="month-picker-nav">
            <button
              type="button"
              className="month-picker-nav-btn"
              onClick={() => setViewYear((y) => y - 1)}
              aria-label={isEn ? 'Previous year' : 'ปีก่อนหน้า'}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="month-picker-year">{viewYear + yearDisplayOffset}</span>
            <button
              type="button"
              className="month-picker-nav-btn"
              onClick={() => setViewYear((y) => y + 1)}
              aria-label={isEn ? 'Next year' : 'ปีถัดไป'}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="month-grid">
            {months.map((name, m) => {
              const ym = `${viewYear}-${pad(m + 1)}`;
              return (
                <button
                  key={name}
                  type="button"
                  className={`month-cell${ym === value ? ' is-selected' : ''}${ym === todayYM ? ' is-today' : ''}`}
                  onKeyDown={handleCellKeyDown}
                  onClick={() => selectMonth(m)}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
