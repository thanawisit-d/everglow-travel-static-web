import Image from 'next/image';
import Link from 'next/link';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

const serviceImages = [
  'assets/images/backgrounds/Home1.jpg',
  'assets/images/backgrounds/Home4.jpg',
  'assets/images/backgrounds/Home5.jpg',
];

export default function Hero({ locale }) {
  const t = config[locale] || config.th;
  const serviceNames = [
    t.heroService1Name,
    t.heroService2Name,
    t.heroService3Name,
  ];

  return (
    <section className="hero">
      <Image src="/assets/images/backgrounds/Home3.jpg" fill className="hero-bg" alt="" priority sizes="100vw" />
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
              {t.heroServiceBtn} →
            </Link>
          </div>
          <div className="hero-right">
            {[0, 1, 2].map((i) => (
              <div className="service-card" key={i}>
                <div className="service-card-img">
                  <Image src={assetPath(serviceImages[i])} fill alt={serviceNames[i]} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <span className="service-card-name">{serviceNames[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
