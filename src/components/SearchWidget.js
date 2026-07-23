'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Compass, Search, Hash, ChevronDown } from 'lucide-react';

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
    tourIdLabel: 'รหัสทัวร์',
    tourIdPlaceholder: 'กรอกรหัสทัวร์',
    tourIdToggle: 'รู้รหัสทัวร์อยู่แล้ว? ค้นหาด้วยรหัส',
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
    tourIdLabel: 'Tour ID',
    tourIdPlaceholder: 'Enter tour ID',
    tourIdToggle: 'Already know your tour ID? Search by ID',
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
  const [showTourId, setShowTourId] = useState(false);
  const [tourId, setTourId] = useState('');

  const domesticOptions = destinations.domestic || [];
  const outboundOptions = destinations.outbound || [];

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
    if (tourId) params.set('q', tourId);
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
              <option value="domestic">{t.typeDomestic}</option>
              <option value="outbound">{t.typeOutbound}</option>
            </select>
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
                    <option key={`d-${name}`} value={`domestic::${name}`}>
                      {name}
                    </option>
                  ))}
                </optgroup>
              )}
              {(!tourType || tourType === 'outbound') && outboundOptions.length > 0 && (
                <optgroup label={t.groupOutbound}>
                  {outboundOptions.map((name) => (
                    <option key={`o-${name}`} value={`outbound::${name}`}>
                      {name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
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

      <div className="search-tourid">
        <button
          type="button"
          className="search-tourid-toggle"
          onClick={() => setShowTourId((v) => !v)}
          aria-expanded={showTourId}
        >
          <Hash size={14} strokeWidth={2.5} />
          {t.tourIdToggle}
          <ChevronDown size={14} strokeWidth={2.5} className={showTourId ? 'is-open' : ''} />
        </button>

        {showTourId && (
          <form className="search-tourid-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t.tourIdPlaceholder}
              value={tourId}
              onChange={(e) => setTourId(e.target.value)}
              autoFocus
            />
            <button type="submit">{t.search}</button>
          </form>
        )}
      </div>
    </div>
  );
}
