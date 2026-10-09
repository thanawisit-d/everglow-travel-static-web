'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';
import testimonials from '@/data/testimonials.json';

const REVIEW_GALLERY_FOLDERS = {
'domestic-khao-yai-1d': '1D/เขาใหญ่',
  'domestic-wang-nam-khieo-1d': '1D/วังน้ำเขียว',
  'domestic-kaen-makud-1d': '1D/แก่นมะกูด',
  'domestic-tak-2d1n': '2D1N/ตาก',
  'domestic-uthai-thani-2d1n': '2D1N/อุทัยธานี',
  'domestic-phu-lom-lo-2d1n': '2D1N/ภูลมโล',
'domestic-kamphaeng-phet-2d1n': '2D1N/กำแพงเพชร',
  'outbound-chongqing-4d3n': '4D3N/ฉงชิ่ง',
};

const REVIEW_IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png'];

function getTripType(tag) {
  const days = tag.match(/(\d+)\s*DAY/i);
  const nights = tag.match(/(\d+)\s*NIGHT/i);
  if (!days) return '1 Day Trip';
  if (nights) return `${days[1]} Day ${nights[1]} Night Trip`;
  return `${days[1]} Day Trip`;
}

function ReviewGallery({ review, displayTag, isEn }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const folder = REVIEW_GALLERY_FOLDERS[review.id] || review.id;
  // Add <Thai place name>_01–05 as .jpeg, .jpg, or .png in public/review_page/reviews_gallery/<1D or 2D1N>/<Thai place name>/.
  const images = Array.from({ length: 5 }, (_, index) =>
    encodeURI(assetPath(`review_page/reviews_gallery/${folder}/${folder.split('/').pop()}_${String(index + 1).padStart(2, '0')}`))
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
  const tripType = getTripType(review.tag);
  const displayText = isEn && review.text_en ? review.text_en : review.text;
  const chats = testimonials.filter((item) => item.reviewId === review.id);

  return (
    <div className="review-detail-page page active">
      <div className="page-hero-band">
        <nav className="breadcrumb" aria-label={isEn ? 'Breadcrumb' : 'เส้นทางนำทาง'}>
          <Link href={`/${locale}`}>{t.home}</Link>
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
              <p className="review-detail-text">{displayText}</p>
            </article>
          </div>
          {chats.length > 0 && (
            <section className="review-detail-voices" aria-labelledby="review-detail-voices-title">
              <h2 id="review-detail-voices-title" className="review-detail-voices__title">{t.customerVoices}</h2>
              <div className="review-detail-voices__grid">
                {chats.map((item) => (
                  <div key={item.image} className="review-detail-voices__image">
                    <Image
                      src={encodeURI(assetPath(item.image))}
                      width={1250}
                      height={1250}
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 43vw, 480px"
                      alt={t.chatReviewAlt}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
