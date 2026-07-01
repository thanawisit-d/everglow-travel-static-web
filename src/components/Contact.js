'use client';

import { Phone, Mail, Clock, MessageCircle, Camera, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import config from '@/data/site-config.json';

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
      <Link href={href} className="contact-cell-wrap" target="_blank" rel="noopener noreferrer">
        {inner}
      </Link>
    );
  }

  return <div className="contact-cell-wrap">{inner}</div>;
}

export default function ContactCard({ locale, standalone }) {
  const t = config[locale] || config.th;
  const s = config.social;

  const row1 = [
    { icon: MessageCircle,   label: 'LINE',       value: '@Everglowtravel',       href: s.line },
    { icon: ExternalLink,  label: 'Facebook',  value: 'Everglow Travel',  href: s.facebook },
    { icon: Camera,        label: 'Instagram', value: '@everglow.travel', href: s.instagram },
  ];

  const row2 = [
    { icon: ExternalLink,  label: 'TikTok',    value: '@everglow.travel', href: s.tiktok },
    { icon: MessageCircle, label: 'WhatsApp',  value: t.phone,            href: s.whatsapp },
    { icon: Mail,          label: t.emailLabel,value: t.email,            href: `mailto:${t.email}` },
  ];

  const row3 = [
    { icon: Phone, label: t.phoneLabel, value: t.phone, href: `tel:${s.phone}` },
    { icon: Clock, label: t.hoursLabel, value: t.hours },
  ];

  return (
    <section className="page contact-page bg-alt">
      <div className="contact-wrap">
        <div className="contact-card-new">

          <div className="contact-title-wrap">
            {standalone ? <h1>{t.contact}</h1> : <h2>{t.contact}</h2>}
            <hr className="contact-underline" />
          </div>

          <div className="contact-row-centered">
            {row1.map((item) => (
              <div key={item.label} className="contact-cell-wrap-third">
                <ContactCell {...item} />
              </div>
            ))}
          </div>

          <div className="contact-row-centered">
            {row2.map((item) => (
              <div key={item.label} className="contact-cell-wrap-third">
                <ContactCell {...item} />
              </div>
            ))}
          </div>

          <div className="contact-row-centered">
            {row3.map((item) => (
              <div key={item.label} className="contact-cell-wrap-third">
                <ContactCell {...item} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
