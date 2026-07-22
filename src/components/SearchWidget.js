'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Compass, Search } from 'lucide-react';

const TEXT = {
  th: {
    destinationLabel: 'ปลายทาง',
    destinationPlaceholder: 'เลือกปลายทาง',
    typeLabel: 'ประเภททัวร์',
    typePlaceholder: 'เลือกประเภท',
    typeDomestic: 'ทัวร์ในประเทศ',
    typeOutbound: 'ทัวร์ต่างประเทศ',
    tourIdLabel: 'รหัสทัวร์',
    tourIdPlaceholder: 'กรอกรหัสทัวร์',
    dateLabel: 'วันเดินทาง',
    datePlaceholder: 'เลือกวันที่',
    search: 'ค้นหา',
  },
  en: {
    destinationLabel: 'Destination',
    destinationPlaceholder: 'Choose a destination',
    typeLabel: 'Tour type',
    typePlaceholder: 'Choose a type',
    typeDomestic: 'Domestic tours',
    typeOutbound: 'Outbound tours',
    tourIdLabel: 'Tour ID',
    tourIdPlaceholder: 'Enter tour ID',
    dateLabel: 'Travel date',
    datePlaceholder: 'Select date',
    search: 'Search',
  },
};

export default function SearchWidget({ locale, destinations = [] }) {
  const router = useRouter();
  const t = TEXT[locale] || TEXT.th;

  const [destination, setDestination] = useState('');
  const [tourType, setTourType] = useState('');
  const [tourId, setTourId] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) {
      if (tourType === 'outbound') params.set('country', destination);
      else params.set('province', destination);
    }
    if (tourId) params.set('q', tourId);
    if (date) params.set('date', date);
    const basePath = tourType === 'outbound' ? 'outbound' : 'domestic';
    router.push(`/${locale}/${basePath}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="search-widget-wrapper">
      <form className="search-widget" onSubmit={handleSearch}>
        <div className="search-field">
          <label htmlFor="sw-type">{t.typeLabel}</label>
          <div className="search-input">
            <Compass size={18} strokeWidth={2} className="search-input-icon" />
            <select id="sw-type" value={tourType} onChange={(e) => setTourType(e.target.value)}>
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
              {destinations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="search-divider" aria-hidden="true" />

        <div className="search-field">
          <label htmlFor="sw-tourid">{t.tourIdLabel}</label>
          <div className="search-input">
            <Search size={18} strokeWidth={2} className="search-input-icon" />
            <input
              id="sw-tourid"
              type="text"
              placeholder={t.tourIdPlaceholder}
              value={tourId}
              onChange={(e) => setTourId(e.target.value)}
            />
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
