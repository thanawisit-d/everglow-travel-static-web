'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, CalendarDays, Flame } from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function TourCard({ tour, href, badge, locale }) {
  if (!tour) return null;
  const isEn = locale === 'en';
  const t = config[locale] || config.th;
  const displayDesc = tour.desc;
  const displayDuration = tour.duration;
  const displayPeriod = tour.periodText;
  const getDayCount = (duration, isEn) => {
    const pattern = isEn
      ? /(\d+)\s+days?/
      : /(\d+)\s*วัน/;

    const match = duration?.match(pattern);
    return match ? Number(match[1]) : 0;
  };

  const dayCount = getDayCount(displayDuration, isEn);
  const isSingleDay = dayCount === 1;
  const cardHref = href || `/${locale}/tours/${tour.id}`;

  return (
    <Link
      href={cardHref}
      className="tour-card"
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
        <Image src={assetPath(tour.image)} fill sizes="(max-width: 600px) 100vw, (max-width: 992px) 33vw, 25vw" alt={displayDesc || tour.id} className="tour-img" loading="lazy" />
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
          <span className="price-start">{isSingleDay ? t.priceStartSingle : t.priceStartMulti}</span>
          <span className="price-main">{formatPrice(tour.price)}.-</span>
          <span className="price-sub">{t.priceBaht}</span>
        </div>
      </div>
    </Link>
  );
}
