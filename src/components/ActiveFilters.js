'use client';

import { X } from 'lucide-react';

export default function ActiveFilters({ items, onClearAll, locale }) {
  const active = items.filter(i => i.active);
  if (!active.length) return null;

  return (
    <div className="active-tags">
      {active.map(item => (
        <button
          key={item.id}
          className="active-tag"
          onClick={item.onClear}
          aria-label={locale === 'en' ? `Remove filter: ${item.label}` : `ลบตัวกรอง: ${item.label}`}
        >
          <span className="active-tag-label">{item.label}</span>
          <X size={14} />
        </button>
      ))}
      <button className="active-tag active-tag--clear" onClick={onClearAll}>
        {locale === 'en' ? 'Clear all' : 'ล้างทั้งหมด'}
      </button>
    </div>
  );
}
