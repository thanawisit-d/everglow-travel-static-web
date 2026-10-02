'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import reviews from '@/data/reviews.json';
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

function ReviewCover({ review, title, isEn, href, home = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const folder = REVIEW_GALLERY_FOLDERS[review.id] || review.id;
  const failure = failedImages[activeIndex] || 0;
  const photoUnavailable = failure > REVIEW_IMAGE_EXTENSIONS.length || (failure === REVIEW_IMAGE_EXTENSIONS.length && !review.image);

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((index) => (index + 4) % 5);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((index) => (index + 1) % 5);
  };

  const handleDotClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(index);
  };

  return (
    <div className={home ? 'review-card__image review-destination__image' : 'review-destination__image'} role="group" aria-label={isEn ? `${title} photos` : `ภาพจากทริป${title}`}>
      <a href={href} className="review-destination-link review-destination__image-link" aria-label={isEn ? `Read ${title} review` : `อ่านรีวิว${title}`}>
        {photoUnavailable ? (
          <span className="review-destination__placeholder">{isEn ? 'Photo unavailable' : 'ยังไม่มีรูปภาพ'}</span>
        ) : (
          <Image
            key={`${activeIndex}-${failure}`}
            src={encodeURI(assetPath(failure < REVIEW_IMAGE_EXTENSIONS.length ? `reviews_gallery/${folder}/${String(activeIndex + 1).padStart(2, '0')}.${REVIEW_IMAGE_EXTENSIONS[failure]}` : review.image))}
            fill
            sizes={home ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' : '(max-width: 640px) 86vw, (max-width: 1024px) 43vw, (max-width: 1720px) 29vw, 480px'}
            alt={`${title} — ${isEn ? 'photo' : 'รูปที่'} ${activeIndex + 1}`}
            loading="eager"
            className="review-destination__photo"
            onError={() => setFailedImages((previous) => ({
              ...previous,
              [activeIndex]: Math.max(previous[activeIndex] || 0, failure + 1),
            }))}
          />
        )}
      </a>
      <button
        type="button"
        className="review-destination__arrow review-destination__arrow--prev"
        aria-label={isEn ? 'Previous photo' : 'รูปก่อนหน้า'}
        onClick={handlePrev}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="review-destination__arrow review-destination__arrow--next"
        aria-label={isEn ? 'Next photo' : 'รูปถัดไป'}
        onClick={handleNext}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      <div className="review-destination__dots" role="group" aria-label={isEn ? 'Choose photo' : 'เลือกรูปภาพ'}>
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            type="button"
            className="review-destination__dot"
            aria-label={isEn ? `View photo ${index + 1} of 5` : `ดูรูปที่ ${index + 1} จาก 5 รูป`}
            aria-pressed={activeIndex === index}
            onClick={(e) => handleDotClick(e, index)}
          />
        ))}
      </div>
      <span className="review-destination__status" aria-live="polite" aria-atomic="true">
        {isEn ? `Photo ${activeIndex + 1} of 5` : `รูปที่ ${activeIndex + 1} จาก 5 รูป`}
      </span>
    </div>
  );
}

export default function ReviewSection({ locale, standalone }) {
  const t = config[locale] || config.th;
  const isEn = locale === 'en';
  const displayReviews = standalone ? reviews : reviews.slice(0, 3);

  if (!reviews.length) return null;

  if (standalone) {
    return (
      <section className="review-section review-section--standalone">
      

        <div className="review-section__content">
          <h1 className="review-section__heading">{t.reviewTitle}</h1>
          <div className="review-destinations">
            {reviews.map((item) => {
              const tag = isEn && item.tag_en ? item.tag_en : item.tag;
              const title = tag.includes(':') ? tag.slice(tag.indexOf(':') + 1).trim() : tag;
              const tripType = item.tag.startsWith('2 DAY') ? '2 Day 1 Night Trip' : '1 Day Trip';

              return (
                <article key={item.id} className="review-destination">
                  <ReviewCover review={item} title={title} isEn={isEn} href={`/${locale}/reviews/${item.id}`} />
                  <a href={`/${locale}/reviews/${item.id}`} className="review-destination-link review-destination__body">
                    <div className="review-destination__heading">
                      <h2 className="review-destination__title">{title}</h2>
                      <span className="review-destination__trip-type">{tripType}</span>
                    </div>
                    <p className="review-destination__quote">{isEn && item.text_en ? item.text_en : item.text}</p>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`review-section${standalone ? ' review-section--standalone' : ' review-section--home'}`}>
    

      <div className="review-section__content">
        {standalone ? <h1 className="review-section__heading">{t.reviewTitle}</h1> : <h2 className="review-section__heading">{t.reviewTitle}</h2>}

        <div className="review-section__track">
          {displayReviews.map((item, i) => {
            const tag = isEn && item.tag_en ? item.tag_en : item.tag;
            const title = tag.includes(':') ? tag.slice(tag.indexOf(':') + 1).trim() : tag;
            const tripType = item.tag.startsWith('2 DAY') ? '2 Day 1 Night Trip' : '1 Day Trip';

            return (
              <article key={i} className="review-card">
                <ReviewCover review={item} title={title} isEn={isEn} href={`/${locale}/reviews/${item.id}`} home />
                <a href={`/${locale}/reviews/${item.id}`} className="review-card-link review-card__body">
                  <div className="review-card__heading review-destination__heading">
                    <h3 className="review-destination__title">{title}</h3>
                    <span className="review-destination__trip-type">{tripType}</span>
                  </div>
                  <p className="review-card__quote">{isEn && item.text_en ? item.text_en : item.text}</p>
                </a>
              </article>
            );
          })}
        </div>

        {!standalone && (
          <div className="review-section__view-all-wrapper">
            <a href={`/${locale}/reviews`} className="review-section__view-all">
              {t.heroServiceBtn}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
