import Image from 'next/image';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

export default function Partners({ locale }) {
  const t = config[locale] || config.th;
  const partners = t.partners || [];

  return (
    <section className="partners">
      <h2 className="partners-title">{t.partnerTitle}</h2>
      <div className="partners-marquee">
        <div className="partners-track">
          {[...partners, ...partners].map((p, i) => (
            <div
              className="partner-item"
              key={i}
              aria-hidden={i >= partners.length ? 'true' : undefined}
            >
              <div className="partner-icon">
                <Image
                  src={assetPath(`assets/images/logos/${p.logo}`)}
                  fill
                  sizes="54px"
                  alt={i < partners.length ? p.name : ''}
                  className="partner-img"
                />
              </div>
              <span className="partner-name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
