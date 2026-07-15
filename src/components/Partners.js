'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

export default function Partners({ locale }) {
  const t = config[locale] || config.th;
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  return (
    <section className="partners">
      <h2 className="partners-title">{t.partnerTitle}</h2>
      <div className="partners-scroll-wrapper">
        {canScrollLeft && (
          <button
            type="button"
            className="partners-arrow partners-arrow--left"
            aria-label="Scroll left"
            onClick={() => scroll('left')}
          >
            ‹
          </button>
        )}
        <div className="partners-scroll" ref={scrollRef}>
          <div className="partners-row">
          {(t.partners || []).map((p, i) => (
            <div className="partner-item" key={i}>
              <div className="partner-icon">
                <Image src={assetPath(`assets/images/logos/${p.logo}`)} fill sizes="54px" alt={p.name} className="partner-img" />
              </div>
              <span className="partner-name">{p.name}</span>
            </div>
          ))}
          </div>
        </div>
        {canScrollRight && (
          <button
            type="button"
            className="partners-arrow partners-arrow--right"
            aria-label="Scroll right"
            onClick={() => scroll('right')}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}
