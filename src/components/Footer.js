'use client';

import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function Footer({ locale }) {
  const t = config[locale] || config.th;
  const s = config.social;
  const isEn = locale === 'en';

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <Image
            src={assetPath('assets/images/logos/whitelogo.png')}
            width={190}
            height={60}
            className="footer-logo"
            alt="Everglow Travel"
          />
          <div className="footer-company">
            {t.company.replace(/\s*\(.*?\)/g, '').trim()}
            {t.company.includes('(') && (
              <>
                <br />({t.company.match(/\(([^)]+)\)/)?.[1]})
              </>
            )}
          </div>
          <div className="footer-license">{t.license}</div>
        </div>

        <div className="footer-col footer-contact">
          <h2 className="footer-heading">{t.contactTitle}</h2>

          <div className="contact-item">
            <span className="contact-icon">
              <Image src={assetPath('icons/clock.png')} width={18} height={18} alt="" />
            </span>
            <span>{t.hours}</span>
          </div>

          <a href={`tel:${t.phone.replace(/[^0-9+]/g, '')}`} className="contact-item">
            <span className="contact-icon">
              <Image src={assetPath('assets/images/icons/phone3.png')} width={18} height={18} alt="" />
            </span>
            <span>{t.phone}</span>
          </a>

          <a href={s.facebook} target="_blank" rel="noopener noreferrer" className="contact-item">
            <span className="contact-icon">
              <Image src={assetPath('assets/images/social/Facebook.png')} width={18} height={18} alt="" />
            </span>
            <span>{t.fb}</span>
          </a>

          <a href={s.line} target="_blank" rel="noopener noreferrer" className="contact-item">
            <span className="contact-icon">
              <Image src={assetPath('assets/images/social/LINE.png')} width={18} height={18} alt="" />
            </span>
            <span>{t.line}</span>
          </a>
        </div>

        <div className="footer-col qr-box">
          <h2 className="footer-heading">{t.follow}</h2>
          <Image
            src={assetPath('assets/images/social/qr.png')}
            width={180}
            height={180}
            className="qr-img"
            alt="LINE QR Code"
          />
          <div className="line-id">@Everglowtravel</div>
          <div className="social-row">
            <a href={s.facebook} target="_blank" rel="noopener noreferrer" aria-label={isEn ? 'Facebook' : 'เฟซบุ๊ก'}>
              <Image src={assetPath('assets/images/social/Facebook.png')} width={50} height={50} alt="" />
            </a>
            <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label={isEn ? 'Instagram' : 'อินสตาแกรม'}>
              <Image src={assetPath('assets/images/social/ig.png')} width={50} height={50} alt="" />
            </a>
            <a href={s.tiktok} target="_blank" rel="noopener noreferrer" aria-label={isEn ? 'TikTok' : 'ติ๊กต็อก'}>
              <Image src={assetPath('assets/images/social/tiktok.webp')} width={50} height={50} alt="" />
            </a>
            <a href={s.line} target="_blank" rel="noopener noreferrer" aria-label={isEn ? 'LINE' : 'ไลน์'}>
              <Image src={assetPath('assets/images/social/LINE.png')} width={50} height={50} alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy;{new Date().getFullYear()} Everglow Global Co., Ltd. All rights reserved.</div>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <Link href={`/${locale}/privacy`} className="hover:underline">
            {t.privacyPolicy}
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-cookie-consent'))}
            className="hover:underline cursor-pointer"
          >
            {t.cookieSettings}
          </button>
        </div>
      </div>
    </footer>
  );
}
