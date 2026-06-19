import Image from 'next/image';
import { formatPrice, assetPath } from '@/lib/utils';

export default function TourDetail({ tour, locale }) {
  if (!tour) return null;
  const isOutbound = tour.type === 'outbound';
  const isEn = locale === 'en';

  const t = isEn ? {
    tourId: 'Tour ID',
    country: 'Country',
    province: 'Province',
    period: 'Travel Period',
    duration: 'Duration',
    priceStart: 'Starting Price',
    transport: 'Transport',
    by: 'By',
    call: 'Call to Book',
    line: 'Book via LINE',
    pdf: 'View Tour Program',
  } : {
    tourId: 'รหัสทัวร์',
    country: 'ประเทศ',
    province: 'จังหวัด',
    period: 'กำหนดการเดินทาง',
    duration: 'จำนวนวัน',
    priceStart: 'ราคาเริ่มต้น',
    transport: isOutbound ? 'เดินทางโดย' : 'การเดินทาง',
    by: 'เดินทางโดย',
    call: 'โทรจอง',
    line: 'จองไลน์',
    pdf: 'ดูโปรแกรมทัวร์',
  };

  return (
    <div className="tour-detail-page page active">
      <div className="tour-detail-container">
        <div className="tour-detail-left" style={{ position: 'relative', minHeight: 400 }}>
          <Image src={assetPath(tour.image)} fill sizes="(max-width: 992px) 100vw, 420px" alt={tour.desc || tour.id} style={{ objectFit: 'contain', borderRadius: 8 }} />
        </div>
        <div className="tour-detail-right">
          <h2>{tour.desc?.split(' เที่ยว')[0] || tour.id}</h2>
          <p>{tour.desc}</p>
          <div className="detail-info-grid">
            <div className="detail-item">
              <Image src={assetPath('assets/images/pin.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.tourId}</strong>
                <span>{tour.id}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/location.png')} width={24} height={24} alt="" />
              <div>
                <strong>{isOutbound ? t.country : t.province}</strong>
                <span>{isOutbound ? tour.country : (tour.province || '-')}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/clock_13819249.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.period}</strong>
                <span>{tour.periodText}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/stopwatch.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.duration}</strong>
                <span>{tour.duration}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/price.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.priceStart}</strong>
                <span id="detailPrice">{formatPrice(tour.price)} {isEn ? 'Baht' : 'บาท'}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath(isOutbound ? 'icons/plane.png' : (tour.transport?.icon || 'icons/transport.png'))} width={24} height={24} alt="" />
              <div>
                <strong>{t.transport}</strong>
                {isOutbound ? (
                  <Image src={assetPath(`plane-logo/${tour.airline}`)} width={180} height={55} className="detail-airline-logo" alt={tour.airline || ''} />
                ) : (
                  <span>{tour.transport?.name || '-'}</span>
                )}
              </div>
            </div>
          </div>
          <div className="detail-buttons">
            <a href={`tel:${tour.phone || '+66996326146'}`} className="call-btn">
              <Image src={assetPath('assets/images/phone2 (1).png')} width={24} height={24} alt="" />
              {t.call}
            </a>
            <a href="https://lin.ee/xXcNI1w" target="_blank" rel="noopener noreferrer" className="line-btn">
              <Image src={assetPath('assets/images/LINE.png')} width={24} height={24} alt="" />
              {t.line}
            </a>
            {tour.pdf && (
              <a href={assetPath(tour.pdf)} target="_blank" rel="noopener noreferrer" className="pdf-btn">
                <Image src={assetPath('assets/images/pdf.png')} width={24} height={24} alt="" />
                {t.pdf}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}