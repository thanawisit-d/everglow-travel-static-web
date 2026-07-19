'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

const serviceImages = [
  'assets/images/backgrounds/Home1.jpg',
  'assets/images/backgrounds/Home4.jpg',
  'assets/images/backgrounds/Home5.jpg',
];

export default function Hero({ locale }) {
  const t = config[locale] || config.th;
  const scrollRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const serviceNames = [
    t.heroService1Name,
    t.heroService2Name,
    t.heroService3Name,
  ];

  const centerOnResize = useCallback(() => {
    const el = scrollRef.current;
    if (!el || window.innerWidth > 768) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  const updateActiveCard = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / 3;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveCard(Math.min(2, Math.max(0, index)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    centerOnResize();
    updateActiveCard();

    el.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', centerOnResize);
    const ro = new ResizeObserver(centerOnResize);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', centerOnResize);
      ro.disconnect();
    };
  }, [centerOnResize, updateActiveCard]);

  const goToCard = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / 3;
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <Image
        src="/assets/images/backgrounds/Home3.jpg"
        fill
        className="hero-bg"
        alt=""
        priority
        sizes="100vw"
      />
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-header">
          <h1 className="hero-service-title">{t.heroServiceTitle}</h1>
          <div className="hero-divider" />
        </div>
        <div className="hero-body">
          <div className="hero-left">
            <p className="hero-desc">{t.heroServiceDesc}</p>
            <Link href={`/${locale}/about`} className="hero-cta">
              {t.heroServiceBtn}
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="hero-right-wrapper">
            <div className="hero-right" ref={scrollRef}>
              {[0, 1, 2].map((i) => (
                <div className="service-card" key={i}>
                  <div className="service-card-img">
                    <Image
                      src={assetPath(serviceImages[i])}
                      fill
                      alt={serviceNames[i]}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="service-card-name">{serviceNames[i]}</span>
                </div>
              ))}
            </div>

            <div className="hero-dots" role="tablist" aria-label="Service cards">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={activeCard === i}
                  aria-label={serviceNames[i]}
                  className={`hero-dot${activeCard === i ? ' hero-dot--active' : ''}`}
                  onClick={() => goToCard(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
