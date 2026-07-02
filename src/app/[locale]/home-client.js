'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toursData from '@/data/tours.json';
import { assetPath } from '@/lib/assets';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import TourGrid from '@/components/TourGrid';
import Reviews from '@/components/Reviews';

export default function LocaleClient({ locale }) {
  const router = useRouter();
  const isEn = locale === 'en';

  const handlePromoClick = (promo) => {
    const full = toursData.find((t) => t.id === promo.id);
    if (full) {
      router.push(`/${locale}/tours/${full.id}`);
    }
  };

  return (
    <div>
      <Hero locale={locale} />
      <section className="slider-section bg-alt">
        <Slider />
      </section>
      <div className="tour-grid-wrapper bg-alt">
        <TourGrid locale={locale} showBadge="popular" onTourClick={handlePromoClick} />
        <TourGrid locale={locale} showBadge="monthly" onTourClick={handlePromoClick} />
      </div>
      <section className="why-choose-us">
        <h2>{isEn ? 'Why Choose Everglow Travel' : 'ทำไมต้องเลือก Everglow Travel'}</h2>
        <p className="subtitle">--------</p>
        <div className="why-grid">
          {[
            { icon: 'guide', title: '--------', desc: '--------' },
            { icon: 'price', title: '--------', desc: '--------' },
            { icon: 'support', title: '--------', desc: '--------' },
            { icon: 'package', title: '--------', desc: '--------' },
          ].map((item, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">
                {item.icon === 'guide' && (
                  <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                    <circle cx="32" cy="20" r="8" stroke="white" strokeWidth="2.5" fill="none" />
                    <path d="M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {item.icon === 'price' && (
                  <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                    <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="2" />
                    <path d="M22 30h20M32 22v20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )}
                {item.icon === 'support' && (
                  <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                    <path d="M18 38h-4a6 6 0 0 1-6-6v-4a6 6 0 0 1 6-6h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M46 22h4a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6h-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M18 22v16a14 14 0 0 0 28 0V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M32 34a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {item.icon === 'package' && (
                  <svg viewBox="0 0 64 64" fill="none" width="32" height="32">
                    <path d="M20 20L44 8M44 20L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M10 44l18 10 18-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M10 44V24l18-10 18 10v20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M28 54V34" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section bg-alt">
        <h2>{isEn ? 'Travel Gallery' : 'แกลเลอรีการเดินทาง'}</h2>
        <p className="subtitle">{isEn ? 'Moments captured from our journeys' : 'ภาพความประทับใจจากการเดินทางของเรา'}</p>
        <div className="gallery-grid">
          {['Home.jpg', 'Home1.jpg', 'Home3.jpg', 'Home4.jpg', 'Home5.jpg', 'Home6.jpg', 'Home7.jpg', 'Home8.jpg'].map((img, i) => (
            <div className="gallery-item" key={i}>
              <Image src={assetPath(`assets/images/backgrounds/${img}`)} alt={isEn ? `Travel ${i + 1}` : `รูปเที่ยว ${i + 1}`} fill sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 25vw" />
              <div className="overlay"><span>{isEn ? 'View Photo' : 'ดูรูป'}</span></div>
            </div>
          ))}
        </div>
      </section>

      <Reviews locale={locale} />
    </div>
  );
}
