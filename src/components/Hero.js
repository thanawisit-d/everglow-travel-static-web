import Image from 'next/image';
import config from '@/data/site-config.json';

export default function Hero({ locale }) {
  const t = config[locale] || config.th;
  return (
    <section className="hero">
      <Image src="/assets/images/backgrounds/Home3.jpg" fill className="hero-bg" alt="" priority sizes="100vw" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
      </div>
    </section>
  );
}
