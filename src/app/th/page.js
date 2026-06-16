'use client';

import { useState } from 'react';
import toursData from '@/data/tours.json';
import { assetPath } from '@/lib/utils';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import SearchBox from '@/components/SearchBox';
import TourGrid from '@/components/TourGrid';
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

  const domesticTours = toursData.filter((t) => t.type === 'domestic');
  const outboundTours = toursData.filter((t) => t.type === 'outbound');

  const handleShowDomestic = (duration) => {
    const filtered = domesticTours.filter((t) => t.duration === duration);
    setFilteredDomestic(filtered);
    setPage('domestic');
  };

  const handleShowOutbound = (country) => {
    const filtered = outboundTours.filter((t) => t.country === country);
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

  const handleProvinceSelect = (province) => {
    const filtered = domesticTours.filter((t) => t.province === province);
    setFilteredDomestic(filtered);
    setPage('domestic');
  };

  return (
    <div>
      <Header
        locale="th"
        onNavigate={setPage}
        onShowDomestic={handleShowDomestic}
        onShowOutbound={handleShowOutbound}
      />

      {page === 'home' && (
        <>
          <Hero locale="th" />
          <Slider />
          <SearchBox locale="th" tours={toursData} onResult={handleSearchResult} />
          <ProvinceSelector tours={domesticTours} onSelect={handleProvinceSelect} locale="th" />
          <TourGrid tours={toursData} />
          <TourGrid showBadge="monthly" tours={toursData} />
          <About locale="th" />
          <Contact locale="th" />
          <Reviews locale="th" />
        </>
      )}

      {page === 'domestic' && (
        <section className="page tour-list-page active">
          <button className="back-btn" onClick={() => setPage('home')}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> กลับ
          </button>
          <h2>ทัวร์ในประเทศ</h2>
          <div className="tour-grid">
            {(filteredDomestic || domesticTours).map((t, i) => (
              <div key={i} className="tour-card" onClick={() => handleTourClick(t)}>
                <div className="tour-img-wrapper">
                  <img src={t.image.startsWith('/') ? t.image : `/${t.image}`} className="tour-img" alt={t.id} />
                </div>
                <div className="tour-info">
                  <p>รหัสทัวร์: {t.id}</p>
                  <p>{t.duration} | {t.periodText}</p>
                  <p className="tour-desc">{t.desc?.substring(0, 80)}...</p>
                </div>
                <div className="tour-bottom">
                  <span className="price">{t.price} บาท</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'outbound' && (
        <section className="page tour-list-page active">
          <button className="back-btn" onClick={() => setPage('home')}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> กลับ
          </button>
          <h2>ทัวร์ต่างประเทศ</h2>
          <div className="tour-grid">
            {(filteredOutbound || outboundTours).map((t, i) => (
              <div key={i} className="tour-card" onClick={() => handleTourClick(t)}>
                <div className="tour-img-wrapper">
                  <img src={t.image.startsWith('/') ? t.image : `/${t.image}`} className="tour-img" alt={t.id} />
                </div>
                <div className="tour-info">
                  <p>รหัสทัวร์: {t.id}</p>
                  <p>{t.duration} | {t.periodText}</p>
                  <p className="tour-desc">{t.desc?.substring(0, 80)}...</p>
                </div>
                <div className="tour-bottom">
                  <span className="price">{t.price} บาท</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'search' && (
        <section className="page search-results-page active">
          <button className="back-btn" onClick={() => setPage('home')}>
            <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" /> กลับ
          </button>
          <h2>ผลการค้นหา ({searchResults?.length || 0} รายการ)</h2>
          <div className="tour-grid">
            {(searchResults || []).map((t, i) => (
              <div key={i} className="tour-card" onClick={() => handleTourClick(t)}>
                <div className="tour-img-wrapper">
                  <img src={t.image.startsWith('/') ? t.image : `/${t.image}`} className="tour-img" alt={t.id} />
                </div>
                <div className="tour-info">
                  <p>รหัสทัวร์: {t.id}</p>
                  <p>{t.duration} | {t.periodText}</p>
                </div>
                <div className="tour-bottom">
                  <span className="price">{t.price} บาท</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'about' && <About locale="th" />}
      {page === 'contact' && <Contact locale="th" />}
      {page === 'reviews' && <Reviews />}

      {page === 'detail' && (
        <TourDetail tour={selectedTour} onBack={handleBack} />
      )}

      <Footer locale="th" />
    </div>
  );
}
