'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/assets/images/slide1 (1).jpg',
  '/assets/images/slide1 (2).jpg',
  '/assets/images/slide1 (3).jpg',
  '/assets/images/slide1 (4).jpg',
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
    const timer = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="slider" style={{ marginTop: 30 }}>
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