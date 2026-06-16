import TourCard from './TourCard';
import { assetPath } from '@/lib/utils';

const popularTours = [
  { id: 'BT-HKG61_CX', image: 'Populartours/HongkongBT-HKG61_CX.jpg', desc: 'ทัวร์ฮ่องกงและจูไห่ เที่ยว 2 เมือง บินไปมูที่เกาะฮ่องกง เที่ยวจูไห่ สวนสนุกและอควาเรียมที่ใหญ่ที่สุดในเอเชีย', duration: '3 วัน 2 คืน', periodText: 'เดินทาง: เม.ย. - ต.ค. 2569', airline: 'Cathaylogo.jpg', price: '19,999' },
  { id: 'BT-KIX-NRT_S02_XJ', image: 'Populartours/JapanBT-KIX-NRT_S02_XJ.jpg', desc: 'ทัวร์ญี่ปุ่น มหัศจรรย์ Osaka โทยามะ เกียวโต มัตสึโมโต้ ฟูจิ ชมทิวทัสน์อันสวยงาม ณ ฮาคุบะ เยือน "คามิคูจิ"', duration: '6 วัน 4 คืน', periodText: 'เดินทาง: เม.ย. - พ.ค. 2569', airline: 'airasia.png', price: '36,999' },
  { id: 'ZGKIX-2619VZ', image: 'Populartours/JapanZGKIX-2619VZ.jpg', desc: 'ทัวร์ญี่ปุ่น เที่ยวเมืองเก่าสุดคลาสสิกที่เกียวโต เช็คอินวัดคิโยมิสึ กินช้อปฟินตลาดปลาคุโรมง', duration: '5 วัน 3 คืน', periodText: 'เดินทาง: เม.ย. - มิ.ย. 2569', airline: 'VietJet.png', price: '23,990' },
];

const monthlyTours = [
  { id: 'BT-XIY19_9C', image: 'HotMonthly/China_BT-XIY19_9C.jpg', desc: 'ทัวร์จีน Xian "มรดกโลกพันปี สุสานทหารดินเผา" แต่งชุดจีนโบราณ เดินถนนวัฒนธรรมต้าถัง', duration: '4 วัน 2 คืน', periodText: 'เดินทาง: เม.ย. - มิ.ย. 2569', airline: 'spring.png', price: '10,999' },
  { id: '2UPQC-VZ106', image: 'HotMonthly/Vietnam_2UPQC-VZ106.jpg', desc: 'ทัวร์เวียดนามใต้ 2 สวนสนุก สวนน้ำ AQUATOPIA & สวนสนุก VIN WONDER', duration: '3 วัน 2 คืน', periodText: 'เดินทาง: เม.ย. - ต.ค. 2569', airline: 'VietJet.png', price: '11,800' },
  { id: 'VZ-BANA01', image: 'HotMonthly/Vietnam_VZ-BANA01.jpg', desc: 'ทัวร์เวียดนาม ดานัง ฮอยอัน พักบานาฮิลล์ 1 คืน เที่ยวครบทุกไฮไลท์', duration: '3 วัน 2 คืน', periodText: 'เดินทาง: เม.ย. - ต.ค. 2569', airline: 'VietJet.png', price: '11,999' },
];

export default function TourGrid({ showBadge, tours }) {
  const data = showBadge === 'monthly' ? monthlyTours : popularTours;
  return (
    <section className="tour-section">
      <h2 className="tour-title" style={{ textAlign: 'center', width: '100%', display: 'block', marginTop: 30, fontSize: 24, fontWeight: 800, color: '#fffcfc' }}>
        {showBadge === 'monthly' ? 'โปรแกรมทัวร์แนะนำประจำเดือน' : 'โปรแกรมทัวร์ยอดนิยม'}
      </h2>
      <div className="tour-grid">
        {data.map((t, i) => (
          <div key={i} className={`tour-card ${showBadge === 'monthly' ? 'hot-monthly' : ''}`}>
            <img src={assetPath(t.image)} className="tour-img" alt={t.id} />
            <p className="tour-desc">{t.desc}</p>
            <div className="tour-info">
              <p><img src={assetPath('assets/images/pin.png')} alt="" /> รหัสทัวร์: {t.id}</p>
              <p><img src={assetPath('assets/images/stopwatch.png')} alt="" /> {t.duration}</p>
              <p><img src={assetPath('assets/images/clock_13819249.png')} alt="" /> {t.periodText}</p>
            </div>
            <div className="tour-bottom">
              <img src={assetPath(`plane logo/${t.airline}`)} className="airline" alt="" />
              <div className="price">
                <span className="price-start">เริ่มต้น</span>
                <span className="price-main">{t.price}.-</span>
                <span className="price-sub">บาท/ท่าน</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
