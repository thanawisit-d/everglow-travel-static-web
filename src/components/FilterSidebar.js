'use client';

import FilterChoices from './FilterChoices';

export default function FilterSidebar({ locale, groups, isMobileOpen, onMobileToggle }) {
  const isEn = locale === 'en';

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

      <aside className={`filter-sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="filter-sidebar-header">
          <h3>{isEn ? 'Filters' : 'ตัวกรอง'}</h3>
          <button className="filter-close-btn" onClick={onMobileToggle}>×</button>
        </div>

        {groups.map(group => (
          <div className="filter-group" key={group.id}>
            <h4 className="filter-group-title">{group.title}</h4>
            {group.type === 'search' && (
              <input
                type="text"
                className="filter-search-input"
                placeholder={group.placeholder || (isEn ? 'Search...' : 'ค้นหา...')}
                value={group.value || ''}
                onChange={e => group.onChange(e.target.value)}
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
                    max={group.valueMax ?? group.max}
                    value={group.valueMin ?? group.min}
                    onChange={e => {
                      const v = Math.min(Number(e.target.value), group.valueMax ?? group.max);
                      if (!isNaN(v)) group.onChange([v, group.valueMax ?? group.max]);
                    }}
                  />
                  <span className="range-sep">—</span>
                  <input
                    type="number"
                    className="range-number"
                    min={group.valueMin ?? group.min}
                    max={group.max}
                    value={group.valueMax ?? group.max}
                    onChange={e => {
                      const v = Math.max(Number(e.target.value), group.valueMin ?? group.min);
                      if (!isNaN(v)) group.onChange([group.valueMin ?? group.min, v]);
                    }}
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
                    value={group.valueMin ?? group.min}
                    onChange={e => {
                      const v = Math.min(Number(e.target.value), group.valueMax ?? group.max);
                      group.onChange([v, group.valueMax ?? group.max]);
                    }}
                  />
                  <input
                    type="range"
                    className="range-input range-input-max"
                    min={group.min}
                    max={group.max}
                    value={group.valueMax ?? group.max}
                    onChange={e => {
                      const v = Math.max(Number(e.target.value), group.valueMin ?? group.min);
                      group.onChange([group.valueMin ?? group.min, v]);
                    }}
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
