'use client';

import { useEffect, useRef } from 'react';

export default function Slider() {
  const slidesRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = slidesRef.current;
    if (!el) return;
    const total = el.children.length;
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % total;
      el.style.transform = `translateX(-${indexRef.current * 100}%)`;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider" style={{ marginTop: 30 }}>
      <div className="slides" ref={slidesRef}>
        <img src="/assets/images/slide1 (1).jpg" className="slide" alt="slide1" />
        <img src="/assets/images/slide1 (2).jpg" className="slide" alt="slide2" />
        <img src="/assets/images/slide1 (3).jpg" className="slide" alt="slide3" />
        <img src="/assets/images/slide1 (4).jpg" className="slide" alt="slide4" />
      </div>
    </section>
  );
}
