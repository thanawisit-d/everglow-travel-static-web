'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  '/assets/images/backgrounds/slide1 (1).jpg',
  '/assets/images/backgrounds/slide1 (2).jpg',
  '/assets/images/backgrounds/slide1 (3).jpg',
  '/assets/images/backgrounds/slide1 (4).jpg',
];

const AUTOPLAY_MS = 5000;

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = IMAGES.length;
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (i) => {
      setCurrent(((i % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => goTo(current + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [current, isPaused, goTo]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goTo(current + (delta < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  };

  return (
    <section
      className="slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Promotions"
    >
      <div className="slides" style={{ transform: `translateX(-${current * 100}%)` }}>
        {IMAGES.map((src, i) => (
          <div className={`slide-frame${i === current ? ' slide-frame--active' : ''}`} key={i}>
            <Image
              src={src}
              fill
              className="slide"
              alt={`Tour promotion ${i + 1}`}
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1100px"
            />
          </div>
        ))}
      </div>

      <button className="slider-btn prev" onClick={() => goTo(current - 1)} aria-label="Previous slide">
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
      <button className="slider-btn next" onClick={() => goTo(current + 1)} aria-label="Next slide">
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      <div className="slider-dots">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <span
                className="slider-dot-progress"
                style={{
                  animationDuration: `${AUTOPLAY_MS}ms`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
              />
            )}
          </button>
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {`Slide ${current + 1} of ${total}`}
      </span>
    </section>
  );
}
