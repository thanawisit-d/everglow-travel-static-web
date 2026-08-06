'use client';

import Image from 'next/image';
import { Phone, Mail, Clock, MessageCircle, Camera, MapPin, ArrowRight } from 'lucide-react';
import config from '@/data/site-config.json';
import { assetPath } from '@/lib/assets';

function MediaCard({ img, alt, label, handle, href, cta, modifier }) {
  return (
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
      <div className="contact-media-card__body">
        <div>
          <p className="contact-media-card__label">{label}</p>
          <p className="contact-media-card__handle">{handle}</p>
        </div>
      </div>
      <span className="contact-media-card__cta">
        {cta}
        <ArrowRight size={15} strokeWidth={2.5} />
      </span>
    </a>
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

export default function ContactCard({ locale }) {
  const t = config[locale] || config.th;
  const s = config.social;

  const media = [
    { img: 'assets/images/contact/facebook.png', alt: 'Facebook', label: 'Facebook', handle: 'Everglow Travel', cta: t.contactVisitPage, href: s.facebook },
    { img: 'assets/images/contact/ig.png', alt: 'Instagram', label: 'Instagram', handle: '@everglow.travel', cta: t.contactVisitPage, href: s.instagram },
    { img: 'assets/images/contact/qr.webp', alt: 'LINE', label: 'LINE', handle: t.contactLineId, cta: t.contactVisitPage, href: s.line, modifier: 'contact-media-card--qr' },
    { img: 'assets/images/social/qr.png', alt: 'LINE QR', label: 'LINE', handle: t.contactAddLine, cta: t.contactVisitPage, href: s.line, modifier: 'contact-media-card--qr' },
  ];

  const strip = [
    { icon: MessageCircle, label: 'WhatsApp', value: t.phone, href: s.whatsapp },
    { icon: Camera, label: 'TikTok', value: '@everglow.travel', href: s.tiktok },
  ];

  const details = [
    { icon: Phone, label: t.phoneLabel, value: t.phone, href: `tel:${s.phone}` },
    { icon: Mail, label: t.emailLabel, value: t.email, href: `mailto:${t.email}` },
    { icon: Clock, label: t.hoursLabel, value: t.hours },
  ];

  return (
    <section className="page contact-page">
      <div className="contact-blob contact-blob--pink" aria-hidden="true" />
      <div className="contact-blob contact-blob--blue" aria-hidden="true" />
      <div className="contact-blob contact-blob--gray" aria-hidden="true" />

      <h2 className="contact-heading">{t.contactGetInTouch}</h2>
      <div className="contact-social-grid">
        {media.map((item) => (
          <MediaCard key={item.alt} {...item} />
        ))}
      </div>

      <div className="contact-social-strip">
        {strip.map((item) => (
          <ContactCell key={item.label} {...item} />
        ))}
      </div>

      <h2 className="contact-heading">{t.contactInfoTitle}</h2>
      <div className="contact-info-section">
        {details.map((item) => (
          <ContactCell key={item.label} {...item} />
        ))}
      </div>

      <h2 className="contact-heading">{t.contactFindUs}</h2>
      <p className="contact-findus-addr">
        <MapPin size={22} strokeWidth={2} />
        {t.addr}
      </p>
      <div className="contact-map-wrap">
        <div className="contact-map-placeholder">
          <MapPin size={34} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
