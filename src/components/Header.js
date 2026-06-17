'use client';

import { useState } from 'react';
import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Header({ locale, onNavigate, onShowDomestic, onShowOutbound }) {
  const [lang, setLang] = useState('en');
  const text = config[locale];
  const s = config.social;

  return (
    <div className="header-sticky">
      <div className="topbar">
        <div className="left" style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>
          <Image src={assetPath('assets/images/Logo.jpg')} width={50} height={50} className="logo" alt="Everglow Travel" />
          <div className="company">
            <h3>{text.company}</h3>
            <p>{text.license}</p>
          </div>
        </div>
        <div className="right contact-icons">
          <a href={`tel:${s.phone}`}><Image src={assetPath('assets/images/phone.png')} width={42} height={42} alt="โทร" /></a>
          <a href={s.line}><Image src={assetPath('assets/images/LINE.png')} width={42} height={42} alt="LINE" /></a>
          <a href={s.facebook} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/facebook.png')} width={42} height={42} alt="Facebook" />
          </a>
          <a href={s.instagram} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/ig.png')} width={42} height={42} alt="Instagram" />
          </a>
          <a href={s.whatsapp} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/whatsapp.webp')} width={42} height={42} alt="WhatsApp" />
          </a>
          <a href={s.tiktok} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/tiktok.png')} width={42} height={42} alt="TikTok" />
          </a>
        </div>
      </div>

      <nav>
        <h2>{text.brand}</h2>
        <ul>
          <li><button type="button" onClick={() => onNavigate('home')}>{text.home}</button></li>
          <li className="dropdown">
            <button type="button">{text.domestic} ▾</button>
            <ul className="dropdown-menu">
              {text.durations.map((d, i) => (
                <li key={i}><button type="button" onClick={() => onShowDomestic(d)}>{d}</button></li>
              ))}
            </ul>
          </li>
          {locale === 'th' ? (
            <li className="dropdown">
              <button type="button" onClick={() => onNavigate('outbound')}>{text.outbound} ▾</button>
              <ul className="country-menu">
                {config.countryGroups.map((group, gi) => (
                  <div className="col" key={gi}>
                    {group.items.map((c, ci) => (
                      <li key={ci}>
                        <button type="button" onClick={() => onShowOutbound(c.name)}>
                          <Image src={assetPath(`flag_country/${c.flag}`)} width={26} height={26} alt={c.name} />
                          ทัวร์{c.name}
                        </button>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </li>
          ) : (
            <li className="dropdown">
              <button type="button" onClick={() => onNavigate('outbound')}>{text.outbound} ▾</button>
              <ul className="dropdown-menu">
                {config.enCountries.map((c, i) => (
                  <li key={i}><button type="button" onClick={() => onShowOutbound(c)}>{c}</button></li>
                ))}
              </ul>
            </li>
          )}
          <li><button type="button" onClick={() => onNavigate('about')}>{text.about}</button></li>
          <li><button type="button" onClick={() => onNavigate('contact')}>{text.contact}</button></li>
          <li><button type="button" onClick={() => onNavigate('reviews')}>{text.reviews}</button></li>
          {locale === 'en' && (
            <li>
              <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
                <option value="en">🇬🇧 English</option>
                <option value="zh">🇨🇳 中文</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
              </select>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}