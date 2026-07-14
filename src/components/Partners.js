'use client';

import Image from 'next/image';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

const partners = [
  'Everglow Travel',
  'Everglow Travel',
  'Everglow Travel',
  'Everglow Travel',
  'Everglow Travel',
  'Everglow Travel',
];

export default function Partners({ locale }) {
  const t = config[locale] || config.th;

  return (
    <section className="partners">
      <h2 className="partners-title">{t.partnerTitle}</h2>
      <div className="partners-scroll">
        <div className="partners-row">
        {partners.map((name, i) => (
          <div className="partner-item" key={i}>
            <div className="partner-icon">
              <Image src={assetPath('assets/images/logos/Logo.jpg')} fill alt={name} className="partner-img" />
            </div>
            <span className="partner-name">{name}</span>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
