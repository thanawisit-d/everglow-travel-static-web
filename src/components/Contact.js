import { assetPath } from '@/lib/utils';

export default function Contact({ locale }) {
  const t = locale === 'th' ? {
    title: 'ติดต่อ',
    phone: '099-632-6146',
    email: 'everglowtravel@gmail.com',
    hours: 'จันทร์ - ศุกร์ 9:00 - 18:00 น.',
    phoneLabel: 'เบอร์ติดต่อ',
    emailLabel: 'Email',
    hoursLabel: 'วันเวลาเปิดทำการ',
  } : {
    title: 'Contact',
    phone: '099-632-6146',
    email: 'everglowtravel@gmail.com',
    hours: 'Mon - Fri 9:00 - 18:00',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    hoursLabel: 'Business Hours',
  };

  return (
    <section className="page contact-page">
      <div className="overlay">
        <div className="contact-card">
          <h2>{t.title}</h2>
          <a href="tel:0996326146" className="item" style={{ textDecoration: 'none' }}>
            <img src={assetPath('icons/phone-call.png')} alt="" />
            <div>
              <p className="title">{t.phoneLabel}</p>
              <p className="text">{t.phone}</p>
            </div>
          </a>
          <a href="mailto:everglowtravel@gmail.com" className="item" style={{ textDecoration: 'none' }}>
            <img src={assetPath('icons/email.png')} alt="" />
            <div>
              <p className="title">{t.emailLabel}</p>
              <p className="text">{t.email}</p>
            </div>
          </a>
          <div className="item">
            <img src={assetPath('icons/time.png')} alt="" />
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
