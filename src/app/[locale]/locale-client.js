'use client';

import { useState } from 'react';
import Image from 'next/image';
import toursData from '@/data/tours.json';
import { translateCountry, assetPath, fieldEquals, fieldIncludes } from '@/lib/utils';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import SearchBox from '@/components/SearchBox';
import TourGrid from '@/components/TourGrid';
import TourCard from '@/components/TourCard';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Reviews from '@/components/Reviews';
import TourDetail from '@/components/TourDetail';
import Footer from '@/components/Footer';

export default function LocaleClient({ locale }) {
  const isEn = locale === 'en';

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
    window.scrollTo(0, 0);
  };

  const handleShowDomestic = (duration) => {
    setSearchResults(null);
    const filtered = domesticTours.filter((t) => t.duration === duration);
    setFilteredDomestic(filtered);
    navigate('domestic');
  };

  const handleShowOutbound = (country) => {
    setSearchResults(null);
    const match = isEn ? translateCountry(country) : country;
    const filtered = outboundTours.filter((t) => fieldEquals(t.country, match));
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
    if (full) {
      setSelectedTour(full);
      navigate('detail');
    }
  };

  const renderCards = (tours, isDomestic) => (
    tours.map((t, i) => (
      
      <TourCard key={t.id || i} locale={locale} tour={t} onClick={() => handleTourClick(t)} isDomestic={isDomestic} />
    ))
  );

  return (
    <div>
      <Header
        locale={locale}
        onNavigate={navigate}
        onShowDomestic={handleShowDomestic}
        onShowOutbound={handleShowOutbound}
        onShowAllDomestic={() => { setFilteredDomestic(null); setSearchResults(null); navigate('domestic'); }}
        onShowAllOutbound={() => { setFilteredOutbound(null); setSearchResults(null); navigate('outbound'); }}
      />

      {page === 'home' && (
        <>
          <Hero locale={locale} />
          <section className="slider-section bg-alt">
            <Slider />
          </section>
          <section className="search-box">
            <SearchBox locale={locale} tours={toursData} onResult={handleSearchResult} />
          </section>
          <div className="tour-grid-wrapper bg-alt">
            <TourGrid locale={locale} showBadge="popular" onTourClick={handlePromoClick} />
            <TourGrid locale={locale} showBadge="monthly" onTourClick={handlePromoClick} />
          </div>
          <section className="why-choose-us">
            <h2>{isEn ? 'Why Choose Everglow Travel' : 'ทำไมต้องเลือก Everglow Travel'}</h2>
            <p className="subtitle">{isEn ? '-----' : '--------'}</p>
            <div className="why-grid">
              {(isEn ? [
                { icon: 'guide', title: '-', desc: '-' },
                { icon: 'price', title: '-', desc: '- p-' },
                { icon: 'support', title: '-', desc: '-' },
                { icon: 'package', title: '-', desc: '- - - - - -' },
              ] : [
                { icon: 'guide', title: '-', desc: '-' },
                { icon: 'price', title: '-', desc: '- -' },
                { icon: 'support', title: '- ---', desc: '- 24 -' },
                { icon: 'package', title: '-', desc: '-' },
              ]).map((item, i) => (
                <div className="why-card" key={i}>
                  <div className="why-icon">
                    {item.icon === 'guide' && (
                      <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                        <circle cx="32" cy="20" r="8" stroke="white" strokeWidth="2.5" fill="none" />
                        <path d="M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="2" fill="none" />
                      </svg>
                    )}
                    {item.icon === 'price' && (
                      <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                        <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="2" />
                        <path d="M22 30h20M32 22v20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {item.icon === 'support' && (
                      <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                        <path d="M18 38h-4a6 6 0 0 1-6-6v-4a6 6 0 0 1 6-6h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <path d="M46 22h4a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6h-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <path d="M18 22v16a14 14 0 0 0 28 0V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <path d="M32 34a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="white" strokeWidth="2" fill="none" />
                      </svg>
                    )}
                    {item.icon === 'package' && (
                      <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                        <path d="M20 20L44 8M44 20L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M10 44l18 10 18-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M10 44V24l18-10 18 10v20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M28 54V34" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="gallery-section bg-alt">
            <h2>{isEn ? 'Travel Gallery' : 'แกลเลอรีการเดินทาง'}</h2>
            <p className="subtitle">{isEn ? 'Moments captured from our journeys' : 'ภาพความประทับใจจากการเดินทางของเรา'}</p>
            <div className="gallery-grid">
              {['Home.jpg', 'Home1.jpg', 'Home3.jpg', 'Home4.jpg', 'Home5.jpg', 'Home6.jpg', 'Home7.jpg', 'Home8.jpg'].map((img, i) => (
                <div className="gallery-item" key={i}>
                  <Image src={assetPath(`assets/images/${img}`)} alt={isEn ? `Travel ${i + 1}` : `รูปเที่ยว ${i + 1}`} fill sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
                  <div className="overlay"><span>{isEn ? 'View Photo' : 'ดูรูป'}</span></div>
                </div>
              ))}
            </div>
          </section>

          <About locale={locale} />
          <Contact locale={locale} />
          <Reviews locale={locale} />
        </>
      )}

      {page === 'domestic' && (
        <section className="page tour-list-page active">
          <h2>{isEn ? 'Thailand Tours' : 'ทัวร์ในประเทศ'}</h2>
          <div className="tour-grid">
            {renderCards(filteredDomestic || domesticTours, true)}
          </div>
        </section>
      )}

      {page === 'outbound' && (
        <section className="page tour-list-page active">
          <h2>{isEn ? 'Outbound Tours' : 'ทัวร์ต่างประเทศ'}</h2>
          <div className="city-filter-wrap">
            <label htmlFor="city-filter" className="sr-only">{isEn ? 'Search city' : 'ค้นหาเมือง'}</label>
            <input id="city-filter" type="text" placeholder={isEn ? 'Search city...' : 'ค้นหาเมือง...'} value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
          </div>
          <div className="tour-grid">
            {renderCards((filteredOutbound || outboundTours).filter((t) =>
              !cityFilter || (t.desc || '').includes(cityFilter) || fieldIncludes(t.country, cityFilter) || (t.id || '').toLowerCase().includes(cityFilter.toLowerCase())
            ))}
          </div>
        </section>
      )}

      {page === 'search' && (
        <section className="page search-results-page active">
          <h2>{isEn ? `Search Results (${searchResults?.length || 0})` : `ผลการค้นหา (${searchResults?.length || 0} รายการ)`}</h2>
          {searchResults?.length === 0 && (
            <div className="no-result">
              <Image src={assetPath('assets/images/iconNo.png')} width={30} height={30} alt="" /> {isEn ? 'No tours found' : 'ไม่พบโปรแกรมทัวร์'}
            </div>
          )}
          <div className="tour-grid">
            {renderCards(searchResults || [])}
          </div>
        </section>
      )}

      {page === 'about' && <About locale={locale} />}
      {page === 'contact' && <Contact locale={locale} />}
      {page === 'reviews' && <div className="reviews-page"><Reviews locale={locale} /></div>}

      {page === 'detail' && (
        <TourDetail locale={locale} tour={selectedTour} />
      )}

      <Footer locale={locale} />
    </div>
  );
}