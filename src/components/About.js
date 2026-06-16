import { assetPath } from '@/lib/utils';

export default function About({ locale }) {
  const t = locale === 'th' ? {
    title: 'เกี่ยวกับเรา',
    company: 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
    sub: 'Everglow Travel',
    p1: 'Everglow Travel คือผู้ให้บริการด้านการท่องเที่ยวแบบครบวงจร ที่มุ่งมั่นส่งมอบประสบการณ์การเดินทางเหนือระดับ ทั้งในประเทศและต่างประเทศ',
    p2: 'เราเชี่ยวชาญการจัดกรุ๊ปทัวร์เหมา (Incentive Group) ทริปส่วนตัว และบริการท่องเที่ยวแบบครบจบในที่เดียว',
    services: [
      { title: 'DOMESTIC TOURS', desc: 'ทัวร์ภายในประเทศ ทัวร์คุณภาพสำหรับลูกค้าชาวไทยและต่างชาติ เน้นความคุ้มค่าและราคาที่เหมาะสม มีให้บริการทั้ง ONE DAY TRIP, 2 DAYS 1 NIGHT TRIP, 3 DAYS 2 NIGHTS TRIP, 4 DAYS 3 NIGHTS TRIP และ WEEKEND TRIP' },
      { title: 'INBOUND TOURS', desc: 'ทัวร์อินบาวด์ บริการนำเที่ยวสำหรับนักท่องเที่ยวต่างชาติสู่ประเทศไทย พร้อมทีมไกด์และพนักงานมากประสบการณ์และเชี่ยวชาญด้านภาษา คอยดูแลตลอดการเดินทาง' },
      { title: 'OUTBOUND TOURS', desc: 'ทัวร์ต่างประเทศ บริการนำเที่ยวต่างประเทศสำหรับลูกค้าชาวไทย ครอบคลุมเส้นทางยอดฮิตทั่วโลก มีให้เลือกทั้งรูปแบบแพ็กเกจทัวร์มาตรฐานและกรุ๊ปเหมาส่วนตัว' },
    ],
  } : {
    title: 'About Us',
    company: 'Everglow Global Co., Ltd.',
    sub: 'Everglow Travel',
    p1: 'Everglow Travel is a comprehensive travel service provider committed to delivering exceptional travel experiences both domestically and internationally.',
    p2: 'We specialize in incentive group tours, private trips, and one-stop travel services.',
    services: [
      { title: 'DOMESTIC TOURS', desc: 'Quality domestic tours for Thai and international customers. Available in ONE DAY TRIP, 2 DAYS 1 NIGHT, 3 DAYS 2 NIGHTS, 4 DAYS 3 NIGHTS, and WEEKEND TRIP packages.' },
      { title: 'INBOUND TOURS', desc: 'Inbound tour services for international travelers visiting Thailand, with experienced multilingual guides.' },
      { title: 'OUTBOUND TOURS', desc: 'Outbound tours for Thai customers covering popular destinations worldwide, available in standard package and private group formats.' },
    ],
  };

  return (
    <section className="page about-page">
      <h2>{t.title}</h2>
      <div className="about-container">
        <div className="about-img">
          <img src={assetPath('company/companydetail.jpg')} alt="Everglow Travel" />
        </div>
        <div className="about-text">
          <h1>{t.company}</h1>
          <h2>{t.sub}</h2>
          <p>{t.p1}</p>
          <p>{t.p2}</p>
        </div>
      </div>
      <div className="about-container about-main">
        {t.services.map((s, i) => (
          <div className="section-box" key={i}>
            <div className="section-title">{s.title}</div>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
