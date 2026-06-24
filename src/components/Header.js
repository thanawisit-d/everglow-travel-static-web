'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Header({ locale }) {
  const router = useRouter();
  const isEn = locale === 'en';
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const nav = useCallback((path) => {
    router.push(path);
    closeMenu();
  }, [router]);

  const text = config[locale];
  const s = config.social;

  return (
    <div className="header-sticky">
      <div className="topbar">
        <div className="left" onClick={() => nav(`/${locale}`)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav(`/${locale}`); } }} role="button" tabIndex={0} aria-label="Go to home">
          <Image src={assetPath('assets/images/Logo.jpg')} width={50} height={50} className="logo" alt="Everglow Travel" />
          <div className="company">
            <h3>{text.company}</h3>
            <p>{text.license}</p>
          </div>
        </div>
        <div className="right contact-icons">
          <a href={`tel:${s.phone}`} aria-label="โทรศัพท์"><Image src={assetPath('assets/images/phone.png')} width={36} height={36} alt="" /></a>
          <a href={s.line} aria-label="LINE"><Image src={assetPath('assets/images/LINE.png')} width={36} height={36} alt="" /></a>
          <a href={s.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image src={assetPath('assets/images/Facebook.png')} width={36} height={36} alt="" />
          </a>
          <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src={assetPath('assets/images/ig.png')} width={36} height={36} alt="" />
          </a>
          <a href={s.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Image src={assetPath('assets/images/whatsapp.webp')} width={36} height={36} alt="" />
          </a>
          <a href={s.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <Image src={assetPath('assets/images/tiktok.png')} width={36} height={36} alt="" />
          </a>
        </div>
      </div>

      <nav aria-label="Main navigation">
        <h2>{text.brand}</h2>
        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={menuOpen ? 'nav-open' : ''} role="menubar">
          <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}`)}>{text.home}</button></li>
          <li className={`dropdown ${openDropdown === 'domestic' ? 'open' : ''}`} role="none">
            <button type="button" role="menuitem" aria-haspopup="true" aria-expanded={openDropdown === 'domestic'} onClick={(e) => {
              if (window.innerWidth > 992) { nav(`/${locale}/domestic`); }
              else { e.stopPropagation(); toggleDropdown('domestic'); }
            }} onKeyDown={(e) => { if (e.key === 'Escape') { setOpenDropdown(null); } }}>{text.domestic}</button>
            <button className="dropdown-arrow" onClick={() => toggleDropdown('domestic')} onKeyDown={(e) => { if (e.key === 'Escape') { setOpenDropdown(null); } }} aria-label="Open submenu">▾</button>
            <ul className="dropdown-menu" role="menu">
              <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/domestic`)}>{isEn ? 'All Domestic Tours' : 'ทัวร์ในประเทศทั้งหมด'}</button></li>
              {text.durations.map((d, i) => (
                <li key={i} role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/domestic?duration=${encodeURIComponent(d)}`)}>{d}</button></li>
              ))}
            </ul>
          </li>
          {locale === 'th' ? (
            <li className={`dropdown ${openDropdown === 'outbound' ? 'open' : ''}`} role="none">
              <button type="button" role="menuitem" aria-haspopup="true" aria-expanded={openDropdown === 'outbound'} onClick={(e) => {
                if (window.innerWidth > 992) { nav(`/${locale}/outbound`); }
                else { e.stopPropagation(); toggleDropdown('outbound'); }
              }} onKeyDown={(e) => { if (e.key === 'Escape') { setOpenDropdown(null); } }}>{text.outbound}</button>
              <button className="dropdown-arrow" onClick={() => toggleDropdown('outbound')} onKeyDown={(e) => { if (e.key === 'Escape') { setOpenDropdown(null); } }} aria-label="Open submenu">▾</button>
              <ul className="country-menu" role="menu">
                <li role="none" className="col-all">
                  <button type="button" role="menuitem" onClick={() => nav(`/${locale}/outbound`)}>
                    ทัวร์ต่างประเทศทั้งหมด
                  </button>
                </li>
                {config.countryGroups.map((group, gi) => (
                  <li key={gi} role="none" className="col">
                    <span className="col-header">{group.label}</span>
                    <ul className="col-list">
                      {group.items.map((c, ci) => (
                        <li key={ci} role="none">
                          <button type="button" role="menuitem" onClick={() => nav(`/${locale}/outbound?country=${encodeURIComponent(c.name)}`)}>
                            <Image src={assetPath(`flag_country/${c.flag}`)} width={26} height={26} alt={c.name} />
                            ทัวร์{c.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li className={`dropdown ${openDropdown === 'outbound' ? 'open' : ''}`} role="none">
              <button type="button" role="menuitem" aria-haspopup="true" aria-expanded={openDropdown === 'outbound'} onClick={(e) => {
                if (window.innerWidth > 992) { nav(`/${locale}/outbound`); }
                else { e.stopPropagation(); toggleDropdown('outbound'); }
              }} onKeyDown={(e) => { if (e.key === 'Escape') { setOpenDropdown(null); } }}>{text.outbound}</button>
              <button className="dropdown-arrow" onClick={() => toggleDropdown('outbound')} onKeyDown={(e) => { if (e.key === 'Escape') { setOpenDropdown(null); } }} aria-label="Open submenu">▾</button>
              <ul className="dropdown-menu" role="menu">
                <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/outbound`)}>{isEn ? 'All Outbound Tours' : 'ทัวร์ต่างประเทศทั้งหมด'}</button></li>
                {config.enCountries.map((c, i) => (
                  <li key={i} role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/outbound?country=${encodeURIComponent(c)}`)}>{c}</button></li>
                ))}
              </ul>
            </li>
          )}
          <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/about`)}>{text.about}</button></li>
          <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/contact`)}>{text.contact}</button></li>
          <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/reviews`)}>{text.reviews}</button></li>
          {locale === 'en' && (
            <li role="none" className="lang-item">
              <button type="button" className="lang-btn" role="menuitem" onClick={() => router.push('/th')}>
                🇹🇭 ไทย
              </button>
            </li>
          )}
          {locale === 'th' && (
            <li role="none" className="lang-item">
              <button type="button" className="lang-btn" role="menuitem" onClick={() => router.push('/en')}>
                🇬🇧 English
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
