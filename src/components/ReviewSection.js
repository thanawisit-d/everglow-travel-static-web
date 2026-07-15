'use client';

import Image from 'next/image';
import reviews from '@/data/reviews.json';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function ReviewSection({ locale, standalone }) {
  const t = config[locale] || config.th;
  const isEn = locale === 'en';
  const displayReviews = standalone ? reviews : reviews.slice(0, 3);

  if (!reviews.length) return null;

  return (
    <section className={`review-section${standalone ? ' review-section--standalone' : ' review-section--home'}`}>
      <div className="review-section__background">
        <Image
          src="/assets/images/backgrounds/Home1.jpg"
          alt=""
          fill
          className="review-section__bg-image"
          sizes="100vw"
        />
        <div className="review-section__overlay" />
      </div>

      <div className="review-section__content">
        {standalone ? <h1 className="review-section__heading">{t.reviewTitle}</h1> : <h2 className="review-section__heading">{t.reviewTitle}</h2>}

        <div className="review-section__track">
          {displayReviews.map((item, i) => (
            <a
              key={i}
              href={`/${locale}/reviews/${item.id}`}
              className="review-card-link"
            >
              <article className="review-card">
                <div className="review-card__image">
                  <Image
                    src={assetPath(item.image)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={isEn && item.tag_en ? item.tag_en : item.tag}
                    className="review-card__image-img"
                  />
                </div>
                <div className="review-card__body">
                  <div className="review-card__tag">{isEn && item.tag_en ? item.tag_en : item.tag}</div>
                  <p className="review-card__quote">{isEn && item.text_en ? item.text_en : item.text}</p>
                </div>
              </article>
            </a>
          ))}
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
