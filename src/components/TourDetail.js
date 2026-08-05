'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, formatPriceApprox } from '@/lib/pricing';
import { assetPath } from '@/lib/assets';
import { displayField, translateCountry } from '@/lib/i18n';
import { trackRecentlyViewed } from '@/lib/recentlyViewed';
import config from '@/data/site-config.json';

export default function TourDetail({ tour, locale }) {
  const isOutbound = tour?.type === 'outbound';
  const isEn = locale === 'en';
  const t = config[locale] || config.th;

  useEffect(() => {
    if (tour) trackRecentlyViewed(tour);
  }, [tour]);

  if (!tour) return null;

  const displayDesc = isEn && tour.desc_en ? tour.desc_en : tour.desc;
  const displayDuration = isEn && tour.duration_en ? tour.duration_en : tour.duration;
  const displayPeriod = isEn && tour.periodText_en ? tour.periodText_en : tour.periodText;
  const displayCountry = isEn ? displayField(tour.country).split(', ').map(c => translateCountry(c)).join(', ') : displayField(tour.country);
  const displayProvince = isEn && tour.province_en ? tour.province_en : (tour.province ? displayField(tour.province) : '-');
  const displayTransportName = isEn && tour.transport?.name_en ? tour.transport.name_en : (tour.transport?.name || '-');

  const breadcrumbLabel = isOutbound ? t.breadcrumbOutbound : t.breadcrumbDomestic;
  const listPath = isOutbound ? `/${locale}/outbound` : `/${locale}/domestic`;

  const splitKeyword = isEn ? ' tour' : ' เที่ยว';
  const descParts = displayDesc?.split(splitKeyword) || [];
  const tourName = (descParts[0] || tour.id).trim();
  const tourDetail = descParts.length > 1
    ? (splitKeyword + descParts.slice(1).join(splitKeyword)).trim()
    : '';

  return (
    <div className="tour-detail-page page active">
      <div className="page-hero-band">
        <nav className="breadcrumb">
          <Link href={`/${locale}`}>{t.home}</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href={listPath}>{breadcrumbLabel}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">{tourName}</span>
        </nav>
      </div>
      <div className="tour-detail-body">
      <div className="tour-detail-container">
        <div className="tour-detail-left">
          <Image src={assetPath(tour.image)} fill sizes="(max-width: 992px) 100vw, 420px" alt={displayDesc || tour.id} loading="lazy" />
        </div>
        <div className="tour-detail-right">
          <h1 className="tour-detail-title">{tourName}</h1>
          {tourDetail && <p className="tour-detail-desc">{tourDetail}</p>}
          <div className="detail-info-grid">
            <div className="detail-item">
              <Image src={assetPath('assets/images/icons/pin.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.tourId}</strong>
                <span>{tour.id}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/location.png')} width={24} height={24} alt="" />
              <div>
                <strong>{isOutbound ? t.detailCountry : t.detailProvince}</strong>
                <span>{isOutbound ? displayCountry : displayProvince}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/icons/clock_13819249.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.detailPeriod}</strong>
                <span>{displayPeriod}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/icons/stopwatch.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.detailDuration}</strong>
                <span>{displayDuration}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/price.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.detailPriceStart}</strong>
                <span id="detailPrice">{formatPrice(tour.price)} {t.detailBaht}</span>
                {isEn && <span className="detail-price-approx">{formatPriceApprox(tour.price, locale)}</span>}
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath(tour.transport?.icon || (tour.airline ? `plane-logo/${tour.airline}` : 'icons/plane.png'))} width={24} height={24} alt="" />
              <div>
                <strong>{isOutbound ? t.detailTransportOutbound : t.detailTransportDomestic}</strong>
                {isOutbound ? (
                  <Image src={assetPath(`plane-logo/${tour.airline}`)} width={180} height={55} className="detail-airline-logo" alt={tour.airline ? `${tour.airline} airline` : 'Airline logo'} />
                ) : (
                  <span>{displayTransportName}</span>
                )}
              </div>
            </div>
          </div>
          <div className="detail-buttons">
            <a href={`tel:${tour.phone || '+66996326146'}`} className="call-btn">
              <Image src={assetPath('assets/images/icons/phone2 (1).png')} width={24} height={24} alt="" />
              {t.detailCall}
            </a>
            <a href="https://lin.ee/xXcNI1w" target="_blank" rel="noopener noreferrer" className="line-btn">
              <Image src={assetPath('assets/images/social/LINE.png')} width={24} height={24} alt="" />
              {t.detailLine}
            </a>
            {tour.pdf && (
              <a href={assetPath(tour.pdf)} target="_blank" rel="noopener noreferrer" className="pdf-btn">
                <Image src={assetPath('assets/images/icons/pdf.png')} width={24} height={24} alt="" />
                {t.detailPdf}
              </a>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}