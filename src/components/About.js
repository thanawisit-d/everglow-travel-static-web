import { assetPath } from '@/lib/utils';

export default function About({ locale }) {
  const t = locale === 'th' ? {
    title: 'เกี่ยวกับเรา',
    p1: 'Everglow Travel โดย บริษัท เอเวอร์โกลว์ โกลบอล จำกัด ผู้ให้บริการด้านการท่องเที่ยวและกิจกรรมนันทนาการ',
    p2: 'เรามุ่งมั่นที่จะเป็นส่วนหนึ่งในการดูแลและจัดการการเดินทางท่องเที่ยวตามความต้องการของลูกค้า โดยเน้นการบริการที่อบอุ่นและใส่ใจ',
    p3: 'ด้วยประสบการณ์ที่ไม่เคยหยุดนิ่ง เราจึงใส่ใจทุกรายละเอียดของการเดินทางเพื่อสร้างประสบการณ์ที่น่าประทับใจให้แก่ลูกค้าทุกท่าน',
    ceo: 'กิตติภณ พิมพ์ศรี',
    ceoTitle: 'ผู้จัดการทั่วไป',
  } : {
    title: 'About Us',
    p1: 'Everglow Travel by Everglow Global Co., Ltd. is a provider of travel and recreation services.',
    p2: 'We are committed to being part of your journey, managing travel according to your needs with warm and attentive service.',
    p3: 'With experience that never stops, we care about every detail of your trip to create memorable experiences.',
    ceo: 'Kittipon Pimsri',
    ceoTitle: 'General Manager',
  };

  return (
    <section className="page about-page">
      <h2>{t.title}</h2>
      <div className="about-content">
        <div className="about-text">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>
        <div className="about-ceo">
          <img src={assetPath('company/ceo-image.jpg')} alt="CEO" />
          <h3>{t.ceo}</h3>
          <p>{t.ceoTitle}</p>
        </div>
      </div>
    </section>
  );
}
