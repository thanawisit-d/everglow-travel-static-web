import promotions from '@/data/promotions.json';
import TourCard from './TourCard';

export default function TourGrid({ showBadge }) {
  const data = promotions[showBadge] || [];
  const title = showBadge === 'monthly'
    ? 'โปรแกรมทัวร์แนะนำประจำเดือน'
    : 'โปรแกรมทัวร์ยอดนิยม';

  return (
    <section className="tour-section">
      <h2 className="tour-title" style={{ textAlign: 'center', width: '100%', display: 'block', marginTop: 30, fontSize: 24, fontWeight: 800, color: '#fffcfc' }}>
        {title}
      </h2>
      <div className="tour-grid">
        {data.map((t, i) => (
          <div key={i} className={`tour-card ${showBadge === 'monthly' ? 'hot-monthly' : ''}`}>
            <img src={t.image.startsWith('/') ? t.image : `/${t.image}`} className="tour-img" alt={t.id} />
            <p className="tour-desc">{t.desc}</p>
            <div className="tour-info">
              <p><img src="/assets/images/pin.png" alt="" /> รหัสทัวร์: {t.id}</p>
              <p><img src="/assets/images/stopwatch.png" alt="" /> {t.duration}</p>
              <p><img src="/assets/images/clock_13819249.png" alt="" /> {t.periodText}</p>
            </div>
            <div className="tour-bottom">
              <img src={`/plane logo/${t.airline}`} className="airline" alt="" />
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
