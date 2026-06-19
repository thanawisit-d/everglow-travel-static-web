'use client';

import { useState } from 'react';
import Image from 'next/image';
import toursData from '@/data/tours.json';
import { translateCountry, assetPath } from '@/lib/utils';
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

export default function EnglishPage() {
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

  const handlePromoClick = (promo) => {
    const full = toursData.find((t) => t.id === promo.id);
    if (full) setSelectedTour(full);
    else setSelectedTour(promo);
    navigate('detail');
  };

  const renderCards = (tours, isDomestic) => (
    tours.map((t, i) => (
      <TourCard key={t.id || i} tour={t} onClick={() => handleTourClick(t)} isDomestic={isDomestic} />
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
          <section className="slider-section">
            <Slider />
          </section>
          <section className="search-box">
            <SearchBox locale="en" tours={toursData} onResult={handleSearchResult} />
          </section>
          <section className="tour-section">
            <TourGrid showBadge="popular" onTourClick={handlePromoClick} />
            <TourGrid showBadge="monthly" onTourClick={handlePromoClick} />
          </section>
          <section className="why-choose-us">
            <h2>Why Choose Everglow Travel</h2>
            <p className="subtitle">We deliver premium travel experiences with professional service</p>
            <div className="why-grid">
              {[
                { icon: '★', title: 'Expert Guides', desc: 'Professional multilingual guides with deep local knowledge' },
                { icon: '✓', title: 'Best Price Guarantee', desc: 'Competitive pricing with no hidden fees' },
                { icon: '☎', title: '24/7 Support', desc: 'Round-the-clock customer service during your trip' },
                { icon: '✈', title: 'Tailored Packages', desc: 'Customizable itineraries to match your needs' },
              ].map((item, i) => (
                <div className="why-card" key={i}>
                  <div className="why-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section className="gallery-section">
            <h2>Travel Gallery</h2>
            <p className="subtitle">Moments captured from our journeys</p>
            <div className="gallery-grid">
              {['Home.jpg', 'Home1.jpg', 'Home3.jpg', 'Home4.jpg', 'Home5.jpg', 'Home6.jpg', 'Home7.jpg', 'Home8.jpg'].map((img, i) => (
                <div className="gallery-item" key={i}>
                  <Image src={assetPath(`assets/images/${img}`)} alt={`Travel ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                  <div className="overlay"><span>View Photo</span></div>
                </div>
              ))}
            </div>
          </section>

          <About locale="en" />
          <Contact locale="en" />
          <Reviews locale="en" />
        </>
      )}

      {page === 'domestic' && (
        <section className="page tour-list-page active">
          <h2>Thailand Tours</h2>
          <div className="tour-grid">
            {renderCards(filteredDomestic || domesticTours, true)}
          </div>
        </section>
      )}

      {page === 'outbound' && (
        <section className="page tour-list-page active">
          <h2>Outbound Tours</h2>
          <div style={{ maxWidth: 400, margin: '0 auto 30px' }}>
            <label htmlFor="city-filter" className="sr-only">Search city</label>
            <input id="city-filter" type="text" placeholder="Search city..." value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
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
          <h2>Search Results ({searchResults?.length || 0})</h2>
          {searchResults?.length === 0 && (
            <div className="no-result">
              <Image src={assetPath('assets/images/iconNo.png')} width={30} height={30} alt="" /> No tours found
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
        <TourDetail tour={selectedTour} />
      )}

      <Footer locale="en" />
    </div>
  );
}