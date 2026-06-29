'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/assets/images/backgrounds/slide1 (1).jpg',
  '/assets/images/backgrounds/slide1 (2).jpg',
  '/assets/images/backgrounds/slide1 (3).jpg',
  '/assets/images/backgrounds/slide1 (4).jpg',
];

export default function Slider() {
  const slidesRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const total = IMAGES.length;

  const goTo = (i) => {
    const el = slidesRef.current;
    if (!el) return;
    const idx = ((i % total) + total) % total;
    el.style.transform = `translateX(-${idx * 100}%)`;
    setCurrent(idx);
  };

  useEffect(() => {
    const el = slidesRef.current;
    if (!el) return;
    const timer = setInterval(() => {
      const next = (current + 1) % total;
      el.style.transform = `translateX(-${next * 100}%)`;
      setCurrent(next);
    }, 4000);
    return () => clearInterval(timer);
  }, [current, total]);

  return (
    <section className="slider">
      <div className="slides" ref={slidesRef}>
        {IMAGES.map((src, i) => (
          <Image key={i} src={src} width={1920} height={500} className="slide" alt={`Tour slide ${i + 1}`} />
        ))}
      </div>
      <button className="slider-btn prev" onClick={() => goTo(current - 1)} aria-label="Previous slide">&#10094;</button>
      <button className="slider-btn next" onClick={() => goTo(current + 1)} aria-label="Next slide">&#10095;</button>
      <div className="slider-dots">
        {IMAGES.map((_, i) => (
          <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}