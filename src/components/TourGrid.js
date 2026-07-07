import TourCard from './TourCard';
import config from '@/data/site-config.json';

export default function TourGrid({ showBadge, onTourClick, locale, tours }) {
  const t = config[locale] || config.th;
  const data = tours || [];
  const title = showBadge === 'monthly' ? t.monthlyTitle : t.popularTitle;

  if (data.length === 0) return null;

  return (
    <section className="tour-section">
      <h2 className="tour-section-title">
        {title}
      </h2>
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