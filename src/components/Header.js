'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import { translateCountry, provinceNameMap } from '@/lib/i18n';
import config from '@/data/site-config.json';

const HOVER_DELAY = 150;

export default function Header({ locale }) {
  const router = useRouter();
  const isEn = locale === 'en';
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeDomesticGroup, setActiveDomesticGroup] = useState(null);
  const [shrunk, setShrunk] = useState(false);
  const closeTimer = useRef(null);
  const menuRef = useRef(null);
  const hoverOpenedAt = useRef(0);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = (name) => {
    clearTimer();
    setOpenDropdown(name);
    hoverOpenedAt.current = Date.now();
    if (name === 'outbound' && !activeGroup) {
      setActiveGroup(config.countryGroups[0].label);
    }
    if (name === 'domestic' && !activeDomesticGroup) {
      setActiveDomesticGroup(config.domesticGroups[0].label);
    }
  };

  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setActiveGroup(null);
      setActiveDomesticGroup(null);
    }, HOVER_DELAY);
  };

  const toggleDropdown = (name) => {
    clearTimer();
    const now = Date.now();
    if (hoverOpenedAt.current > 0 && now - hoverOpenedAt.current < 500 && openDropdown === name) {
      hoverOpenedAt.current = 0;
      return;
    }
    hoverOpenedAt.current = 0;
    setOpenDropdown(openDropdown === name ? null : name);
    if (name === 'outbound' && openDropdown !== 'outbound' && !activeGroup) {
      setActiveGroup(config.countryGroups[0].label);
    }
    if (name === 'domestic' && openDropdown !== 'domestic' && !activeDomesticGroup) {
      setActiveDomesticGroup(config.domesticGroups[0].label);
    }
  };

  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setActiveGroup(null);
        setActiveDomesticGroup(null);
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setActiveGroup(null);
        setActiveDomesticGroup(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden auto' : 'hidden auto';
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const first = menuRef.current?.querySelector('[data-first-focus]');
    if (first) setTimeout(() => first.focus(), 50);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 150);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setActiveGroup(null);
    setActiveDomesticGroup(null);
  };

  const nav = useCallback((path) => {
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(path);
    }
    closeMenu();
  }, [router, closeMenu]);

  const text = config[locale] || config.th;
  const s = config.social;
  const activeGroupData = config.countryGroups.find(g => g.label === activeGroup);
  const activeDomesticGroupData = config.domesticGroups.find(g => g.label === activeDomesticGroup);

  return (
    <div className={`header-sticky${shrunk ? ' shrunk' : ''}`}>
      <div className="topbar">
        <div className="left" onClick={() => nav(`/${locale}`)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav(`/${locale}`); } }} role="button" tabIndex={0} aria-label="Go to home">
          <Image src={assetPath('assets/images/logos/Logo.jpg')} width={50} height={50} className="logo" alt="Everglow Travel" />
          <div className="company">
            <h3>{text.company}</h3>
            <p>{text.license}</p>
          </div>
        </div>
        <div className="right contact-icons">
          <a href={`tel:${s.phone}`} aria-label={isEn ? 'Phone' : 'โทรศัพท์'}><Image src={assetPath('assets/images/icons/phone.png')} width={36} height={36} alt="" /></a>
          <a href={s.line} aria-label="LINE"><Image src={assetPath('assets/images/social/LINE.png')} width={36} height={36} alt="" /></a>
          <a href={s.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image src={assetPath('assets/images/social/Facebook.png')} width={36} height={36} alt="" />
          </a>
          <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src={assetPath('assets/images/social/ig.png')} width={36} height={36} alt="" />
          </a>
          <a href={s.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Image src={assetPath('assets/images/social/whatsapp.webp')} width={36} height={36} alt="" />
          </a>
          <a href={s.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <Image src={assetPath('assets/images/social/tiktok.webp')} width={36} height={36} alt="" />
          </a>
        </div>
      </div>

      <nav aria-label="Main navigation">
        <div className="nav-group">
          <div
            className="logo-in-nav"
            onClick={() => nav(`/${locale}`)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav(`/${locale}`); } }}
            role="button"
            tabIndex={0}
            aria-label="Go to home"
          >
            <Image src={assetPath('assets/images/logos/Logo.jpg')} width={36} height={36} alt="" priority />
          </div>
          <h2>{text.brand}</h2>
        </div>
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
        <ul ref={menuRef} className={menuOpen ? 'nav-open' : ''} role="menubar">
          <li role="none"><button type="button" role="menuitem" data-first-focus onClick={() => nav(`/${locale}`)}>{text.home}</button></li>
          <li className={`dropdown dropdown-outbound ${openDropdown === 'domestic' ? 'open' : ''}`} role="none" onMouseEnter={() => { if (window.innerWidth > 768) openMenu('domestic'); }} onMouseLeave={() => { if (window.innerWidth > 768) scheduleClose(); }}>
            <button type="button" role="menuitem" aria-haspopup="true" aria-expanded={openDropdown === 'domestic'} onClick={(e) => {
              if (window.innerWidth > 768) { nav(`/${locale}/domestic`); }
              else { e.stopPropagation(); toggleDropdown('domestic'); }
            }}>{text.domestic}</button>
            <button className="dropdown-arrow" onClick={(e) => { e.stopPropagation(); toggleDropdown('domestic'); }} aria-label="Open submenu">▾</button>
            <div className="mega-menu" role="menu">
              <div className="mega-menu-inner">
                <div className="mega-left">
                  {config.domesticGroups.map((group) => (
                    <button
                      key={group.label}
                      type="button"
                      role="menuitem"
                      onMouseEnter={() => setActiveDomesticGroup(group.label)}
                      onFocus={() => setActiveDomesticGroup(group.label)}
                      className={activeDomesticGroup === group.label ? 'active' : ''}
                      onClick={() => nav(`/${locale}/domestic?province=${encodeURIComponent(group.items[0].province)}`)}
                    >
                      {isEn ? group.labelEn : group.label}
                    </button>
                  ))}
                </div>
                <div className="mega-right">
                  {activeDomesticGroupData && (
                    <>
                      <h3>{isEn ? activeDomesticGroupData.labelEn : activeDomesticGroupData.label}</h3>
                      <div className="mega-grid">
                        {activeDomesticGroupData.items.map((item) => (
                          <button key={item.name} type="button" role="menuitem" onClick={() => nav(`/${locale}/domestic?province=${encodeURIComponent(item.province)}`)}>
                            {isEn ? (provinceNameMap[item.name] || item.name) : item.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </li>
          {/* Outbound Tours — ซ่อนใน EN ตาม requirement */}
          {!isEn && (
          <li className={`dropdown dropdown-outbound ${openDropdown === 'outbound' ? 'open' : ''}`} role="none" onMouseEnter={() => { if (window.innerWidth > 768) openMenu('outbound'); }} onMouseLeave={() => { if (window.innerWidth > 768) scheduleClose(); }}>
            <button type="button" role="menuitem" aria-haspopup="true" aria-expanded={openDropdown === 'outbound'} onClick={(e) => {
              if (window.innerWidth > 768) { nav(`/${locale}/outbound`); }
              else { e.stopPropagation(); toggleDropdown('outbound'); }
            }}>{text.outbound}</button>
            <button className="dropdown-arrow" onClick={(e) => { e.stopPropagation(); toggleDropdown('outbound'); }} aria-label="Open submenu">▾</button>
            <div className="mega-menu" role="menu">
              <div className="mega-menu-inner">
                <div className="mega-left">
                  {config.countryGroups.map((group) => (
                    <button
                      key={group.label}
                      type="button"
                      role="menuitem"
                      onMouseEnter={() => setActiveGroup(group.label)}
                      onFocus={() => setActiveGroup(group.label)}
                      className={activeGroup === group.label ? 'active' : ''}
                      onClick={() => nav(`/${locale}/outbound?country=${encodeURIComponent(group.items[0].name)}`)}
                    >
                      {isEn ? group.labelEn : group.label}
                    </button>
                  ))}
                </div>
                <div className="mega-right">
                  {activeGroupData && (
                    <>
                      <h3>{isEn ? activeGroupData.labelEn : activeGroupData.label}</h3>
                      <div className="mega-grid">
                        {activeGroupData.items.map((c) => (
                          <button key={c.name} type="button" role="menuitem" onClick={() => nav(`/${locale}/outbound?country=${encodeURIComponent(c.name)}`)}>
                            <Image src={assetPath(`flag_country/${c.flag}`)} width={26} height={26} alt={isEn ? translateCountry(c.name) : c.name} />
                            {isEn ? `${translateCountry(c.name)} Tours` : `ทัวร์${c.name}`}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </li>
          )}
          <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/about`)}>{text.about}</button></li>
          <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/contact`)}>{text.contact}</button></li>
          <li role="none"><button type="button" role="menuitem" onClick={() => nav(`/${locale}/reviews`)}>{text.reviews}</button></li>
          {/* lang-toggle — ซ่อนทั้ง TH/EN ตาม requirement */}
          {/* <li role="none" className="lang-item">
            <div className="lang-toggle" role="group" aria-label="Language switch">
              <span
                className="lang-thumb"
                style={{ transform: locale === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
                aria-hidden="true"
              />
              <button
                type="button"
                className={`lang-opt${locale === 'th' ? ' lang-opt--active' : ''}`}
                onClick={() => router.push('/th')}
                aria-pressed={locale === 'th'}
              >
                TH
              </button>
              <button
                type="button"
                className={`lang-opt${locale === 'en' ? ' lang-opt--active' : ''}`}
                onClick={() => router.push('/en')}
                aria-pressed={locale === 'en'}
              >
                EN
              </button>
            </div>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
