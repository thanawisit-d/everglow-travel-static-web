'use client';

import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function Footer({ locale }) {
  const t = config[locale] || config.th;
  const s = t.social;
  const companyName = t.company.replace(/\s*\(.*?\)/g, '').trim();
  const companyBranch = t.company.match(/\(([^)]+)\)/)?.[1];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <Image
            src={assetPath('assets/images/logos/whitelogo.png')}
            width={190}
            height={152}
            className="footer-logo"
            alt="Everglow Travel"
          />
          <div className="footer-company">
            {companyName}
            {companyBranch && <span className="footer-company-branch"> ({companyBranch})</span>}
          </div>
          <div className="footer-address">
            <span className="footer-address-label">{t.addressLabel}</span>
            <span>{t.address}</span>
          </div>
          <div className="footer-license">
            {t.license}
            <br />
            {t.tourLicense}
          </div>
        </div>

        <div className="footer-col footer-contact">
          <h2 className="footer-heading">{t.contactTitle}</h2>
          <ul className="footer-list">
            <li>
              {t.footerHoursLabel} : {t.footerHours}
            </li>
            <li>
              {t.footerPhoneLabel} :{' '}
              <a href={`tel:${s.phone}`} className="footer-link">
                {t.footerPhone || t.phone}
              </a>
            </li>
            <li>
              LINE :{' '}
              <a href={s.lineChat} target="_blank" rel="noopener noreferrer" className="footer-link">
                {t.lineId}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col footer-follow">
          <h2 className="footer-heading">{t.follow}</h2>
          <ul className="footer-list">
            <li>
              Facebook :{' '}
              <a href={s.facebook} target="_blank" rel="noopener noreferrer" className="footer-link">
                {t.footerFacebook || 'Everglow Travel'}
              </a>
            </li>
            <li>
              Instagram :{' '}
              <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">
                {t.footerInstagram || 'Everglow_Travel'}
              </a>
            </li>
            <li>
              TikTok :{' '}
              <a href={s.tiktok} target="_blank" rel="noopener noreferrer" className="footer-link">
                {t.footerTikTok || 'Everglow.Travel'}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-bottom-left">
            <span>&copy; {new Date().getFullYear()} {t.copyright}</span>
            <Link href={`/${locale}/privacy`} className="footer-bottom-link">
              {t.privacyPolicy}
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-cookie-consent'))}
              className="footer-bottom-link"
            >
              {t.cookieSettings}
            </button>
          </div>
          <div className="footer-bottom-brand">EVERGLOW TRAVEL</div>
        </div>
      </div>
    </footer>
  );
}
