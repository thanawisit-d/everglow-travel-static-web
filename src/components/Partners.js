'use client';
import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

export default function Partners({ locale }) {
  const t = config[locale] || config.th;
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (dir === 'left') {
      if (el.scrollLeft <= 4) {
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
        return;
      }
    } else {
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
    }
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  return (
    <section className="partners">
      <h2 className="partners-title">{t.partnerTitle}</h2>
      <div className="partners-scroll-wrapper">
        <button
          type="button"
          className="partners-arrow partners-arrow--left"
          aria-label="Scroll left"
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <div className="partners-scroll" ref={scrollRef}>
          <div className="partners-row">
            {(t.partners || []).map((p, i) => (
              <div className="partner-item" key={i}>
                <div className="partner-icon">
                  <Image
                    src={assetPath(`assets/images/logos/${p.logo}`)}
                    fill
                    sizes="54px"
                    alt={p.name}
                    className="partner-img"
                  />
                </div>
                <span className="partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="partners-arrow partners-arrow--right"
          aria-label="Scroll right"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
