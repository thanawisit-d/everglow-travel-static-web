'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import testimonials from '@/data/testimonials.json';
import config from '@/data/site-config.json';

export default function Testimonials({ locale, standalone }) {
  const t = config[locale] || config.th;
  const isEn = locale === 'en';
  const [activeIndex, setActiveIndex] = useState(0);

  const visible = testimonials[activeIndex];

  const goTo = useCallback((i) => {
    setActiveIndex(i);
  }, []);

  if (!visible) return null;

  return (
    <section className="testimonials">
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
          {testimonials.map((item, i) => (
            <article
              key={item.id}
              className={`testimonial-card ${i === activeIndex ? 'testimonial-card--active' : ''}`}
              aria-hidden={i !== activeIndex}
            >
              <div className="testimonial-card__avatar" aria-hidden="true">
                <div className="testimonial-card__avatar-placeholder">
                  {item.name.charAt(0)}
                </div>
              </div>

              <div className="testimonial-card__header">
                <div>
                  <p className="testimonial-card__name">{item.name}</p>
                  <p className="testimonial-card__role">{isEn && item.role_en ? item.role_en : item.role}</p>
                </div>
                <div className="testimonial-card__stars" aria-label={`${item.rating} ${isEn ? 'out of 5 stars' : 'จาก 5 ดาว'}`}>
                  {Array.from({ length: item.rating }).map((_, si) => (
                    <Star key={si} size={14} className="testimonial-card__star" />
                  ))}
                </div>
              </div>

              <p className="testimonial-card__quote">{isEn && item.quote_en ? item.quote_en : item.quote}</p>
            </article>
          ))}
        </div>

        <div className="testimonials__dots">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
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
