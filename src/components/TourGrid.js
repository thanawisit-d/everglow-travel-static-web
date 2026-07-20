'use client';
import { useRef } from 'react';
import TourCard from './TourCard';
import config from '@/data/site-config.json';

export default function TourGrid({ showBadge, onTourClick, locale, tours }) {
  const t = config[locale] || config.th;
  const data = tours || [];
  const title = showBadge === 'monthly' ? t.monthlyTitle : t.popularTitle;
  const trackRef = useRef(null);

  if (data.length === 0) return null;

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const scrollAmount = container.clientWidth * (window.innerWidth <= 768 ? 0.85 : 0.333);
    container.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  if (data.length <= 3) {
    return (
      <section className="tour-section">
        <h2 className="tour-section-title">{title}</h2>
        <div className="tour-grid">
          {data.map((tourItem, i) => (
            <TourCard
              key={tourItem.id || i}
              locale={locale}
              tour={tourItem}
              onClick={onTourClick ? () => onTourClick(tourItem.id) : undefined}
              showBadge={showBadge}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="tour-section">
      <h2 className="tour-section-title">{title}</h2>
      <div className="tour-slider-wrapper">
        <div ref={trackRef} className="tour-slider-track">
          {data.map((tourItem, i) => (
            <div key={tourItem.id || i} className="tour-slider-item">
              <TourCard
                locale={locale}
                tour={tourItem}
                onClick={onTourClick ? () => onTourClick(tourItem.id) : undefined}
                showBadge={showBadge}
              />
            </div>
          ))}
        </div>
        <button className="tour-slider-btn prev" onClick={() => scroll('prev')}>&#10094;</button>
        <button className="tour-slider-btn next" onClick={() => scroll('next')}>&#10095;</button>
      </div>
    </section>
  );
}
