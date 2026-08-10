'use client';

import Image from 'next/image';
import { Phone, Mail, Clock } from 'lucide-react';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

function MediaCard({ img, alt, href, modifier, title, titleStyle }) {
  return (
    <div className="contact-media-card-col">
      {title && (
        <span className={`contact-media-card__title contact-media-card__title--${titleStyle}`}>
          {title}
        </span>
      )}
      <a
        href={href}
        className={`contact-media-card${modifier ? ` ${modifier}` : ''}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="contact-media-card__img-wrap">
          <Image
            src={assetPath(img)}
            fill
            sizes="(max-width: 992px) 90vw, 45vw"
            alt={alt}
            className="contact-media-card__img"
          />
        </div>
      </a>
    </div>
  );
}

function ContactCell({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="contact-cell">
      <div className="contact-cell-icon">
        <Icon size={20} />
      </div>
      <div>
        <p className="contact-cell-label">{label}</p>
        <p className="contact-cell-value">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="contact-cell-wrap" target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <div className="contact-cell-wrap">{inner}</div>;
}

/* ---- NEW: LINE add-friend section ---- */
function LineSection({ t, lineHref }) {
  return (
    <div className="contact-line-section">
      <div className="contact-line-banner">
        <p>{t.lineBanner}</p>
      </div>

      <div className="contact-line-left">
        <h3 className="contact-line-title">{t.lineTitle}</h3>

        <p className="contact-line-cta">{t.lineCta}</p>

        <div className="contact-line-qr">
          <Image
            src={assetPath('assets/images/contact/line-qr.png')}
            width={200}
            height={200}
            alt={`LINE QR - ${t.lineId}`}
          />
        </div>

        <a href={lineHref} target="_blank" rel="noopener noreferrer" className="contact-line-id">
          {t.lineId}
        </a>
      </div>

      <div className="contact-line-right">
        <Image
          src={assetPath('assets/images/contact/phone-mockup.svg')}
          width={631}
          height={1072}
          alt="LINE phone mockup"
        />
      </div>
    </div>
  );
}

export default function ContactCard({ locale }) {
  const t = config[locale] || config.th;
  const s = config.social;

  const media = [
    { img: 'assets/images/contact/facebook.png', alt: 'Facebook', title: 'FACEBOOK', titleStyle: 'fb', href: s.facebook },
    { img: 'assets/images/contact/ig.png', alt: 'Instagram', title: 'INSTAGRAM', titleStyle: 'ig', modifier: 'contact-media-card--ig', href: s.instagram },
  ];

  const details = [
    { icon: Phone, label: t.phoneLabel, value: t.phone, href: `tel:${s.phone}` },
    { icon: Mail, label: t.emailLabel, value: t.email, href: `mailto:${t.email}` },
    { icon: Clock, label: t.hoursLabel, value: t.hours },
  ];

  return (
    <section className="page contact-page">
      <h2 className="contact-heading">{t.contactGetInTouch}</h2>
      <div className="contact-social-grid">
        {media.map((item) => (
          <MediaCard key={item.alt} {...item} />
        ))}
      </div>

      {/* ---- LINE, inserted between the two rows ---- */}
      <LineSection t={t} lineHref={s.line} />

      <div className="contact-social-strip">
        <a
          href={s.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-ribbon-img"
          aria-label="WhatsApp"
        >
          <Image
            src={assetPath('assets/images/social/whatsapp-ribbon.svg')}
            alt="WhatsApp"
            width={468}
            height={154}
            className="contact-ribbon-img__img"
          />
        </a>
        <a
          href={s.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-ribbon-img"
          aria-label="TikTok"
        >
          <Image
            src={assetPath('assets/images/social/tiktok-ribbon.svg')}
            alt="TikTok"
            width={518}
            height={160}
            className="contact-ribbon-img__img"
          />
        </a>
      </div>

      <div className="contact-info-section">
        {details.map((item) => (
          <ContactCell key={item.label} {...item} />
        ))}
      </div>

      <h2 className="contact-heading">{t.contactFindUs}</h2>
      <div className="contact-map-wrap">
        <iframe
          src={t.mapEmbedUrl}
          title={t.contactFindUs}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
