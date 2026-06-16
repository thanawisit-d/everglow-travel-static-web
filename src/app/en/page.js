'use client';

import { useState, useRef } from 'react';
import toursData from '@/data/tours.json';
import { translateCountry, assetPath, formatPrice } from '@/lib/utils';
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

export default function EnglishPage() {
  const [page, setPage] = useState('home');
  const [selectedTour, setSelectedTour] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [filteredDomestic, setFilteredDomestic] = useState(null);
  const [filteredOutbound, setFilteredOutbound] = useState(null);
  const [cityFilter, setCityFilter] = useState('');
  const prevPageRef = useRef('home');

  const domesticTours = toursData.filter((t) => t.type === 'domestic');
  const outboundTours = toursData.filter((t) => t.type === 'outbound');

  const navigate = (to) => {
    prevPageRef.current = page;
    setPage(to);
  };

  const goBack = () => {
    const prev = prevPageRef.current;
    prevPageRef.current = page;
    setPage(prev);
  };

  const handleShowDomestic = (duration) => {
    const filtered = domesticTours.filter((t) => t.duration === duration);
    setFilteredDomestic(filtered);
    navigate('domestic');
  };

  const handleShowOutbound = (country) => {
    const thaiName = translateCountry(country);
    const filtered = outboundTours.filter((t) => t.country === thaiName);
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

  const handleBack = () => {
    setSelectedTour(null);
    goBack();
  };

  const handleProvinceSelect = (province) => {
    const filtered = domesticTours.filter((t) => t.province === province);
    setFilteredDomestic(filtered);
    navigate('domestic');
  };

  const renderCards = (tours, isDomestic) => (
    tours.map((t, i) => (
      <TourCard key={i} tour={t} onClick={() => handleTourClick(t)} isDomestic={isDomestic} />
    ))
  );

  return (
    <div>
      <Header
        locale="en"
        onNavigate={navigate}
        onShowDomestic={handleShowDomestic}
        onShowOutbound={handleShowOutbound}
      />

      {page === 'home' && (
        <>
          <Hero locale="en" />
          <Slider />
          <SearchBox locale="en" tours={toursData} onResult={handleSearchResult} />
          <ProvinceSelector tours={domesticTours} onSelect={handleProvinceSelect} locale="en" />
          <TourGrid showBadge="popular" tours={toursData} />
          <TourGrid showBadge="monthly" tours={toursData} />
          <About locale="en" />
          <Contact locale="en" />
          <Reviews locale="en" />
        </>
      )}

      {page === 'domestic' && (
        <section className="page tour-list-page active">
          <button className="back-btn" onClick={() => { setFilteredDomestic(null); goBack(); }}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> Back
          </button>
          <h2>Thailand Tours</h2>
          {searchResults?.length === 0 && (
            <div className="no-result">
              <img src={assetPath('assets/images/iconNo.png')} alt="" /> No tours found
            </div>
          )}
          <div className="tour-grid">
            {renderCards(filteredDomestic || domesticTours, true)}
          </div>
        </section>
      )}

      {page === 'outbound' && (
        <section className="page tour-list-page active">
          <button className="back-btn" onClick={() => { setFilteredOutbound(null); goBack(); }}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> Back
          </button>
          <h2>Outbound Tours</h2>
          <div style={{ maxWidth: 400, margin: '0 auto 30px' }}>
            <input type="text" placeholder="Search city..." value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
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
          <button className="back-btn" onClick={() => goBack()}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> Back
          </button>
          <h2>Search Results ({searchResults?.length || 0})</h2>
          {searchResults?.length === 0 && (
            <div className="no-result">
              <img src={assetPath('assets/images/iconNo.png')} alt="" /> No tours found
            </div>
          )}
          <div className="tour-grid">
            {renderCards(searchResults || [])}
          </div>
        </section>
      )}

      {page === 'about' && <About locale="en" />}
      {page === 'contact' && <Contact locale="en" />}
      {page === 'reviews' && <Reviews locale="en" />}

      {page === 'detail' && (
        <TourDetail tour={selectedTour} onBack={handleBack} />
      )}

      <Footer locale="en" />
    </div>
  );
}
