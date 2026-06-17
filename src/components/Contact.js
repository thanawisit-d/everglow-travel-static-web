import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import config from '@/data/site-config.json';

export default function Contact({ locale }) {
  const t = config[locale];
  return (
    <section className="page contact-page">
      <div className="overlay">
        <div className="contact-card">
          <h2>{t.contactTitle}</h2>
          <a href={`tel:${config.social.phone}`} className="item" style={{ textDecoration: 'none' }}>
            <Image src={assetPath('icons/phone-call.png')} width={48} height={48} alt="โทรศัพท์" />
            <div>
              <p className="title">{t.phoneLabel}</p>
              <p className="text">{t.phone}</p>
            </div>
          </a>
          <a href={`mailto:${config.social.email}`} className="item" style={{ textDecoration: 'none' }}>
            <Image src={assetPath('icons/email.png')} width={48} height={48} alt="อีเมล" />
            <div>
              <p className="title">{t.emailLabel}</p>
              <p className="text">{t.email}</p>
            </div>
          </a>
          <div className="item">
            <Image src={assetPath('icons/time.png')} width={48} height={48} alt="เวลาทำการ" />
            <div>
              <p className="title">{t.hoursLabel}</p>
              <p className="text">{t.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}