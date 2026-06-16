import { formatPrice, assetPath } from '@/lib/utils';

export default function TourCard({ tour, onClick, showBadge, isDomestic }) {
  const multiNight = ['2 วัน 1 คืน', '3 วัน 2 คืน', '4 วัน 3 คืน', '2 days 1 night', '3 days 2 night', '4 days 3 night'];
  const isMultiNight = multiNight.includes(tour.duration);

  return (
    <div className={isDomestic ? 'tour-card domestic-tour-card' : 'tour-card'} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <img src={assetPath(tour.image)} className="tour-img" alt={tour.id} />
      <p className="tour-desc">{tour.desc}</p>
      <div className="tour-info">
        <p><img src={assetPath('assets/images/pin.png')} alt="" /> รหัสทัวร์: {tour.id}</p>
        <p><img src={assetPath('assets/images/stopwatch.png')} alt="" /> {tour.duration}</p>
        <p><img src={assetPath('assets/images/clock_13819249.png')} alt="" /> เดินทาง: {tour.periodText}</p>
      </div>
      <div className="tour-bottom">
        <img src={assetPath(tour.transport?.icon || (tour.airline ? `plane logo/${tour.airline}` : 'Logo.jpg'))} className="airline" alt="" />
        <div className="price">
          <span className="price-start">{isMultiNight ? 'เริ่มต้นเพียง' : 'ราคาเพียง'}</span>
          <span className="price-main">{formatPrice(tour.price)}.-</span>
          <span className="price-sub">บาท/ท่าน</span>
        </div>
      </div>
    </div>
  );
}
