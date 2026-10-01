'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

const REVIEW_GALLERY_FOLDERS = {
  'khao-yai': '1D/เขาใหญ่',
  'wang-nam-khieo': '1D/วังน้ำเขียว',
  'kaen-makud': '1D/แก่นมะกูด',
  tak: '2D1N/ตาก',
  'uthai-thani': '2D1N/อุทัยธานี',
  'phu-lom-lo': '2D1N/ภูลมโล',
  'kamphaeng-phet': '2D1N/กำแพงเพชร',
};

const REVIEW_IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png'];

function ReviewGallery({ review, displayTag, isEn }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const folder = REVIEW_GALLERY_FOLDERS[review.id] || review.id;
  // Add photos 01–05 as .jpeg, .jpg, or .png in public/reviews_gallery/<1D or 2D1N>/<Thai place name>/.
  const images = Array.from({ length: 5 }, (_, index) =>
    encodeURI(assetPath(`reviews_gallery/${folder}/${String(index + 1).padStart(2, '0')}`))
  );

  function renderImage(index, sizes) {
    const failure = failedImages[index] || 0;
    if (failure > REVIEW_IMAGE_EXTENSIONS.length || (failure === REVIEW_IMAGE_EXTENSIONS.length && !review.image)) {
      return <span className="review-detail-image-placeholder">{isEn ? 'Photo unavailable' : 'ยังไม่มีรูปภาพ'}</span>;
    }

    return (
      <Image
        key={`${index}-${failure}`}
        src={failure < REVIEW_IMAGE_EXTENSIONS.length ? `${images[index]}.${REVIEW_IMAGE_EXTENSIONS[failure]}` : encodeURI(assetPath(review.image))}
        fill
        sizes={sizes}
        alt={`${displayTag} — ${isEn ? 'photo' : 'รูปที่'} ${index + 1}`}
        loading="eager"
        onError={() => setFailedImages((previous) => ({
          ...previous,
          [index]: Math.max(previous[index] || 0, failure + 1),
        }))}
      />
    );
  }

  return (
    <section className="review-detail-gallery" aria-label={isEn ? 'Trip photos' : 'ภาพบรรยากาศจากทริป'}>
      <div className="review-detail-thumbnails">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className="review-detail-thumbnail"
            aria-label={isEn ? `View photo ${index + 1} of 5` : `ดูรูปที่ ${index + 1} จาก 5 รูป`}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            {renderImage(index, '(max-width: 768px) 20vw, 100px')}
          </button>
        ))}
      </div>
      <div className="review-detail-image">
        {renderImage(activeIndex, '(max-width: 768px) 55vw, (max-width: 1024px) 80vw, 50vw')}
        <button
          type="button"
          className="review-detail-gallery-arrow review-detail-gallery-prev"
          aria-label={isEn ? 'Previous photo' : 'รูปก่อนหน้า'}
          onClick={() => setActiveIndex((index) => (index + 4) % 5)}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="review-detail-gallery-arrow review-detail-gallery-next"
          aria-label={isEn ? 'Next photo' : 'รูปถัดไป'}
          onClick={() => setActiveIndex((index) => (index + 1) % 5)}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
        <span className="review-detail-photo-count" aria-live="polite" aria-atomic="true">
          {activeIndex + 1} / 5
        </span>
      </div>
    </section>
  );
}

export default function ReviewDetail({ review, locale }) {
  if (!review) return null;
  const isEn = locale === 'en';
  const t = config[locale] || config.th;

  const displayTag = isEn && review.tag_en ? review.tag_en : review.tag;
  const displayTitle = displayTag.includes(':') ? displayTag.slice(displayTag.indexOf(':') + 1).trim() : displayTag;
  const tripType = review.tag.startsWith('2 DAY') ? '2 Day 1 Night Trip' : '1 Day Trip';
  const displayText = isEn && review.text_en ? review.text_en : review.text;

  return (
    <div className="review-detail-page page active">
      <div className="page-hero-band">
        <nav className="breadcrumb" aria-label={isEn ? 'Breadcrumb' : 'เส้นทางนำทาง'}>
          <Link href={`/${locale}`}>{t.home}</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href={`/${locale}/reviews`}>{t.reviews}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">{displayTitle}</span>
        </nav>
      </div>
      <div className="review-detail-body">
        <div className="review-detail-container">
          <div className="review-detail-heading">
            <h1 className="review-detail-title">{displayTitle}</h1>
            <span className="review-detail-trip-type">{tripType}</span>
          </div>
          <div className="review-detail-layout">
            <ReviewGallery key={review.id} review={review} displayTag={displayTag} isEn={isEn} />
            <article className="review-detail-card">
              <span className="review-detail-tag">{t.reviews}</span>
              <p className="review-detail-text">{displayText}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
