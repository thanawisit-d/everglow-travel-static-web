'use client';
import { useState, useEffect, useRef } from 'react';
import TourCard from './TourCard';
import config from '@/data/site-config.json';

const SWIPE_THRESHOLD = 50;

export default function TourGrid({ showBadge, locale, tours }) {
  const t = config[locale] || config.th;
  const isEn = locale === 'en';
  const data = tours || [];
  const title = showBadge === 'monthly' ? t.monthlyTitle : t.popularTitle;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const isSlider = data.length > 4;

  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const lastDeltaX = useRef(0);
  const isDragging = useRef(false);
  const suppressClick = useRef(false);

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
              href={`/${locale}/tours/${tourItem.id}`}
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

  const baseTransform = `translateX(-${currentIdx * itemWidth}%)`;

  const onTouchStart = (e) => {
    suppressClick.current = false;
    isDragging.current = true;
    touchStartX.current = e.touches[0].clientX;
    lastDeltaX.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    lastDeltaX.current = deltaX;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) suppressClick.current = true;
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.transform = `translateX(calc(${-currentIdx * itemWidth}% + ${deltaX}px))`;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = trackRef.current;
    if (el) {
      el.style.transition = '';
      el.style.transform = `translateX(-${currentIdx * itemWidth}%)`;
    }
    const deltaX = lastDeltaX.current;
    lastDeltaX.current = 0;
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0 && currentIdx < maxIdx) setCurrentIdx((p) => Math.min(maxIdx, p + 1));
      else if (deltaX > 0 && currentIdx > 0) setCurrentIdx((p) => Math.max(0, p - 1));
    }
  };

  return (
    <section className="tour-section">
      <h2 className="tour-section-title">{title}</h2>
      <div className="tour-slider-wrapper">
        <div
          className="tour-slider-track"
          ref={trackRef}
          style={{
            width: `${totalWidth}%`,
            transform: baseTransform
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {data.map((tourItem, i) => (
            <div key={tourItem.id || i} className="tour-slider-item" style={{ width: `${itemWidth}%` }}>
              <TourCard
                locale={locale}
                tour={tourItem}
                href={`/${locale}/tours/${tourItem.id}`}
                badge={showBadge}
              />
            </div>
          ))}
        </div>
        {currentIdx > 0 && (
          <button
            className="tour-slider-btn prev"
            onClick={(e) => { e.stopPropagation(); setCurrentIdx(p => p - 1); }}
            aria-label={isEn ? 'Previous' : 'ก่อนหน้า'}
          >
            &#10094;
          </button>
        )}
        {currentIdx < maxIdx && (
          <button
            className="tour-slider-btn next"
            onClick={(e) => { e.stopPropagation(); setCurrentIdx(p => p + 1); }}
            aria-label={isEn ? 'Next' : 'ถัดไป'}
          >
            &#10095;
          </button>
        )}
      </div>
    </section>
  );
}
