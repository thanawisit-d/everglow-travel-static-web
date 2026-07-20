'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toursData from '@/data/tours.json';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import TourGrid from '@/components/TourGrid';
import Partners from '@/components/Partners';
import ReviewSection from '@/components/ReviewSection';

const featuredIds = {
  popular: [
    'BT-KIX-NRT_S02_XJ', 'KR-CNX-SEOUL-SPRING', 'BT-DYG25_FD',
    'BT-PVG50_VZ', 'BT-FUK_S02_VZ', '3mmjj24412',
  ],
  monthly: [
    'EGT1D-02', 'EGT1D-22', 'EGT-SP-01',
    'EGT3D2N-FP-14', 'EGT4D3N-FP-06', 'EGT4D3N-FP-07',
  ],
};

export default function LocaleClient({ locale }) {
  const router = useRouter();
  const isEn = locale === 'en';
  const t = config[locale] || config.th;

  const popularTours = featuredIds.popular.map(id => toursData.find(t => t.id === id)).filter(Boolean);
  const monthlyTours = featuredIds.monthly.map(id => toursData.find(t => t.id === id)).filter(Boolean);

  const handlePromoClick = (id) => {
    const full = toursData.find((t) => t.id === id);
    if (full) {
      router.push(`/${locale}/tours/${full.id}`);
    }
  };

  const whyItems = [
    { icon: 'seamless', title: t.why1Title, desc: t.why1Desc },
    { icon: 'premium', title: t.why2Title, desc: t.why2Desc },
    { icon: 'trust', title: t.why3Title, desc: t.why3Desc },
  ];

  return (
    <div>
      <Hero locale={locale} />
      <section className="slider-section bg-alt">
        <Slider />
      </section>
      <div className="tour-grid-wrapper">
        <TourGrid locale={locale} showBadge="popular" tours={popularTours} onTourClick={(id) => handlePromoClick(id)} />
        <TourGrid locale={locale} showBadge="monthly" tours={monthlyTours} onTourClick={(id) => handlePromoClick(id)} />
      </div>
      <section className="why-choose-us">
        <h2>{t.whyTitle}</h2>
        <div className="why-grid">
          {whyItems.map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">
                {item.icon === 'seamless' && (
                  <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                    <path d="M20 40C16 36 14 30 16 24c3-9 13-14 22-11s14 13 11 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M44 24c4 4 6 10 4 16-3 9-13 14-22 11s-14-13-11-22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M18 48l6-8 8 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M46 16l-6 8-8-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="2" strokeDasharray="4 3" />
                  </svg>
                )}
                {item.icon === 'premium' && (
                  <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                    <path d="M32 6l8 16 18 2-13 12 4 18-17-9-17 9 4-18L6 24l18-2L32 6Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
                  </svg>
                )}
                {item.icon === 'trust' && (
                  <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                    <path d="M32 6L8 16v12c0 14 10 27 24 30 14-3 24-16 24-30V16L32 6Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                    <path d="M22 34l6 6 14-14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Partners locale={locale} />

      <section className="gallery-section bg-alt">
        <h2>{t.galleryTitle}</h2>
        <p className="subtitle">{t.gallerySubtitle}</p>
        <div className="gallery-grid">
          {['Home.jpg', 'Home1.jpg', 'Home3.jpg', 'Home4.jpg', 'Home5.jpg', 'Home6.jpg', 'Home7.jpg', 'Home8.jpg'].map((img, i) => (
            <div className="gallery-item" key={i}>
              <Image src={assetPath(`assets/images/backgrounds/${img}`)} alt={isEn ? `Travel ${i + 1}` : `รูปเที่ยว ${i + 1}`} fill sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 25vw" loading="lazy" />
              <div className="overlay"><span>{t.viewPhoto}</span></div>
            </div>
          ))}
        </div>
      </section>

      <ReviewSection locale={locale} />
    </div>
  );
}
