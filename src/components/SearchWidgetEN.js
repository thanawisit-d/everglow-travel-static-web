'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Search } from 'lucide-react';
import DestinationCombobox from './DestinationCombobox';

const TEXT = {
  destinationLabel: 'Destination',
  destinationPlaceholder: 'Search a destination in Thailand',
  dateLabel: 'Travel date',
  search: 'Search',
};

export default function SearchWidgetEN({ destinations = [] }) {
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const options = useMemo(
    () => destinations.map((name) => ({ value: name, label: name })),
    [destinations]
  );

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (destination) params.set('province', destination);
    if (date) params.set('date', date);

    router.push(`/en/domestic${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="search-widget-wrapper">
      <form className="search-widget search-widget--en" onSubmit={handleSearch}>
        <div className="search-field">
          <label htmlFor="sw-en-destination">{TEXT.destinationLabel}</label>
          <div className="search-input search-input--combobox">
            <DestinationCombobox
              id="sw-en-destination"
              options={options}
              value={destination}
              onChange={setDestination}
              placeholder={TEXT.destinationPlaceholder}
            />
          </div>
        </div>

        <div className="search-divider" aria-hidden="true" />

        <div className="search-field">
          <label htmlFor="sw-en-date">{TEXT.dateLabel}</label>
          <div className="search-input">
            <Calendar size={18} strokeWidth={2} className="search-input-icon" />
            <input id="sw-en-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <button type="submit" className="search-submit">
          <Search size={18} strokeWidth={2.5} />
          {TEXT.search}
        </button>
      </form>
    </div>
  );
}
