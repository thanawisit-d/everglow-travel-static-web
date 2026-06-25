import Image from 'next/image';
import { formatPrice, assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function TourCard({ tour, onClick, showBadge, isDomestic, locale }) {
  const isEn = locale === 'en';
  const t = config[locale];
  const displayDesc = isEn && tour.desc_en ? tour.desc_en : tour.desc;
  const displayDuration = isEn && tour.duration_en ? tour.duration_en : tour.duration;
  const displayPeriod = isEn && tour.periodText_en ? tour.periodText_en : tour.periodText;
  const multiNight = isEn
    ? ['2 days 1 night', '3 days 2 night', '4 days 3 night']
    : ['2 วัน 1 คืน', '3 วัน 2 คืน', '4 วัน 3 คืน'];
  const isMultiNight = multiNight.includes(displayDuration);

  return (
    <div className={isDomestic ? 'tour-card domestic-tour-card' : 'tour-card'} onClick={onClick}>
      <div className="tour-img-wrapper">
        {showBadge === 'popular' && (
          <span className="badge hot">{t.badgePopular}</span>
        )}
        {showBadge === 'monthly' && (
          <span className="badge monthly">{t.badgeMonthly}</span>
        )}
        <Image src={assetPath(tour.image)} fill sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw" alt={displayDesc || tour.id} className="tour-img" />
      </div>
      <p className="tour-desc">{displayDesc}</p>
      <div className="tour-info">
        <p><Image src={assetPath('assets/images/pin.png')} width={16} height={16} alt="" /> {t.tourId} {tour.id}</p>
        <p><Image src={assetPath('assets/images/stopwatch.png')} width={16} height={16} alt="" /> {displayDuration}</p>
        <p><Image src={assetPath('assets/images/clock_13819249.png')} width={16} height={16} alt="" /> {t.travel} {displayPeriod}</p>
      </div>
      <div className="tour-bottom">
        <Image src={assetPath(tour.transport?.icon || (tour.airline ? `plane-logo/${tour.airline}` : 'assets/images/Logo.jpg'))} width={70} height={40} className="airline" alt={tour.airline || t.transportAlt} />
        <div className="price">
          <span className="price-start">{isMultiNight ? t.priceStartMulti : t.priceStartSingle}</span>
          <span className="price-main">{formatPrice(tour.price)}.-</span>
          <span className="price-sub">{t.priceBaht}</span>
        </div>
      </div>
    </div>
  );
}
