'use client';

import { useState } from 'react';
import toursData from '@/data/tours.json';
import { translateCountry, assetPath } from '@/lib/utils';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import SearchBox from '@/components/SearchBox';
import TourGrid from '@/components/TourGrid';
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

  const domesticTours = toursData.filter((t) => t.type === 'domestic');
  const outboundTours = toursData.filter((t) => t.type === 'outbound');

  const handleShowDomestic = (duration) => {
    const filtered = domesticTours.filter((t) => t.duration === duration);
    setFilteredDomestic(filtered);
    setPage('domestic');
  };

  const handleShowOutbound = (country) => {
    const thaiName = translateCountry(country);
    const filtered = outboundTours.filter((t) => t.country === thaiName);
    setFilteredOutbound(filtered);
    setPage('outbound');
  };

  const handleSearchResult = (results) => {
    setSearchResults(results);
    setPage('search');
  };

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setPage('detail');
  };

  const handleBack = () => {
    setSelectedTour(null);
    setPage('home');
  };

  return (
    <div>
      <Header
        locale="en"
        onNavigate={setPage}
        onShowDomestic={handleShowDomestic}
        onShowOutbound={handleShowOutbound}
      />

      {page === 'home' && (
        <>
          <Hero locale="en" />
          <Slider />
          <SearchBox locale="en" tours={toursData} onResult={handleSearchResult} />
          <TourGrid tours={toursData} />
          <About locale="en" />
          <Contact locale="en" />
          <Reviews locale="en" />
        </>
      )}

      {page === 'domestic' && (
        <section className="page tour-list-page active">
          <button className="back-btn" onClick={() => setPage('home')}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> Back
          </button>
          <h2>Thailand Tours</h2>
          <div className="tour-grid">
            {(filteredDomestic || domesticTours).map((t, i) => (
              <div key={i} className="tour-card" onClick={() => handleTourClick(t)}>
                <div className="tour-img-wrapper">
                  <img src={t.image.startsWith('/') ? t.image : `/${t.image}`} className="tour-img" alt={t.id} />
                </div>
                <div className="tour-info">
                  <p>Tour ID: {t.id}</p>
                  <p>{t.duration} | {t.periodText}</p>
                  <p className="tour-desc">{t.desc?.substring(0, 80)}...</p>
                </div>
                <div className="tour-bottom">
                  <span className="price">{t.price} THB</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'outbound' && (
        <section className="page tour-list-page active">
          <button className="back-btn" onClick={() => setPage('home')}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> Back
          </button>
          <h2>Outbound Tours</h2>
          <div className="tour-grid">
            {(filteredOutbound || outboundTours).map((t, i) => (
              <div key={i} className="tour-card" onClick={() => handleTourClick(t)}>
                <div className="tour-img-wrapper">
                  <img src={t.image.startsWith('/') ? t.image : `/${t.image}`} className="tour-img" alt={t.id} />
                </div>
                <div className="tour-info">
                  <p>Tour ID: {t.id}</p>
                  <p>{t.duration} | {t.periodText}</p>
                  <p className="tour-desc">{t.desc?.substring(0, 80)}...</p>
                </div>
                <div className="tour-bottom">
                  <span className="price">{t.price} THB</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'search' && (
        <section className="page search-results-page active">
          <button className="back-btn" onClick={() => setPage('home')}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> Back
          </button>
          <h2>Search Results ({searchResults?.length || 0})</h2>
          <div className="tour-grid">
            {(searchResults || []).map((t, i) => (
              <div key={i} className="tour-card" onClick={() => handleTourClick(t)}>
                <div className="tour-img-wrapper">
                  <img src={t.image.startsWith('/') ? t.image : `/${t.image}`} className="tour-img" alt={t.id} />
                </div>
                <div className="tour-info">
                  <p>Tour ID: {t.id}</p>
                  <p>{t.duration} | {t.periodText}</p>
                </div>
                <div className="tour-bottom">
                  <span className="price">{t.price} THB</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'about' && <About locale="en" />}
      {page === 'contact' && <Contact locale="en" />}
      {page === 'reviews' && <Reviews />}

      {page === 'detail' && (
        <TourDetail tour={selectedTour} onBack={handleBack} />
      )}

      <Footer locale="en" />
    </div>
  );
}
