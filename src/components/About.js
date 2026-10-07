import { assetPath } from '@/lib/assets';
import ImageModal from './ImageModal';

export default function About({ locale, standalone }) {
  const isTH = locale === 'th';

  const t = isTH
    ? {
        title: 'เกี่ยวกับเรา',
        company: 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
        sub: 'Everglow Travel',

        intro:
          'Everglow Travel คือผู้ให้บริการด้านการท่องเที่ยวแบบครบวงจร ที่มุ่งมั่นส่งมอบประสบการณ์การเดินทางเหนือระดับ ทั้งในประเทศและต่างประเทศ',

        intro2:
          'เราเชี่ยวชาญการจัดกรุ๊ปทัวร์เหมา (Incentive Group) ทริปส่วนตัว และบริการท่องเที่ยวแบบครบจบในที่เดียว พร้อมดูแลทุกการเดินทางด้วยความใส่ใจและมาตรฐานการบริการที่เชื่อถือได้',

        visionTitle: 'OUR VISION',
        vision:
          'เป็นผู้นำด้านการท่องเที่ยวไทยระดับสากล ผ่านการดูแลทุกการเดินทางด้วยใจ',

        visionText:
          'เราไม่ใช่แค่บริษัททัวร์ แต่เป็น “เพื่อนร่วมทาง” ที่ใส่ใจในทุกรายละเอียด พร้อมส่งมอบบริการและประสบการณ์ที่เหนือความคาดหวัง เพื่อสร้างความทรงจำที่มีคุณค่าในทุกจุดหมายปลายทาง',

        missionTitle: 'OUR MISSION',

        missions: [
          {
            number: '01',
            title: 'ELEVATE THAI TOURISM',
            desc: 'ส่งเสริมภาพลักษณ์ของประเทศไทยในฐานะแหล่งท่องเที่ยวระดับต้นของโลก',
          },
          {
            number: '02',
            title: 'QUALITY EXPERIENCE',
            desc: 'มอบประสบการณ์การท่องเที่ยวไทยที่ดีที่สุด ผ่านบริการที่มีคุณภาพและไกด์ผู้เชี่ยวชาญ',
          },
          {
            number: '03',
            title: 'TRAVELER FIRST',
            desc: 'เข้าใจความต้องการและวัฒนธรรมที่หลากหลาย พร้อมออกแบบกิจกรรมให้เหมาะกับไลฟ์สไตล์ของแต่ละกลุ่มและเจเนอเรชัน',
          },
          {
            number: '04',
            title: 'SUSTAINABLE TOURISM',
            desc: 'ส่งเสริมการท่องเที่ยวอย่างยั่งยืน โดยสนับสนุนธุรกิจท้องถิ่นและการท่องเที่ยวเชิงอนุรักษ์',
          },
          {
            number: '05',
            title: 'AUTHENTIC THAILAND',
            desc: 'นำเสนอประสบการณ์ไทยแท้ ทั้งวัฒนธรรม อาหารท้องถิ่น และสถานที่ท่องเที่ยวที่เป็นเอกลักษณ์',
          },
        ],

        valuesTitle: 'OUR CORE VALUES',

        values: [
          {
            letter: 'R',
            title: 'RELIABILITY',
            thai: 'ความน่าเชื่อถือ',
            desc: 'ดำเนินธุรกิจด้วยความโปร่งใส ซื่อสัตย์ และรักษามาตรฐานความปลอดภัยสูงสุดในทุกเส้นทาง เพื่อสร้างความไว้วางใจให้กับลูกค้า',
          },
          {
            letter: 'A',
            title: 'ATTENTIVENESS',
            thai: 'ความใส่ใจ',
            desc: 'ให้บริการด้วยความเต็มใจและใส่ใจในทุกรายละเอียด พร้อมดูแลและอำนวยความสะดวกให้ลูกค้าดุจคนสำคัญ',
          },
          {
            letter: 'E',
            title: 'EXCEPTIONAL EXPERIENCE',
            thai: 'ประสบการณ์เหนือระดับ',
            desc: 'มุ่งมั่นออกแบบและคัดสรรโปรแกรมการท่องเที่ยวที่คุ้มค่า เพื่อส่งมอบประสบการณ์และความทรงจำที่ดีที่สุดในทุกการเดินทาง',
          },
        ],

        servicesTitle: 'OUR SERVICES',

        services: [
          {
            title: 'DOMESTIC TOURS',
            desc: 'ทัวร์ภายในประเทศสำหรับลูกค้าชาวไทยและต่างชาติ ทั้ง One Day Trip, Weekend Trip และทริปหลายวัน',
          },
          {
            title: 'INBOUND TOURS',
            desc: 'บริการนำเที่ยวสำหรับนักท่องเที่ยวต่างชาติสู่ประเทศไทย พร้อมทีมงานและไกด์ผู้มีประสบการณ์',
          },
          {
            title: 'OUTBOUND TOURS',
            desc: 'บริการนำเที่ยวต่างประเทศสำหรับลูกค้าชาวไทย ครอบคลุมเส้นทางยอดนิยมทั่วโลก',
          },
          {
            title: 'CUSTOMIZED TOURS',
            desc: 'ออกแบบ Private Group และโปรแกรมท่องเที่ยวให้เหมาะกับงบประมาณและความต้องการเฉพาะของลูกค้า',
          },
          {
            title: 'ONE-STOP SERVICE',
            desc: 'ดูแลครบตั้งแต่ที่พัก การเดินทาง ตั๋วเครื่องบิน รถไฟ รถโดยสาร เรือ รถรับส่งสนามบิน วีซ่า และกิจกรรมต่าง ๆ',
          },
          {
            title: 'CORPORATE & INCENTIVE',
            desc: 'รองรับ Outing, Seminar, Meeting, Event, Team Building, Study Tour และ Annual Trip สำหรับองค์กร',
          },
        ],
      }
    : {
        title: 'About Us',
        company: 'Everglow Global Co., Ltd.',
        sub: 'Everglow Travel',

        intro:
          'Everglow Travel is a comprehensive travel service provider committed to delivering exceptional travel experiences across domestic and international destinations.',

        intro2:
          'We specialize in Incentive Groups, private trips, and one-stop travel services, providing thoughtful support and professional care throughout every journey.',

        visionTitle: 'OUR VISION',
        vision:
          'To become a global leader in Thai tourism by managing every journey with heart.',

        visionText:
          'We are not just a tour company, but a trusted travel companion attentive to every detail, dedicated to delivering exceptional services and experiences that exceed expectations and create meaningful memories at every destination.',

        missionTitle: 'OUR MISSION',

        missions: [
          {
            number: '01',
            title: 'ELEVATE THAI TOURISM',
            desc: 'Promote Thailand as a world-class travel destination.',
          },
          {
            number: '02',
            title: 'QUALITY EXPERIENCE',
            desc: 'Deliver outstanding Thai travel experiences through quality services and professional guides.',
          },
          {
            number: '03',
            title: 'TRAVELER FIRST',
            desc: 'Understand diverse traveler needs and cultures and design experiences for different lifestyles and generations.',
          },
          {
            number: '04',
            title: 'SUSTAINABLE TOURISM',
            desc: 'Support sustainable tourism, local businesses, and responsible travel initiatives.',
          },
          {
            number: '05',
            title: 'AUTHENTIC THAILAND',
            desc: 'Showcase authentic Thai culture, local cuisine, and unique destinations.',
          },
        ],

        valuesTitle: 'OUR CORE VALUES',

        values: [
          {
            letter: 'R',
            title: 'RELIABILITY',
            thai: 'Trust & Safety',
            desc: 'Operating with transparency, integrity, and high safety standards to build lasting trust with our clients.',
          },
          {
            letter: 'A',
            title: 'ATTENTIVENESS',
            thai: 'Care & Detail',
            desc: 'Providing heartfelt service with meticulous attention to every detail and every traveler.',
          },
          {
            letter: 'E',
            title: 'EXCEPTIONAL EXPERIENCE',
            thai: 'Memorable Journeys',
            desc: 'Creating thoughtfully designed and value-driven travel experiences that exceed expectations.',
          },
        ],

        servicesTitle: 'OUR SERVICES',

        services: [
          {
            title: 'DOMESTIC TOURS',
            desc: 'Quality travel experiences across Thailand for both Thai and international travelers.',
          },
          {
            title: 'INBOUND TOURS',
            desc: 'Professional inbound travel services for international visitors to Thailand.',
          },
          {
            title: 'OUTBOUND TOURS',
            desc: 'Travel services to popular destinations worldwide for Thai travelers.',
          },
          {
            title: 'CUSTOMIZED TOURS',
            desc: 'Private group itineraries tailored to your budget, preferences, and specific needs.',
          },
          {
            title: 'ONE-STOP SERVICE',
            desc: 'Comprehensive travel management including accommodation, transportation, transfers, visas, and activities.',
          },
          {
            title: 'CORPORATE & INCENTIVE',
            desc: 'Professional solutions for outings, seminars, meetings, events, team building, and company trips.',
          },
        ],
      };

  return (
    <section className="page about-page">
      <div className="about-card">

        {/* ================= INTRO ================= */}
        <div className="about-hero">
          <div className="about-img">
            <ImageModal
              src={assetPath(
                isTH ? 'company/companydetail.jpg' : 'company/detail_en.jpg'
              )}
              alt="Everglow Travel"
              hintLabel={isTH ? 'ดูภาพขยาย' : 'View full size'}
            />
          </div>

          <div className="about-intro">
            <div className="eyebrow">{t.title}</div>

            {standalone ? (
              <h1>{t.company}</h1>
            ) : (
              <h2>{t.company}</h2>
            )}

            <div className="about-sub">{t.sub}</div>

            <p>{t.intro}</p>
            <p>{t.intro2}</p>
          </div>
        </div>

        {/* ================= VISION ================= */}
        <section className="about-section vision-section">
          <div className="section-label">{t.visionTitle}</div>

          <div className="vision-content">
            <div>
              <h2>{t.vision}</h2>
              <p>{t.visionText}</p>
            </div>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="about-section">
          <div className="section-heading">
            <div className="section-label">{t.missionTitle}</div>
            <div className="heading-line" />
          </div>

          <div className="mission-grid">
            {t.missions.map((item) => (
              <div className="mission-item" key={item.number}>
                <div className="mission-number">{item.number}</div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CORE VALUES ================= */}
        <section className="about-section values-section">
          <div className="section-heading centered">
            <div className="section-label">{t.valuesTitle}</div>
            <div className="heading-line" />
          </div>

          <div className="values-grid">
            {t.values.map((value) => (
              <div className="value-card" key={value.letter}>
                <div className="value-letter">{value.letter}</div>

                <h3>{value.title}</h3>

                <div className="value-thai">{value.thai}</div>

                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="about-section services-section">
          <div className="section-heading">
            <div className="section-label">{t.servicesTitle}</div>
            <div className="heading-line" />
          </div>

          <div className="services-grid">
            {t.services.map((service) => (
              <div className="service-item" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </section>
  );
}