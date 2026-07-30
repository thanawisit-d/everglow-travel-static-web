'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Compass, Search, ChevronDown } from 'lucide-react';

const TEXT = {
  th: {
    destinationLabel: 'ปลายทาง',
    destinationPlaceholder: 'เลือกปลายทาง',
    typeLabel: 'ประเภททัวร์',
    typePlaceholder: 'ทุกประเภท',
    typeDomestic: 'ทัวร์ในประเทศ',
    typeOutbound: 'ทัวร์ต่างประเทศ',
    groupDomestic: 'ในประเทศ',
    groupOutbound: 'ต่างประเทศ',
    dateLabel: 'วันเดินทาง',
    search: 'ค้นหา',
  },
  en: {
    destinationLabel: 'Destination',
    destinationPlaceholder: 'Choose a destination',
    typeLabel: 'Tour type',
    typePlaceholder: 'All types',
    typeDomestic: 'Domestic tours',
    typeOutbound: 'Outbound tours',
    groupDomestic: 'Domestic',
    groupOutbound: 'Outbound',
    dateLabel: 'Travel date',
    search: 'Search',
  },
};

export default function SearchWidget({ locale, destinations = { domestic: [], outbound: [] } }) {
  const router = useRouter();
  const t = TEXT[locale] || TEXT.th;

  const [tourType, setTourType] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const domesticOptions = destinations.domestic || [];
  const outboundOptions = destinations.outbound || [];
  const hasOutbound = outboundOptions.length > 0;

  // if the locale/data changes underneath us (e.g. switching to EN, which has
  // no outbound tours) and the current selection no longer makes sense,
  // reset instead of leaving the widget pointed at data that doesn"t exist
  useEffect(() => {
    if (tourType === 'outbound' && !hasOutbound) {
      setTourType('');
      setDestination('');
      return;
    }
    if (destination && destination.startsWith('outbound::') && !hasOutbound) {
      setDestination('');
    }
  }, [hasOutbound, tourType, destination]);

  const handleTypeChange = (value) => {
    setTourType(value);
    if (value && destination && !destination.startsWith(`${value}::`)) {
      setDestination('');
    }
  };

  const parsedDestination = useMemo(() => {
    if (!destination) return null;
    const [type, ...rest] = destination.split('::');
    return { type, name: rest.join('::') };
  }, [destination]);

  const handleSearch = (e) => {
    e.preventDefault();

    const effectiveType = parsedDestination?.type || tourType || 'domestic';

    const params = new URLSearchParams();
    if (parsedDestination) {
      params.set(effectiveType === 'outbound' ? 'country' : 'province', parsedDestination.name);
    }
    if (date) params.set('date', date);

    router.push(`/${locale}/${effectiveType}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="search-widget-wrapper">
      <form className="search-widget" onSubmit={handleSearch}>
        <div className="search-field">
          <label htmlFor="sw-type">{t.typeLabel}</label>
          <div className="search-input">
            <Compass size={18} strokeWidth={2} className="search-input-icon" />
            <select id="sw-type" value={tourType} onChange={(e) => handleTypeChange(e.target.value)}>
              <option value="">{t.typePlaceholder}</option>
              {domesticOptions.length > 0 && <option value="domestic">{t.typeDomestic}</option>}
              {hasOutbound && <option value="outbound">{t.typeOutbound}</option>}
            </select>
            <ChevronDown size={16} className="search-input-chevron" />
          </div>
        </div>

        <div className="search-divider" aria-hidden="true" />

        <div className="search-field">
          <label htmlFor="sw-destination">{t.destinationLabel}</label>
          <div className="search-input">
            <MapPin size={18} strokeWidth={2} className="search-input-icon" />
            <select id="sw-destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="">{t.destinationPlaceholder}</option>
              {(!tourType || tourType === 'domestic') && domesticOptions.length > 0 && (
                <optgroup label={t.groupDomestic}>
                  {domesticOptions.map((name) => (
                    <option key={`d-${name}`} value={`domestic::${name}`}>{name}</option>
                  ))}
                </optgroup>
              )}
              {(!tourType || tourType === 'outbound') && hasOutbound && (
                <optgroup label={t.groupOutbound}>
                  {outboundOptions.map((name) => (
                    <option key={`o-${name}`} value={`outbound::${name}`}>{name}</option>
                  ))}
                </optgroup>
              )}
            </select>
            <ChevronDown size={16} className="search-input-chevron" />
          </div>
        </div>

        <div className="search-divider" aria-hidden="true" />

        <div className="search-field">
          <label htmlFor="sw-date">{t.dateLabel}</label>
          <div className="search-input">
            <Calendar size={18} strokeWidth={2} className="search-input-icon" />
            <input id="sw-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="search-submit">
          <Search size={18} strokeWidth={2.5} />
          {t.search}
        </button>
      </form>
    </div>
  );
}
