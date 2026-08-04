'use client';

import Image from 'next/image';
import { Clock, CalendarDays } from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function TourCard({ tour, onClick, showBadge, isDomestic, locale }) {
  if (!tour) return null;
  const isEn = locale === 'en';
  const t = config[locale] || config.th;
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

      <span className="tour-code">{tour.id}</span>

      <p className="tour-desc">{displayDesc}</p>

      <div className="tour-info">
        <span className="tour-info-item">
          <Clock size={14} strokeWidth={2} />
          {displayDuration}
        </span>
        <span className="tour-info-item">
          <CalendarDays size={14} strokeWidth={2} />
          {displayPeriod}
        </span>
      </div>

      <div className="tour-bottom">
        <Image src={assetPath(tour.transport?.icon || (tour.airline ? `plane-logo/${tour.airline}` : 'assets/images/logos/Logo.jpg'))} width={70} height={40} className="airline" alt={tour.airline || t.transportAlt} />
        <div className="price">
          <span className="price-start">{isMultiNight ? t.priceStartMulti : t.priceStartSingle}</span>
          <span className="price-main">{formatPrice(tour.price)}.-</span>
          <span className="price-sub">{t.priceBaht}</span>
        </div>
      </div>
    </div>
  );
}
