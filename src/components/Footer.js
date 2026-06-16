import { assetPath } from '@/lib/utils';

export default function Footer({ locale }) {
  const t = locale === 'th' ? {
    company: 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
    license: 'ใบอนุญาตเลขที่ 11/13400',
    addr: 'กรุงเทพมหานคร ประเทศไทย',
    contactTitle: 'ช่องทางการติดต่อ',
    hours: 'จันทร์–ศุกร์ : 09.00–18.00 น.',
    phone: '099-632-6146',
    fb: 'Facebook : Everglow Travel',
    line: 'Line : @Everglowtravel',
    follow: 'ติดตามเรา',
  } : {
    company: 'Everglow Global Co., Ltd.',
    license: 'License No. 11/13400',
    addr: 'Bangkok, Thailand',
    contactTitle: 'Contact Us',
    hours: 'Mon–Fri : 09.00–18.00',
    phone: '099-632-6146',
    fb: 'Facebook : Everglow Travel',
    line: 'Line : @Everglowtravel',
    follow: 'Follow Us',
  };

  return (
    <footer className="site-footer">
      <div className="footer-wave"></div>
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <img src={assetPath('assets/images/whitelogo.png')} className="footer-logo" alt="" />
          <div className="footer-company">{t.company}</div>
          <div className="footer-license">
            {t.license}<br />
            {t.addr}
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
            <a href="https://www.facebook.com/people/Everglow-Travel/61580670863894/" target="_blank" rel="noopener noreferrer">
              <img src={assetPath('assets/images/Facebook.png')} alt="fb" />
            </a>
            <a href="https://www.instagram.com/everglow_travel" target="_blank" rel="noopener noreferrer">
              <img src={assetPath('assets/images/ig.png')} alt="ig" />
            </a>
            <a href="https://www.tiktok.com/@everglow.travel" target="_blank" rel="noopener noreferrer">
              <img src={assetPath('assets/images/tiktok.webp')} alt="tiktok" />
            </a>
            <a href="https://lin.ee/xXcNI1w" target="_blank" rel="noopener noreferrer">
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
