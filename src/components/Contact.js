'use client';

import { useState } from 'react';
import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Contact({ locale, standalone }) {
  const t = config[locale];
  const [sent, setSent] = useState(false);
  const isEn = locale === 'en';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="page contact-page bg-alt">
      <div className="contact-content">
        {/* <form className="contact-form" onSubmit={handleSubmit}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--navy)', marginBottom: 8, textAlign: 'left' }}>
            {isEn ? 'Send us a message' : 'ส่งข้อความถึงเรา'}
          </h2>
          <label htmlFor="contact-name" className="sr-only">{isEn ? 'Name' : 'ชื่อ'}</label>
          <input id="contact-name" type="text" placeholder={isEn ? 'Name' : 'ชื่อ'} required />
          <label htmlFor="contact-email" className="sr-only">Email</label>
          <input id="contact-email" type="email" placeholder="Email" required />
          <label htmlFor="contact-phone" className="sr-only">{isEn ? 'Phone' : 'เบอร์โทร'}</label>
          <input id="contact-phone" type="tel" placeholder={isEn ? 'Phone' : 'เบอร์โทร'} />
          <label htmlFor="contact-msg" className="sr-only">{isEn ? 'Message' : 'ข้อความ'}</label>
          <textarea id="contact-msg" rows={5} placeholder={isEn ? 'Message...' : 'ข้อความ...'} required />
          <button type="submit">{sent ? (isEn ? '✓ Sent' : '✓ ส่งข้อความแล้ว') : (isEn ? 'Send Message' : 'ส่งข้อความ')}</button>
        </form> */}
        <div className="contact-info">
          <div className="contact-card">
            {standalone ? <h1>{t.contactTitle}</h1> : <h2>{t.contactTitle}</h2>}
            <div className="contact-row">
              <a href={`tel:${config.social.phone}`} className="item">
                <Image src={assetPath('icons/phone-call.png')} width={48} height={48} alt={isEn ? 'Phone' : 'โทรศัพท์'} />
                <div>
                  <p className="title">{t.phoneLabel}</p>
                  <p className="text">{t.phone}</p>
                </div>
              </a>
              <a href={config.social.line} target="_blank" rel="noopener noreferrer" className="item">
                <Image src={assetPath('assets/images/LINE.png')} width={48} height={48} alt="LINE" />
                <div>
                  <p className="title">LINE</p>
                  <p className="text">LINE</p>
                </div>
              </a>
              <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="item">
                <Image src={assetPath('assets/images/Facebook.png')} width={48} height={48} alt="Facebook" />
                <div>
                  <p className="title">Facebook</p>
                  <p className="text">Facebook</p>
                </div>
              </a>
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="item">
                <Image src={assetPath('assets/images/ig.png')} width={48} height={48} alt="Instagram" />
                <div>
                  <p className="title">Instagram</p>
                  <p className="text">Instagram</p>
                </div>
              </a>
            </div>
            <div className="contact-row">
              <a href={`mailto:${t.email}`} className="item">
                <Image src={assetPath('icons/email.png')} width={48} height={48} alt={isEn ? 'Email' : 'อีเมล'} />
                <div>
                  <p className="title">{t.emailLabel}</p>
                  <p className="text">{t.email}</p>
                </div>
              </a>
              <a href={config.social.whatsapp} target="_blank" rel="noopener noreferrer" className="item">
                <Image src={assetPath('assets/images/whatsapp.webp')} width={48} height={48} alt="WhatsApp" />
                <div>
                  <p className="title">WhatsApp</p>
                  <p className="text">WhatsApp</p>
                </div>
              </a>
              <a href={config.social.tiktok} target="_blank" rel="noopener noreferrer" className="item">
                <Image src={assetPath('assets/images/tiktok.png')} width={48} height={48} alt="TikTok" />
                <div>
                  <p className="title">TikTok</p>
                  <p className="text">TikTok</p>
                </div>
              </a>
            </div>
            <div className="contact-row">
              <div className="item">
                <Image src={assetPath('icons/time.png')} width={48} height={48} alt={isEn ? 'Business hours' : 'เวลาทำการ'} />
                <div>
                  <p className="title">{t.hoursLabel}</p>
                  <p className="text">{t.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}