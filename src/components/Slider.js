'use client';

import { useRef } from 'react';
import Image from 'next/image';

export default function Slider() {
  const slidesRef = useRef(null);
  const indexRef = useRef(0);

  const goTo = (i) => {
    const el = slidesRef.current;
    if (!el) return;
    const total = el.children.length;
    indexRef.current = ((i % total) + total) % total;
    el.style.transform = `translateX(-${indexRef.current * 100}%)`;
  };
  
  return (
    <section className="slider" style={{ marginTop: 30 }}>
      <div className="slides" ref={slidesRef}>
        <Image src="/assets/images/slide1 (1).jpg" width={1920} height={500} className="slide" alt="Tour slide 1" />
        <Image src="/assets/images/slide1 (2).jpg" width={1920} height={500} className="slide" alt="Tour slide 2" />
        <Image src="/assets/images/slide1 (3).jpg" width={1920} height={500} className="slide" alt="Tour slide 3" />
        <Image src="/assets/images/slide1 (4).jpg" width={1920} height={500} className="slide" alt="Tour slide 4" />
      </div>
      <button className="slider-btn prev" onClick={() => goTo(indexRef.current - 1)} aria-label="Previous slide">&#10094;</button>
      <button className="slider-btn next" onClick={() => goTo(indexRef.current + 1)} aria-label="Next slide">&#10095;</button>
    </section>
  );
}