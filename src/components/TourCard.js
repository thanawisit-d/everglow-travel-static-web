import Image from 'next/image';
import { formatPrice, assetPath } from '@/lib/utils';

export default function TourCard({ tour, onClick, showBadge, isDomestic }) {
  const multiNight = ['2 วัน 1 คืน', '3 วัน 2 คืน', '4 วัน 3 คืน', '2 days 1 night', '3 days 2 night', '4 days 3 night'];
  const isMultiNight = multiNight.includes(tour.duration);

  return (
    <div className={isDomestic ? 'tour-card domestic-tour-card' : 'tour-card'} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="tour-img-wrapper">
        <Image src={assetPath(tour.image)} fill alt={tour.desc || tour.id} className="tour-img" style={{ objectFit: 'cover' }} />
      </div>
      <p className="tour-desc">{tour.desc}</p>
      <div className="tour-info">
        <p><Image src={assetPath('assets/images/pin.png')} width={16} height={16} alt="รหัสทัวร์" /> รหัสทัวร์: {tour.id}</p>
        <p><Image src={assetPath('assets/images/stopwatch.png')} width={16} height={16} alt="ระยะเวลา" /> {tour.duration}</p>
        <p><Image src={assetPath('assets/images/clock_13819249.png')} width={16} height={16} alt="เดินทาง" /> เดินทาง: {tour.periodText}</p>
      </div>
      <div className="tour-bottom">
        <Image src={assetPath(tour.transport?.icon || (tour.airline ? `plane logo/${tour.airline}` : 'Logo.jpg'))} width={70} height={40} className="airline" alt={tour.airline || 'ขนส่ง'} />
        <div className="price">
          <span className="price-start">{isMultiNight ? 'เริ่มต้นเพียง' : 'ราคาเพียง'}</span>
          <span className="price-main">{formatPrice(tour.price)}.-</span>
          <span className="price-sub">บาท/ท่าน</span>
        </div>
      </div>
    </div>
  );
}