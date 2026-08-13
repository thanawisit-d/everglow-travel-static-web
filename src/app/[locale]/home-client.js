'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import toursDataTh from '@/data/tours-th.json';
import toursDataEn from '@/data/tours-en.json';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';
import Hero from '@/components/Hero';
import HeroSection from '@/components/HeroSection';
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

const featuredPopularEn = [
  'EGT1D-20', 'EGT1D-19', 'EGT1D-17',
  'EGT-FP-46', 'EGT-SP-44', 'EGT-FP-42',
];

export default function LocaleClient({ locale }) {
  const isEn = locale === 'en';
  const t = config[locale] || config.th;
  const toursData = isEn ? toursDataEn : toursDataTh;

  let popularTours = (isEn ? featuredPopularEn : featuredIds.popular)
    .map(id => toursData.find(t => t.id === id))
    .filter(Boolean);
  if (popularTours.length === 0) popularTours = toursData.slice(0, 6);
  const monthlyTours = featuredIds.monthly.map(id => toursData.find(t => t.id === id)).filter(Boolean);

  const destinations = useMemo(() => {
    const domesticSet = new Set();
    const outboundSet = new Set();

    toursData.forEach((tour) => {
      if (tour.type === 'outbound') {
        const c = tour.country;
        if (Array.isArray(c)) c.forEach((v) => outboundSet.add(v));
        else if (c) outboundSet.add(c);
      } else {
        const p = tour.province;
        if (Array.isArray(p)) p.forEach((v) => domesticSet.add(v));
        else if (p) domesticSet.add(p);
      }
    });

    const collator = (a, b) => a.localeCompare(b, isEn ? 'en' : 'th');

    return {
      domestic: [...domesticSet].sort(collator),
      outbound: [...outboundSet].sort(collator),
    };
  }, [isEn, toursData]);

  const whyItems = [
    { icon: 'service', title: t.why1Title, desc: t.why1Desc },
    { icon: 'experience', title: t.why2Title, desc: t.why2Desc },
    { icon: 'trust', title: t.why3Title, desc: t.why3Desc },
  ];

  return (
    <div>
      <HeroSection locale={locale} destinations={destinations} />
      <div className="tour-grid-wrapper">
        <TourGrid locale={locale} showBadge="popular" tours={popularTours} />
        <TourGrid locale={locale} showBadge="monthly" tours={monthlyTours} />
      </div>
      <div className="services-section bg-section">
        <Hero locale={locale} />
      </div>
      <section className="why-choose-us bg-section">
        <h2>{t.whyTitle}</h2>
        <div className="why-grid">
          {whyItems.map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">
                <img
                  src={assetPath(`assets/images/icons/${item.icon}.svg`)}
                  alt={item.title}
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Partners locale={locale} />

      <section className="gallery-section bg-section">
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
