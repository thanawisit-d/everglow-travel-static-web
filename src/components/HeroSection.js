'use client';

import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import SearchWidget from './SearchWidget';

const TEXT = {
  th: {
    title: 'ค้นพบทริปในฝันของคุณ',
    subtitle: 'ค้นหาปลายทาง เลือกวันเดินทาง แล้วเริ่มต้นทริปที่ใช่',
  },
  en: {
    title: 'Discover Your Next Adventure',
    subtitle: 'Find amazing destinations and book your perfect trip',
  },
};

export default function HeroSection({ locale, destinations }) {
  const t = TEXT[locale] || TEXT.th;

  return (
    <>
      <section className="hero-static bg-section">
        <Image
          src={assetPath('assets/images/backgrounds/Home4.jpg')}
          width={1440}
          height={400}
          priority
          alt=""
          className="hero-static-img"
        />
        <div className="hero-static-overlay" />
        <div className="hero-static-content">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </section>

      <SearchWidget locale={locale} destinations={destinations} />
    </>
  );
}
