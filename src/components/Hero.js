import Image from 'next/image';
import Link from 'next/link';
import config from '@/data/site-config.json';

export default function Hero({ locale }) {
  const t = config[locale] || config.th;
  const isEn = locale === 'en';
  return (
    <section className="hero">
      <Image src="/assets/images/backgrounds/Home3.jpg" fill className="hero-bg" alt="" priority sizes="100vw" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
        <div className="hero-actions">
          <Link href={`/${locale}/domestic`} className="hero-btn hero-btn-primary">
            {isEn ? 'View Domestic Tours' : 'ทัวร์ในประเทศ'}
          </Link>
          <Link href={`/${locale}/outbound`} className="hero-btn hero-btn-secondary">
            {isEn ? 'View Outbound Tours' : 'ทัวร์ต่างประเทศ'}
          </Link>
        </div>
      </div>
    </section>
  );
}
