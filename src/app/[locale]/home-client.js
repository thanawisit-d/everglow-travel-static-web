'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import toursDataTh from '@/data/tours-th.json';
import toursDataEn from '@/data/tours-en.json';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';
import { getPopularTours } from '@/lib/tours-data';
import { selectMonthlyTours } from '@/lib/monthly-selector';
import { formatMonthLabel } from '@/lib/dateFilter';
import Hero from '@/components/Hero';
import HeroSection from '@/components/HeroSection';
import TourGrid from '@/components/TourGrid';
import Partners from '@/components/Partners';
import ReviewSection from '@/components/ReviewSection';

const TRAVEL_GALLERY_FALLBACKS = ['Home.jpg', 'Home1.jpg', 'Home3.jpg', 'Home4.jpg', 'Home5.jpg', 'Home6.jpg', 'Home7.jpg', 'Home8.jpg'];
const TRAVEL_GALLERY_EXTENSIONS = ['jpeg', 'jpg', 'png'];

function TravelGalleryImage({ number, fallback, alt }) {
  const [failure, setFailure] = useState(0);
  if (failure > TRAVEL_GALLERY_EXTENSIONS.length) return null;

  const src = failure < TRAVEL_GALLERY_EXTENSIONS.length
    ? `travel_gallery/travel_gallery_${String(number).padStart(2, '0')}.${TRAVEL_GALLERY_EXTENSIONS[failure]}`
    : `assets/images/backgrounds/${fallback}`;

  return (
    <Image
      key={failure}
      src={assetPath(src)}
      alt={alt}
      fill
      sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 25vw"
      loading="lazy"
      onError={() => setFailure((previous) => Math.max(previous, failure + 1))}
    />
  );
}

export default function LocaleClient({ locale, monthlySnapshot }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const galleryDialogRef = useRef(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedPhoto]);

  function openGalleryPhoto(event) {
    const image = event.currentTarget.querySelector('img');
    if (!image || !image.naturalWidth) return;
    setSelectedPhoto({ src: image.getAttribute('src'), alt: image.alt });
    if (!galleryDialogRef.current.open) galleryDialogRef.current.showModal();
  }

  const isEn = locale === 'en';
  const t = config[locale] || config.th;
  const toursData = isEn ? toursDataEn : toursDataTh;

  // Use the build-time snapshot for SSR (hydration-safe), then refresh against
  // the real clock after mount so the section tracks the current month.
  const [monthly, setMonthly] = useState(monthlySnapshot);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonthly(selectMonthlyTours({ locale }));
  }, [locale]);

  const popularFromData = getPopularTours(locale);
  const popularTours = popularFromData.length ? popularFromData : toursData.slice(0, 6);
  const monthlyTours = monthly.tours;
  const monthlyTitle = monthly.sourceMonth
    ? `${t.monthlyTitle} ${formatMonthLabel(monthly.sourceMonth, isEn ? 'en' : 'th')}`
    : t.monthlyTitle;

  const destinations = useMemo(() => {
    const domesticSet = new Set();
    const outboundSet = new Set();

    toursData.forEach((tour) => {
      if (tour.type === 'outbound') {
        const c = tour.country;
        if (Array.isArray(c)) c.forEach((v) => outboundSet.add(v));
        else if (c) outboundSet.add(c);
      } else {
        const p = tour.province;
        if (Array.isArray(p)) p.forEach((v) => domesticSet.add(v));
        else if (p) domesticSet.add(p);
      }
    });

    const collator = (a, b) => a.localeCompare(b, isEn ? 'en' : 'th');

    return {
      domestic: [...domesticSet].sort(collator),
      outbound: [...outboundSet].sort(collator),
    };
  }, [isEn, toursData]);

  const whyItems = [
    { icon: 'service', title: t.why1Title, desc: t.why1Desc },
    { icon: 'experience', title: t.why2Title, desc: t.why2Desc },
    { icon: 'trust', title: t.why3Title, desc: t.why3Desc },
  ];

  return (
    <div>
      <HeroSection locale={locale} destinations={destinations} />
      <div className="tour-grid-wrapper">
        <TourGrid locale={locale} showBadge="popular" tours={popularTours} />
        <TourGrid locale={locale} showBadge="monthly" tours={monthlyTours} title={monthlyTitle} />
      </div>
      <div className="services-section bg-section">
        <Hero locale={locale} />
      </div>
      <section className="why-choose-us bg-section">
        <h2>{t.whyTitle}</h2>
        <div className="why-grid">
          {whyItems.map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">
                <img
                  src={assetPath(`assets/images/icons/${item.icon}.svg`)}
                  alt={item.title}
                />
              </div>
              <h3>{item.title}</h3>
              <p className="whitespace-pre-line">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* <Partners locale={locale} /> */}

      <section className="gallery-section bg-section">
        <h2>{t.galleryTitle}</h2>
        <p className="subtitle">{t.gallerySubtitle}</p>
        <div className="gallery-grid">
          {TRAVEL_GALLERY_FALLBACKS.map((img, i) => (
            <button
              type="button"
              className="gallery-item"
              key={i}
              aria-haspopup="dialog"
              aria-label={isEn ? `View photo ${i + 1}` : `ดูรูปที่ ${i + 1}`}
              onClick={openGalleryPhoto}
            >
              <TravelGalleryImage number={i + 1} fallback={img} alt={isEn ? `Travel ${i + 1}` : `รูปเที่ยว ${i + 1}`} />
              <div className="overlay"><span>{t.viewPhoto}</span></div>
            </button>
          ))}
        </div>
      </section>

      <dialog
        ref={galleryDialogRef}
        className="travel-gallery-lightbox"
        aria-label={selectedPhoto?.alt || t.galleryTitle}
        onClose={() => setSelectedPhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="travel-gallery-lightbox__image">
          {selectedPhoto && (
            <Image src={selectedPhoto.src} alt={selectedPhoto.alt} fill sizes="100vw" className="travel-gallery-lightbox__photo" />
          )}
          <button
            type="button"
            className="travel-gallery-lightbox__close"
            aria-label={isEn ? 'Close photo' : 'ปิดรูปภาพ'}
            onClick={() => galleryDialogRef.current.close()}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
      </dialog>

      <ReviewSection locale={locale} />
    </div>
  );
}
