'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function LocaleClient() {
  const params = useParams();
  const locale = (params && params.locale) || 'th';
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
    const filtered = outboundTours.filter((t) => t.country === match);
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
      />

      {page === 'home' && (
        <>
          <Hero locale={locale} />
          <section className="slider-section">
            <Slider />
          </section>
          <section className="search-box">
            <SearchBox locale={locale} tours={toursData} onResult={handleSearchResult} />
          </section>
          <section className="tour-section">
            <TourGrid locale={locale} showBadge="popular" onTourClick={handlePromoClick} />
            <TourGrid locale={locale} showBadge="monthly" onTourClick={handlePromoClick} />
          </section>
          <section className="why-choose-us">
            <h2>{isEn ? 'Why Choose Everglow Travel' : 'ทำไมต้องเลือก Everglow Travel'}</h2>
            <p className="subtitle">{isEn ? 'We deliver premium travel experiences with professional service' : 'เรามอบประสบการณ์การเดินทางระดับพรีเมียมด้วยบริการมืออาชีพ'}</p>
            <div className="why-grid">
              {(
                isEn
                  ? [
                      { icon: '★', title: 'Expert Guides', desc: 'Professional multilingual guides with deep local knowledge' },
                      { icon: '✓', title: 'Best Price Guarantee', desc: 'Competitive pricing with no hidden fees' },
                      { icon: '☎', title: '24/7 Support', desc: 'Round-the-clock customer service during your trip' },
                      { icon: '✈', title: 'Tailored Packages', desc: 'Customizable itineraries to match your needs' },
                    ]
                  : [
                      { icon: '★', title: 'ไกด์มืออาชีพ', desc: 'ไกด์มากประสบการณ์พร้อมบริการหลายภาษา' },
                      { icon: '✓', title: 'ราคาดีที่สุด', desc: 'ราคาคุ้มค่า ไม่มีค่าใช้จ่ายแอบแฝง' },
                      { icon: '☎', title: 'ดูแล 24/7', desc: 'บริการลูกค้าตลอด 24 ชั่วโมงระหว่างเดินทาง' },
                      { icon: '✈', title: 'แพ็กเกจปรับแต่งได้', desc: 'โปรแกรมทัวร์ปรับตามความต้องการของคุณ' },
                    ]
              ).map((item, i) => (
                <div className="why-card" key={i}>
                  <div className="why-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="gallery-section">
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
          <div style={{ maxWidth: 400, margin: '0 auto 30px' }}>
            <label htmlFor="city-filter" className="sr-only">{isEn ? 'Search city' : 'ค้นหาเมือง'}</label>
            <input id="city-filter" type="text" placeholder={isEn ? 'Search city...' : 'ค้นหาเมือง...'} value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
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