'use client';

import { useState } from 'react';
import { assetPath } from '@/lib/utils';

const countryGroups = [
  {
    label: 'เอเชีย',
    items: [
      { name: 'ญี่ปุ่น', flag: 'japan.png' },
      { name: 'เกาหลีใต้', flag: 'SouthKorea.png' },
      { name: 'จีน', flag: 'china.png' },
      { name: 'ไต้หวัน', flag: 'taiwan.png' },
      { name: 'ฮ่องกง', flag: 'HongKong.png' },
      { name: 'สิงคโปร์', flag: 'singapore.png' },
      { name: 'มาเลเซีย', flag: 'Malaysia.png' },
      { name: 'เวียดนาม', flag: 'vietnam.png' },
      { name: 'อินโดนีเซีย', flag: 'indonesia.png' },
      { name: 'มาเก๊า', flag: 'macau.png' },
      { name: 'ลาว', flag: 'laos.png' },
      { name: 'เมียนมา', flag: 'myanmar.png' },
      { name: 'ฟิลิปปินส์', flag: 'philippines.png' },
      { name: 'มองโกเลีย', flag: 'Mongolia.png' },
    ],
  },
  {
    label: 'ยุโรป',
    items: [
      { name: 'ฝรั่งเศส', flag: 'france.png' },
      { name: 'อิตาลี', flag: 'italy.png' },
      { name: 'เยอรมนี', flag: 'germany.png' },
      { name: 'สวิตเซอร์แลนด์', flag: 'switzerland.png' },
      { name: 'ออสเตรีย', flag: 'austria.png' },
      { name: 'สเปน', flag: 'spain.png' },
      { name: 'เนเธอร์แลนด์', flag: 'netherlands.png' },
      { name: 'อังกฤษ', flag: 'uk.png' },
      { name: 'โปรตุเกส', flag: 'portugal.png' },
      { name: 'กรีซ', flag: 'greece.png' },
      { name: 'เช็ก', flag: 'czech.png' },
      { name: 'ฮังการี', flag: 'hungary.png' },
      { name: 'โปแลนด์', flag: 'poland.png' },
      { name: 'นอร์เวย์', flag: 'norway.png' },
      { name: 'สวีเดน', flag: 'sweden.png' },
      { name: 'เบลเยียม', flag: 'belgium.png' },
      { name: 'ลักเซมเบิร์ก', flag: 'luxembourg.png' },
      { name: 'สโลวาเกีย', flag: 'slovakia.png' },
      { name: 'เดนมาร์ก', flag: 'denmark.png' },
      { name: 'โมร็อกโก', flag: 'morocco.png' },
    ],
  },
  {
    label: 'อื่นๆ',
    items: [
      { name: 'อเมริกา', flag: 'usa.png' },
      { name: 'แคนาดา', flag: 'canada.png' },
      { name: 'เม็กซิโก', flag: 'mexico.png' },
      { name: 'ดูไบ', flag: 'dubai.png' },
      { name: 'อียิปต์', flag: 'egypt.png' },
      { name: 'ตุรกี', flag: 'turkey.png' },
      { name: 'ออสเตรเลีย', flag: 'australia.png' },
      { name: 'นิวซีแลนด์', flag: 'newzealand.png' },
      { name: 'อินเดีย', flag: 'india.png' },
      { name: 'ศรีลังกา', flag: 'srilanka.gif' },
      { name: 'เนปาล', flag: 'nepal.png' },
      { name: 'ภูฏาน', flag: 'Bhutan.png' },
      { name: 'มัลดีฟส์', flag: 'maldives.png' },
      { name: 'กาตาร์', flag: 'qatar.png' },
      { name: 'เปรู', flag: 'peru.png' },
      { name: 'จอร์เจีย', flag: 'georgia.png' },
      { name: 'อาร์เจนตินา', flag: 'argentina.png' },
    ],
  },
];

export default function Header({ locale, onNavigate, onShowDomestic, onShowOutbound }) {
  const [lang, setLang] = useState('en');

  const text = locale === 'th' ? {
    company: 'Everglow Global Co., Ltd.',
    license: 'ใบอนุญาตเลขที่ 11/13400',
    brand: 'Everglow Travel',
    home: 'หน้าแรก',
    domestic: 'ทัวร์ในประเทศ',
    outbound: 'ทัวร์ต่างประเทศ',
    about: 'เกี่ยวกับเรา',
    contact: 'ติดต่อ',
    reviews: 'รีวิว',
    durations: ['1 วัน', '2 วัน 1 คืน', '3 วัน 2 คืน', '4 วัน 3 คืน', '5 วัน 4 คืน'],
  } : {
    company: 'Everglow Global Co., Ltd.',
    license: 'License Number 11/13400',
    brand: 'Everglow Travel',
    home: 'Home',
    domestic: 'Thailand Tours',
    outbound: 'Outbound Tours',
    about: 'About Us',
    contact: 'Contact',
    reviews: 'Reviews',
    durations: ['1 day', '2 days 1 night', '3 days 2 night', '4 days 3 night', '5 days 4 night'],
  };

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
          <a href="tel:+66996326146"><img src={assetPath('assets/images/phone.png')} alt="phone" /></a>
          <a href="https://lin.ee/xXcNI1w"><img src={assetPath('assets/images/LINE.png')} alt="line" /></a>
          <a href="https://www.facebook.com/people/Everglow-Travel/61580670863894/" target="_blank" rel="noopener noreferrer">
            <img src={assetPath('assets/images/facebook.png')} alt="fb" />
          </a>
          <a href="https://www.instagram.com/everglow_travel?igsh=MWJ0NnM2anIwYWV1Mw==" target="_blank" rel="noopener noreferrer">
            <img src={assetPath('assets/images/ig.png')} alt="ig" />
          </a>
          <a href="https://wa.me/66996326146" target="_blank" rel="noopener noreferrer">
            <img src={assetPath('assets/images/whatsapp.webp')} alt="wa" />
          </a>
          <a href="https://www.tiktok.com/@everglow.travel" target="_blank" rel="noopener noreferrer">
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
                {countryGroups.map((group, gi) => (
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
                {['1 day', '2 days 1 night', '3 days 2 night', '4 days 3 night'].map((d, i) => (
                  <li key={i}><a onClick={() => onShowDomestic(d)}>{d}</a></li>
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
