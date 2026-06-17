'use client';

import { useState } from 'react';
import Image from 'next/image';
import toursData from '@/data/tours.json';
import { assetPath } from '@/lib/utils';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import SearchBox from '@/components/SearchBox';
import TourGrid from '@/components/TourGrid';
import TourCard from '@/components/TourCard';
import ProvinceSelector from '@/components/ProvinceSelector';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Reviews from '@/components/Reviews';
import TourDetail from '@/components/TourDetail';
import Footer from '@/components/Footer';

export default function ThaiPage() {
  const [page, setPage] = useState('home');
  const [selectedTour, setSelectedTour] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [filteredDomestic, setFilteredDomestic] = useState(null);
  const [filteredOutbound, setFilteredOutbound] = useState(null);
  const [cityFilter, setCityFilter] = useState('');

  const domesticTours = toursData.filter((t) => t.type === 'domestic');
  const outboundTours = toursData.filter((t) => t.type === 'outbound');

  const navigate = (to) => {
    setPage(to);
  };

  const handleShowDomestic = (duration) => {
    setSearchResults(null);
    const filtered = domesticTours.filter((t) => t.duration === duration);
    setFilteredDomestic(filtered);
    navigate('domestic');
  };

  const handleShowOutbound = (country) => {
    setSearchResults(null);
    const filtered = outboundTours.filter((t) => t.country === country);
    setFilteredOutbound(filtered);
    navigate('outbound');
  };

  const handleSearchResult = (results) => {
    setSearchResults(results);
    navigate('search');
  };

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    navigate('detail');
  };

  const handlePromoClick = (promo) => {
    const full = toursData.find((t) => t.id === promo.id);
    if (full) setSelectedTour(full);
    else setSelectedTour(promo);
    navigate('detail');
  };

  const handleProvinceSelect = (province) => {
    const filtered = domesticTours.filter((t) => t.province === province);
    setFilteredDomestic(filtered);
    navigate('domestic');
  };

  const renderCards = (tours, isDomestic) => (
    tours.map((t, i) => (
      <TourCard key={t.id || i} tour={t} onClick={() => handleTourClick(t)} isDomestic={isDomestic} />
      
    ))
  );

  return (
    <div>
      <Header
        locale="th"
        onNavigate={navigate}
        onShowDomestic={handleShowDomestic}
        onShowOutbound={handleShowOutbound}
      />

      {page === 'home' && (
        <>
          <Hero locale="th" />
          <Slider />
          <SearchBox locale="th" tours={toursData} onResult={handleSearchResult} />
          <ProvinceSelector tours={domesticTours} onSelect={handleProvinceSelect} locale="th" />
          <TourGrid showBadge="popular" onTourClick={handlePromoClick} />
          <TourGrid showBadge="monthly" onTourClick={handlePromoClick} />
          <About locale="th" />
          <Contact locale="th" />
          <Reviews locale="th" />
        </>
      )}

      {page === 'domestic' && (
        <section className="page tour-list-page active">
          <h2>ทัวร์ในประเทศ</h2>
          <div className="tour-grid">
            {renderCards(filteredDomestic || domesticTours, true)}
          </div>
        </section>
      )}

      {page === 'outbound' && (
        <section className="page tour-list-page active">
          <h2>ทัวร์ต่างประเทศ</h2>
          <div style={{ maxWidth: 400, margin: '0 auto 30px' }}>
            <label htmlFor="city-filter" className="sr-only">ค้นหาเมือง</label>
            <input id="city-filter" type="text" placeholder="ค้นหาเมือง..." value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
              style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', outline: 'none', fontSize: 15 }} />
          </div>
          <div className="tour-grid">
            {renderCards((filteredOutbound || outboundTours).filter((t) =>
              !cityFilter || (t.desc || '').includes(cityFilter) || (t.id || '').toLowerCase().includes(cityFilter.toLowerCase())
            ))}
          </div>
        </section>
      )}

      {page === 'search' && (
        <section className="page search-results-page active">
          <h2>ผลการค้นหา ({searchResults?.length || 0} รายการ)</h2>
          {searchResults?.length === 0 && (
            <div className="no-result">
              <Image src={assetPath('assets/images/iconNo.png')} width={30} height={30} alt="" /> ไม่พบโปรแกรมทัวร์
            </div>
          )}
          <div className="tour-grid">
            {renderCards(searchResults || [])}
          </div>
        </section>
      )}

      {page === 'about' && <About locale="th" />}
      {page === 'contact' && <Contact locale="th" />}
      {page === 'reviews' && <Reviews locale="th" />}

      {page === 'detail' && (
        <TourDetail tour={selectedTour} />
      )}

      <Footer locale="th" />
    </div>
  );
}