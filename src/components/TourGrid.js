'use client';

import promotions from '@/data/promotions.json';
import TourCard from './TourCard';

export default function TourGrid({ showBadge, onTourClick, locale }) {
  const isEn = locale === 'en';
  const data = promotions[showBadge] || [];
  const title = showBadge === 'monthly'
    ? (isEn ? 'Monthly Recommended Tours' : 'โปรแกรมทัวร์แนะนำประจำเดือน')
    : (isEn ? 'Popular Tours' : 'โปรแกรมทัวร์ยอดนิยม');

  return (
    <section className="tour-section">
      <h2 className="tour-title" style={{ textAlign: 'center', width: '100%', display: 'block', marginTop: 30, fontSize: 24, fontWeight: 800, color: '#003478' }}>
        {title}
      </h2>
      <div className="tour-grid">
        {data.map((t, i) => (
          <TourCard
            key={t.id || i}
            locale={locale}
            tour={t}
            onClick={onTourClick ? () => onTourClick(t) : undefined}
            showBadge={showBadge === 'monthly' ? 'monthly' : undefined}
          />
        ))}
      </div>
    </section>
  );
}