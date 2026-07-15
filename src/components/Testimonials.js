'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import reviews from '@/data/reviews.json';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function Testimonials({ locale, standalone }) {
  const t = config[locale] || config.th;
  const isEn = locale === 'en';
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reviews.length) return null;

  const goTo = useCallback((i) => {
    setActiveIndex(i);
  }, []);

  return (
    <section className={`testimonials${standalone ? ' testimonials--standalone' : ''}`}>
      <div className="testimonials__background">
        <Image
          src="/assets/images/backgrounds/Home1.jpg"
          alt=""
          fill
          className="testimonials__bg-image"
          sizes="100vw"
        />
        <div className="testimonials__overlay" />
      </div>

      <div className="testimonials__content">
        {standalone ? <h1 className="testimonials__heading">{t.reviewTitle}</h1> : <h2 className="testimonials__heading">{t.reviewTitle}</h2>}

        <div className="testimonials__track">
          {reviews.map((item, i) => (
            <article
              key={i}
              className={`testimonial-card ${i === activeIndex ? 'testimonial-card--active' : ''}`}
            >
              <div className="testimonial-card__image">
                <Image
                  src={assetPath(item.image)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={isEn && item.tag_en ? item.tag_en : item.tag}
                  className="testimonial-card__image-img"
                />
              </div>
              <div className="testimonial-card__body">
                <div className="testimonial-card__tag">{isEn && item.tag_en ? item.tag_en : item.tag}</div>
                <p className="testimonial-card__quote">{isEn && item.text_en ? item.text_en : item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonials__dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`testimonials__dot ${i === activeIndex ? 'is-active' : ''}`}
              aria-label={isEn ? `Go to review ${i + 1}` : `ไปที่รีวิวที่ ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
