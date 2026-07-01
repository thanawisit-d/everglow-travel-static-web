import Image from 'next/image';
import { assetPath } from '@/lib/assets';

export default function About({ locale, standalone }) {
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
      { title: 'CUSTOMIZED TOURS', desc: 'ทัวร์ส่วนตัวออกแบบได้ออกแบบแพ็กเกจทัวร์แบบ PRIVATE GROUP ที่สามารถปรับแต่งโปรแกรมได้ตามงบประมาณและความต้องการเฉพาะของลูกค้า' },
      { title: 'ONE-STOP SERVICE', desc: 'บริการครบวงจรดูแลและบริหารจัดการแบบครอบคลุมทั้ง ที่พัก รถรับส่ง บริการจองตั๋วเครื่องบิน, รถไฟ, รถโดยสาร, เรือโดยสาร, รถรับส่งสนามบิน, บริการยื่นขอวีซ่า, และกิจกรรมต่างๆ เพื่อให้ทุกการเดินทางสะดวกสบายและสมบูรณ์แบบที่สุด' },
      { title: 'CORPORATE & INCENTIVE', desc: 'ทัวร์องค์กร บริการจัดกรุ๊ปเหมา OUTING, การจัดสัมมนา, จัดประชุม, EVENT TEAM BUILDING, ศึกษาดูงาน, ทัศนศึกษา, และการท่องเที่ยวประจำปีสำหรับองค์กรหรือหน่วยงาน ด้วยมาตรฐานการดูแลระดับมืออาชีพ' },
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
      { title: 'CUSTOMIZED TOURS', desc: 'Private group tours with customizable itineraries tailored to your budget and specific needs.' },
      { title: 'ONE-STOP SERVICE', desc: 'Comprehensive travel management including accommodation, transfers, flight/train/bus/ferry bookings, visa assistance, and activities for a seamless travel experience.' },
      { title: 'CORPORATE & INCENTIVE', desc: 'Corporate outing, seminar, meeting, event team building, study tours, and annual company trips with professional service standards.' },
    ],
  };

  return (
    <section className="page about-page">
      <div className="about-card">
        <div className="about-container">
          <div className="about-img">
            <Image src={assetPath('company/companydetail.jpg')} fill sizes="(max-width: 992px) 100vw, 420px" alt="Everglow Travel" />
          </div>
          <div className="about-text">
            {standalone ? <h1>{t.title}</h1> : <h2>{t.title}</h2>}
            <h2>{t.company}</h2>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>
        </div>
        <div className="about-main">
          {t.services.map((s, i) => (
            <div className="section-box" key={i}>
              <div className="section-title">{s.title}</div>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}