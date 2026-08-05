'use client';

import Image from 'next/image';
import { Clock, CalendarDays, Flame } from 'lucide-react';
import { formatPrice, formatPriceApprox } from '@/lib/pricing';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function TourCard({ tour, onClick, badge, locale }) {
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

  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className="tour-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'link' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={displayDesc || tour.id}
    >
      <div className="tour-img-wrapper">
        {badge === 'popular' && (
          <span className="tour-badge tour-badge--popular">
            <Flame size={12} strokeWidth={2.5} />
            {t.badgePopular}
          </span>
        )}
        {badge === 'monthly' && (
          <span className="tour-badge tour-badge--monthly">
            <CalendarDays size={12} strokeWidth={2.5} />
            {t.badgeMonthly}
          </span>
        )}
        <Image src={assetPath(tour.image)} fill sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw" alt={displayDesc || tour.id} className="tour-img" />
      </div>

      <div className="tour-card-body">
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
      </div>

      <div className="tour-bottom">
        <Image src={assetPath(tour.transport?.icon || (tour.airline ? `plane-logo/${tour.airline}` : 'assets/images/logos/Logo.jpg'))} width={70} height={40} className="airline" alt={tour.airline || t.transportAlt} />
        <div className="price">
          <span className="price-start">{isMultiNight ? t.priceStartMulti : t.priceStartSingle}</span>
          <span className="price-main">{formatPrice(tour.price)}.-</span>
          {isEn ? (
            <span className="price-approx">{formatPriceApprox(tour.price, locale)}</span>
          ) : (
            <span className="price-sub">{t.priceBaht}</span>
          )}
        </div>
      </div>
    </article>
  );
}
