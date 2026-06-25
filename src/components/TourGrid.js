import promotions from '@/data/promotions.json';
import TourCard from './TourCard';
import config from '@/data/site-config.json';

export default function TourGrid({ showBadge, onTourClick, locale }) {
  const t = config[locale];
  const data = promotions[showBadge] || [];
  const title = showBadge === 'monthly' ? t.monthlyTitle : t.popularTitle;

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