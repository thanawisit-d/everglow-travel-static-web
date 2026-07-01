'use client';

import { useRef, useEffect } from 'react';

export default function FilterChoices({ value, onChange, options, placeholder }) {
  const selectRef = useRef(null);
  const instanceRef = useRef(null);
  const onChangeRef = useRef(null);
  const optionsRef = useRef(null);
  const placeholderText = placeholder || 'All';

  useEffect(() => { onChangeRef.current = onChange; });

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    let cancelled = false;
    let handler;
    const el = selectRef.current;

    const initChoices = async () => {
      const Choices = (await import('choices.js')).default;
      if (cancelled || !el) return;

      const choices = new Choices(el, {
        searchEnabled: optionsRef.current.length > 10,
        itemSelectText: '',
        shouldSort: false,
        placeholder: true,
        noResultsText: 'No results found',
      });

      instanceRef.current = choices;

      handler = (e) => onChangeRef.current(e.target.value);
      el.addEventListener('change', handler);
    };

    initChoices();

    return () => {
      cancelled = true;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
      if (el && handler) el.removeEventListener('change', handler);
    };
  }, [options.length]);

  useEffect(() => {
    const choices = instanceRef.current;
    if (!choices) return;
    if (choices.getValue(true) !== value) {
      choices.setChoiceByValue(value || '');
    }
  }, [value]);

  return (
    <select ref={selectRef} className="filter-choices-select">
      <option value="">{placeholderText}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
