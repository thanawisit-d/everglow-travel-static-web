import Image from 'next/image';
import { formatPrice, assetPath } from '@/lib/utils';

export default function TourCard({ tour, onClick, showBadge, isDomestic, locale }) {
  const isEn = locale === 'en';
  const multiNight = isEn
    ? ['2 days 1 night', '3 days 2 night', '4 days 3 night']
    : ['2 วัน 1 คืน', '3 วัน 2 คืน', '4 วัน 3 คืน'];
  const isMultiNight = multiNight.includes(tour.duration);

  return (
    <div className={isDomestic ? 'tour-card domestic-tour-card' : 'tour-card'} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="tour-img-wrapper">
        {showBadge === 'popular' && (
          <span className="badge hot">{isEn ? 'HOT DEAL' : 'โปรแกรมยอดนิยม'}</span>
        )}
        {showBadge === 'monthly' && (
          <span className="badge monthly">{isEn ? 'HOT MONTHLY' : 'โปรแกรมแนะนำ'}</span>
        )}
        <Image src={assetPath(tour.image)} fill sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw" alt={tour.desc || tour.id} className="tour-img" style={{ objectFit: 'cover' }} />
      </div>
      <p className="tour-desc">{tour.desc}</p>
      <div className="tour-info">
        <p><Image src={assetPath('assets/images/pin.png')} width={16} height={16} alt="" /> {isEn ? 'Tour ID:' : 'รหัสทัวร์:'} {tour.id}</p>
        <p><Image src={assetPath('assets/images/stopwatch.png')} width={16} height={16} alt="" /> {tour.duration}</p>
        <p><Image src={assetPath('assets/images/clock_13819249.png')} width={16} height={16} alt="" /> {isEn ? 'Travel:' : 'เดินทาง:'} {tour.periodText}</p>
      </div>
      <div className="tour-bottom">
        <Image src={assetPath(tour.transport?.icon || (tour.airline ? `plane-logo/${tour.airline}` : 'assets/images/Logo.jpg'))} width={70} height={40} className="airline" alt={tour.airline || 'ขนส่ง'} />
        <div className="price">
          <span className="price-start">{isMultiNight ? (isEn ? 'Starting at' : 'เริ่มต้นเพียง') : (isEn ? 'Price' : 'ราคาเพียง')}</span>
          <span className="price-main">{formatPrice(tour.price)}.-</span>
          <span className="price-sub">{isEn ? 'Baht/person' : 'บาท/ท่าน'}</span>
        </div>
      </div>
    </div>
  );
}