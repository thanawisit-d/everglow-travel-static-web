'use client';

import { useState } from 'react';
import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Header({ locale, onNavigate, onShowDomestic, onShowOutbound }) {
  const [lang, setLang] = useState('en');
  const text = config[locale];
  const s = config.social;

  return (
    <>
      <div className="topbar">
        <div className="left">
          <img src={assetPath('assets/images/Logo.jpg')} className="logo" alt="logo" />
          <div className="company">
            <h3>{text.company}</h3>
            <p>{text.license}</p>
          </div>
        </div>
        <div className="right contact-icons">
          <a href={`tel:${s.phone}`}><img src={assetPath('assets/images/phone.png')} alt="phone" /></a>
          <a href={s.line}><img src={assetPath('assets/images/LINE.png')} alt="line" /></a>
          <a href={s.facebook} target="_blank" rel="noopener noreferrer">
            <img src={assetPath('assets/images/facebook.png')} alt="fb" />
          </a>
          <a href={s.instagram} target="_blank" rel="noopener noreferrer">
            <img src={assetPath('assets/images/ig.png')} alt="ig" />
          </a>
          <a href={s.whatsapp} target="_blank" rel="noopener noreferrer">
            <img src={assetPath('assets/images/whatsapp.webp')} alt="wa" />
          </a>
          <a href={s.tiktok} target="_blank" rel="noopener noreferrer">
            <img src={assetPath('assets/images/tiktok.png')} alt="tiktok" />
          </a>
        </div>
      </div>

      <nav>
        <h2>{text.brand}</h2>
        <ul>
          <li><a onClick={() => onNavigate('home')}>{text.home}</a></li>
          <li className="dropdown">
            <a>{text.domestic} ▾</a>
            <ul className="dropdown-menu">
              {text.durations.map((d, i) => (
                <li key={i}><a onClick={() => onShowDomestic(d)}>{d}</a></li>
              ))}
            </ul>
          </li>
          {locale === 'th' ? (
            <li className="dropdown">
              <a onClick={() => onNavigate('outbound')}>{text.outbound} ▾</a>
              <ul className="country-menu">
                {config.countryGroups.map((group, gi) => (
                  <div className="col" key={gi}>
                    {group.items.map((c, ci) => (
                      <li key={ci}>
                        <a onClick={() => onShowOutbound(c.name)}>
                          <img src={assetPath(`flag_country/${c.flag}`)} alt={c.name} />
                          ทัวร์{c.name}
                        </a>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </li>
          ) : (
            <li className="dropdown">
              <a onClick={() => onNavigate('outbound')}>{text.outbound} ▾</a>
              <ul className="dropdown-menu">
                {config.enCountries.map((c, i) => (
                  <li key={i}><a onClick={() => onShowOutbound(c)}>{c}</a></li>
                ))}
              </ul>
            </li>
          )}
          <li><a onClick={() => onNavigate('about')}>{text.about}</a></li>
          <li><a onClick={() => onNavigate('contact')}>{text.contact}</a></li>
          <li><a onClick={() => onNavigate('reviews')}>{text.reviews}</a></li>
          {locale === 'en' && (
            <li>
              <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">🇬🇧 English</option>
                <option value="zh">🇨🇳 中文</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
              </select>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
