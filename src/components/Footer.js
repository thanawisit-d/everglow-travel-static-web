import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Footer({ locale }) {
  const t = config[locale];
  const s = config.social;

  return (
    <footer className="site-footer">
      <div className="footer-wave"></div>
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <img src={assetPath('assets/images/whitelogo.png')} className="footer-logo" alt="" />
          <div className="footer-company">{t.company}</div>
          <div className="footer-license">
            {t.license}<br />{t.addr}
          </div>
        </div>
        <div className="footer-col footer-contact">
          <h3>{t.contactTitle}</h3>
          <div className="contact-item">
            <img src={assetPath('icons/clock.png')} alt="" />
            <span>{t.hours}</span>
          </div>
          <div className="contact-item">
            <img src={assetPath('assets/images/phone3.png')} alt="" />
            <span>{t.phone}</span>
          </div>
          <div className="contact-item">
            <img src={assetPath('assets/images/Facebook.png')} alt="" />
            <span>{t.fb}</span>
          </div>
          <div className="contact-item">
            <img src={assetPath('assets/images/LINE.png')} alt="" />
            <span>{t.line}</span>
          </div>
        </div>
        <div className="footer-col qr-box">
          <h3>{t.follow}</h3>
          <img src={assetPath('assets/images/qr.png')} className="qr-img" alt="" />
          <div className="line-id">@Everglowtravel</div>
          <div className="social-row">
            <a href={s.facebook} target="_blank" rel="noopener noreferrer">
              <img src={assetPath('assets/images/Facebook.png')} alt="fb" />
            </a>
            <a href={s.instagram} target="_blank" rel="noopener noreferrer">
              <img src={assetPath('assets/images/ig.png')} alt="ig" />
            </a>
            <a href={s.tiktok} target="_blank" rel="noopener noreferrer">
              <img src={assetPath('assets/images/tiktok.webp')} alt="tiktok" />
            </a>
            <a href={s.line} target="_blank" rel="noopener noreferrer">
              <img src={assetPath('assets/images/LINE.png')} alt="line" />
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
