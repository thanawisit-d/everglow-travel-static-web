import { assetPath } from '@/lib/utils';

export default function Contact({ locale }) {
  const t = locale === 'th' ? {
    title: 'ติดต่อเรา',
    name: 'ชื่อ-สกุล',
    phone: 'เบอร์โทรศัพท์',
    email: 'อีเมล',
    line: 'LINE ID',
    msg: 'ข้อความ',
    send: 'ส่งข้อความ',
    info: 'ข้อมูลติดต่อ',
    address: 'ที่อยู่',
    addr: '144/25-26 ถ.ปุณณกัณฑ์ ต.ป่าแดด อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50100',
  } : {
    title: 'Contact Us',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    line: 'LINE ID',
    msg: 'Message',
    send: 'Send Message',
    info: 'Contact Info',
    address: 'Address',
    addr: '144/25-26 Punnakarn Rd., Pa Daed, Muang, Chiang Mai 50100',
  };

  return (
    <section className="page contact-page">
      <h2>{t.title}</h2>
      <div className="contact-content">
        <div className="contact-form">
          <input type="text" placeholder={t.name} />
          <input type="text" placeholder={t.phone} />
          <input type="email" placeholder={t.email} />
          <input type="text" placeholder={t.line} />
          <textarea placeholder={t.msg} rows={5} />
          <button>{t.send}</button>
        </div>
        <div className="contact-info">
          <h3>{t.info}</h3>
          <p><strong>{t.address}:</strong></p>
          <p>{t.addr}</p>
          <div className="contact-icons">
            <a href="tel:+66996326146"><img src={assetPath('assets/images/phone2 (1).png')} alt="" /> 099-632-6146</a>
            <a href="https://lin.ee/xXcNI1w"><img src={assetPath('assets/images/LINE.png')} alt="" /> @everglow</a>
            <a href="https://www.facebook.com/people/Everglow-Travel/61580670863894/"><img src={assetPath('assets/images/facebook.png')} alt="" /> Everglow Travel</a>
            <a href="https://www.instagram.com/everglow_travel"><img src={assetPath('assets/images/ig.png')} alt="" /> @everglow_travel</a>
          </div>
        </div>
      </div>
    </section>
  );
}
