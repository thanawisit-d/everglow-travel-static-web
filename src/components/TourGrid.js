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
      <h2 className="tour-section-title">
        {title}
      </h2>
      <div className="tour-grid">
        {data.map((t, i) => (
          <TourCard
            key={t.id || i}
            locale={locale}
            tour={t}
            onClick={onTourClick ? () => onTourClick(t) : undefined}
            showBadge={showBadge}
          />
        ))}
      </div>
    </section>
  );
}