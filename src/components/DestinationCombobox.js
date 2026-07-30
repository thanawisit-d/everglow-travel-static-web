'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, ChevronDown, X } from 'lucide-react';

export default function DestinationCombobox({
  options,
  value,
  onChange,
  placeholder,
  id,
  noResultsText = 'ไม่พบผลลัพธ์',
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const selected = options.find((o) => o.value === value) || null;

  useEffect(() => {
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const grouped = useMemo(() => {
    const groups = [];
    const seen = new Map();
    filtered.forEach((opt) => {
      const key = opt.group || '';
      if (!seen.has(key)) {
        seen.set(key, { group: key, items: [] });
        groups.push(seen.get(key));
      }
      seen.get(key).items.push(opt);
    });
    return groups;
  }, [filtered]);

  const flatFiltered = filtered;

  const openList = () => {
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const selectOption = (opt) => {
    onChange(opt.value);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange('');
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      openList();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && flatFiltered[activeIndex]) {
        selectOption(flatFiltered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="combobox" ref={rootRef}>
      <div className="combobox-input-row">
        <MapPin size={18} strokeWidth={2} className="search-input-icon" />
        <input
          id={id}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={placeholder}
          value={isOpen ? query : selected?.label || ''}
          onFocus={openList}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />
        {selected && !isOpen ? (
          <button type="button" className="combobox-clear" onClick={clearSelection} aria-label="Clear">
            <X size={15} strokeWidth={2.5} />
          </button>
        ) : (
          <ChevronDown size={16} className="search-input-chevron" />
        )}
      </div>

      {isOpen && (
        <ul className="combobox-panel" role="listbox">
          {flatFiltered.length === 0 && <li className="combobox-empty">{noResultsText}</li>}
          {grouped.map((g) => (
            <li key={g.group || 'ungrouped'} className="combobox-group">
              {g.group && <span className="combobox-group-label">{g.group}</span>}
              <ul>
                {g.items.map((opt) => {
                  const flatIndex = flatFiltered.indexOf(opt);
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        className={`combobox-option${flatIndex === activeIndex ? ' is-active' : ''}${opt.value === value ? ' is-selected' : ''}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectOption(opt)}
                      >
                        {opt.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
