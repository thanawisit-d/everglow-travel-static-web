'use client';
import { useState, useEffect } from 'react';
import TourCard from './TourCard';
import config from '@/data/site-config.json';

export default function TourGrid({ showBadge, onTourClick, locale, tours }) {
  const t = config[locale] || config.th;
  const data = tours || [];
  const title = showBadge === 'monthly' ? t.monthlyTitle : t.popularTitle;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const isSlider = data.length > 4;

  useEffect(() => {
    if (!isSlider) return;
    const check = () => setCardsPerView(window.innerWidth <= 768 ? 1 : 4);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [isSlider]);

  const maxIdx = data.length - cardsPerView;
  if (currentIdx > maxIdx && maxIdx >= 0) {
    setCurrentIdx(maxIdx);
  }

  if (data.length === 0) return null;

  if (!isSlider) {
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
              badge={showBadge}
            />
          ))}
        </div>
      </section>
    );
  }

  const total = data.length;
  const totalWidth = (total / cardsPerView) * 100;
  const itemWidth = 100 / total;

  return (
    <section className="tour-section">
      <h2 className="tour-section-title">{title}</h2>
      <div className="tour-slider-wrapper">
        <div
          className="tour-slider-track"
          style={{
            width: `${totalWidth}%`,
            transform: `translateX(-${currentIdx * itemWidth}%)`
          }}
        >
          {data.map((tourItem, i) => (
            <div key={tourItem.id || i} className="tour-slider-item" style={{ width: `${itemWidth}%` }}>
              <TourCard
                locale={locale}
                tour={tourItem}
                onClick={onTourClick ? () => onTourClick(tourItem.id) : undefined}
                badge={showBadge}
              />
            </div>
          ))}
        </div>
        {currentIdx > 0 && (
          <button
            className="tour-slider-btn prev"
            onClick={(e) => { e.stopPropagation(); setCurrentIdx(p => p - 1); }}
          >
            &#10094;
          </button>
        )}
        {currentIdx < maxIdx && (
          <button
            className="tour-slider-btn next"
            onClick={(e) => { e.stopPropagation(); setCurrentIdx(p => p + 1); }}
          >
            &#10095;
          </button>
        )}
      </div>
    </section>
  );
}
