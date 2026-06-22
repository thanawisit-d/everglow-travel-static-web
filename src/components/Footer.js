import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Footer({ locale }) {
  const t = config[locale];
  const s = config.social;

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <Image src={assetPath('assets/images/whitelogo.png')} width={190} height={60} className="footer-logo" alt="Everglow Travel" />
          <div className="footer-company">
            {t.company.replace(/\s*\(.*?\)/g, '').trim()}
            {t.company.includes('(') && <><br />({t.company.match(/\(([^)]+)\)/)?.[1]})</>}
          </div>
          <div className="footer-license">{t.license}</div>
          <div className="footer-address">
            <span>{t.addr}</span>
          </div>
        </div>
        <div className="footer-col footer-contact">
          <h3>{t.contactTitle}</h3>
          <div className="contact-item">
            <Image src={assetPath('icons/clock.png')} width={24} height={24} alt="เวลาทำการ" />
            <span>{t.hours}</span>
          </div>
          <div className="contact-item">
            <Image src={assetPath('assets/images/phone3.png')} width={24} height={24} alt="โทรศัพท์" />
            <span>{t.phone}</span>
          </div>
          <div className="contact-item">
            <Image src={assetPath('assets/images/Facebook.png')} width={24} height={24} alt="Facebook" />
            <span>{t.fb}</span>
          </div>
          <div className="contact-item">
            <Image src={assetPath('assets/images/LINE.png')} width={24} height={24} alt="LINE" />
            <span>{t.line}</span>
          </div>
        </div>
        <div className="footer-col qr-box">
          <h3>{t.follow}</h3>
          <Image src={assetPath('assets/images/qr.png')} width={180} height={180} className="qr-img" alt="LINE QR Code" />
          <div className="line-id">@Everglowtravel</div>
          <div className="social-row">
            <a href={s.facebook} target="_blank" rel="noopener noreferrer">
              <Image src={assetPath('assets/images/Facebook.png')} width={50} height={50} alt="Facebook" />
            </a>
            <a href={s.instagram} target="_blank" rel="noopener noreferrer">
              <Image src={assetPath('assets/images/ig.png')} width={50} height={50} alt="Instagram" />
            </a>
            <a href={s.tiktok} target="_blank" rel="noopener noreferrer">
              <Image src={assetPath('assets/images/tiktok.webp')} width={50} height={50} alt="TikTok" />
            </a>
            <a href={s.line} target="_blank" rel="noopener noreferrer">
              <Image src={assetPath('assets/images/LINE.png')} width={50} height={50} alt="LINE" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy;2026 Everglow Global Co., Ltd. All rights reserved.
      </div>
    </footer>
  );
}