'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Header({ locale, onNavigate, onShowDomestic, onShowOutbound, onShowAllDomestic, onShowAllOutbound }) {
  const router = useRouter();
  const isEn = locale === 'en';
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };
  const text = config[locale];
  const s = config.social;

  const closeMenu = () => setMenuOpen(false);

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
          <a href={`tel:${s.phone}`}><Image src={assetPath('assets/images/phone.png')} width={36} height={36} alt="โทร" /></a>
          <a href={s.line}><Image src={assetPath('assets/images/LINE.png')} width={36} height={36} alt="LINE" /></a>
          <a href={s.facebook} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/Facebook.png')} width={36} height={36} alt="Facebook" />
          </a>
          <a href={s.instagram} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/ig.png')} width={36} height={36} alt="Instagram" />
          </a>
          <a href={s.whatsapp} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/whatsapp.webp')} width={36} height={36} alt="WhatsApp" />
          </a>
          <a href={s.tiktok} target="_blank" rel="noopener noreferrer">
            <Image src={assetPath('assets/images/tiktok.png')} width={36} height={36} alt="TikTok" />
          </a>
        </div>
      </div>

      <nav>
        <h2>{text.brand}</h2>
        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={menuOpen ? 'nav-open' : ''}>
          <li><button type="button" onClick={() => { onNavigate('home'); closeMenu(); }}>{text.home}</button></li>
          <li className={`dropdown ${openDropdown === 'domestic' ? 'open' : ''}`}>
            <button type="button" onClick={(e) => {
              if (window.innerWidth > 992) { onShowAllDomestic(); closeMenu(); }
              else { e.stopPropagation(); toggleDropdown('domestic'); }
            }}>{text.domestic}</button>
            <button className="dropdown-arrow" onClick={() => toggleDropdown('domestic')} aria-label="Open submenu">▾</button>
            <ul className="dropdown-menu">
              <li><button type="button" onClick={() => { onShowAllDomestic(); closeMenu(); setOpenDropdown(null); }}>{isEn ? 'All Domestic Tours' : 'ทัวร์ในประเทศทั้งหมด'}</button></li>
              {text.durations.map((d, i) => (
                <li key={i}><button type="button" onClick={() => { onShowDomestic(d); closeMenu(); setOpenDropdown(null); }}>{d}</button></li>
              ))}
            </ul>
          </li>
          {locale === 'th' ? (
            <li className={`dropdown ${openDropdown === 'outbound' ? 'open' : ''}`}>
              <button type="button" onClick={(e) => {
                if (window.innerWidth > 992) { onShowAllOutbound(); closeMenu(); }
                else { e.stopPropagation(); toggleDropdown('outbound'); }
              }}>{text.outbound}</button>
              <button className="dropdown-arrow" onClick={() => toggleDropdown('outbound')} aria-label="Open submenu">▾</button>
              <ul className="country-menu">
                <div className="col" key="all">
                  <li>
                    <button type="button" onClick={() => { onShowAllOutbound(); closeMenu(); setOpenDropdown(null); }}>
                      ทัวร์ต่างประเทศทั้งหมด
                    </button>
                  </li>
                </div>
                {config.countryGroups.map((group, gi) => (
                  <div className="col" key={gi}>
                    <h4>{group.label}</h4>
                    {group.items.map((c, ci) => (
                      <li key={ci}>
                        <button type="button" onClick={() => { onShowOutbound(c.name); closeMenu(); setOpenDropdown(null); }}>
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
            <li className={`dropdown ${openDropdown === 'outbound' ? 'open' : ''}`}>
              <button type="button" onClick={(e) => {
                if (window.innerWidth > 992) { onShowAllOutbound(); closeMenu(); }
                else { e.stopPropagation(); toggleDropdown('outbound'); }
              }}>{text.outbound}</button>
              <button className="dropdown-arrow" onClick={() => toggleDropdown('outbound')} aria-label="Open submenu">▾</button>
              <ul className="dropdown-menu">
                <li><button type="button" onClick={() => { onShowAllOutbound(); closeMenu(); setOpenDropdown(null); }}>{isEn ? 'All Outbound Tours' : 'ทัวร์ต่างประเทศทั้งหมด'}</button></li>
                {config.enCountries.map((c, i) => (
                  <li key={i}><button type="button" onClick={() => { onShowOutbound(c); closeMenu(); setOpenDropdown(null); }}>{c}</button></li>
                ))}
              </ul>
            </li>
          )}
          <li><button type="button" onClick={() => { onNavigate('about'); closeMenu(); }}>{text.about}</button></li>
          
          <li><button type="button" onClick={() => { onNavigate('contact'); closeMenu(); }}>{text.contact}</button></li>
          <li><button type="button" onClick={() => { onNavigate('reviews'); closeMenu(); }}>{text.reviews}</button></li>
          {locale === 'en' && (
            <li className="lang-item">
              <button type="button" className="lang-btn" onClick={() => router.push('/')}>
                🇹🇭 ไทย
              </button>
            </li>
          )}
          {locale === 'th' && (
            <li className="lang-item">
              <button type="button" className="lang-btn" onClick={() => router.push('/en')}>
                🇬🇧 English
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}