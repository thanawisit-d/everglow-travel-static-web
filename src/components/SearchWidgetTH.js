'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import DestinationCombobox from './DestinationCombobox';
import MonthPicker from './MonthPicker';

const TEXT = {
  destinationLabel: 'ปลายทาง',
  destinationPlaceholder: 'พิมพ์ชื่อจังหวัดหรือประเทศ',
  typeLabel: 'ประเภททัวร์',
  typeDomestic: 'ในประเทศ',
  typeOutbound: 'ต่างประเทศ',
  groupDomestic: 'ในประเทศ',
  groupOutbound: 'ต่างประเทศ',
  dateLabel: 'เดือนเดินทาง',
  datePlaceholder: 'เลือกเดือนเดินทาง',
  search: 'ค้นหา',
};

export default function SearchWidgetTH({ locale = 'th', destinations = { domestic: [], outbound: [] } }) {
  const router = useRouter();

  const domesticOptions = useMemo(() => destinations.domestic || [], [destinations]);
  const outboundOptions = useMemo(() => destinations.outbound || [], [destinations]);
  const hasOutbound = outboundOptions.length > 0;
  const hasDomestic = domesticOptions.length > 0;

  const [tourType, setTourType] = useState(hasDomestic ? 'domestic' : 'outbound');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const options = useMemo(() => {
    const list = [];
    if (tourType === 'domestic') {
      domesticOptions.forEach((name) => list.push({ value: name, label: name, group: TEXT.groupDomestic }));
    } else {
      outboundOptions.forEach((name) => list.push({ value: name, label: name, group: TEXT.groupOutbound }));
    }
    return list;
  }, [tourType, domesticOptions, outboundOptions]);

  const handleTypeChange = (value) => {
    setTourType(value);
    setDestination('');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (destination) {
      params.set(tourType === 'outbound' ? 'country' : 'province', destination);
    }
    if (date) params.set('date', date);

    router.push(`/th/${tourType}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="search-widget-wrapper">
      <form className="search-widget" onSubmit={handleSearch}>
        <div className="search-field search-field--type">
          <label>{TEXT.typeLabel}</label>
          <div className="segmented" role="group" aria-label={TEXT.typeLabel}>
            {hasDomestic && (
              <button
                type="button"
                className={`segmented-opt${tourType === 'domestic' ? ' is-active' : ''}`}
                onClick={() => handleTypeChange('domestic')}
              >
                {TEXT.typeDomestic}
              </button>
            )}
            {hasOutbound && (
              <button
                type="button"
                className={`segmented-opt${tourType === 'outbound' ? ' is-active' : ''}`}
                onClick={() => handleTypeChange('outbound')}
              >
                {TEXT.typeOutbound}
              </button>
            )}
          </div>
        </div>

        <div className="search-divider" aria-hidden="true" />

        <div className="search-field">
          <label htmlFor="sw-destination">{TEXT.destinationLabel}</label>
          <div className="search-input search-input--combobox">
            <DestinationCombobox
              id="sw-destination"
              options={options}
              value={destination}
              onChange={setDestination}
              placeholder={TEXT.destinationPlaceholder}
              clearLabel="ล้าง"
            />
          </div>
        </div>

        <div className="search-divider" aria-hidden="true" />

        <div className="search-field">
          <label htmlFor="sw-date">{TEXT.dateLabel}</label>
          <div className="search-input search-input--combobox">
            <MonthPicker
              id="sw-date"
              value={date}
              onChange={setDate}
              locale={locale}
              placeholder={TEXT.datePlaceholder}
            />
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
