import Image from 'next/image';
import { formatPrice } from '@/lib/pricing';
import { assetPath } from '@/lib/assets';
import { displayField, translateCountry } from '@/lib/i18n';

export default function TourDetail({ tour, locale }) {
  if (!tour) return null;
  const isOutbound = tour.type === 'outbound';
  const isEn = locale === 'en';

  const displayDesc = isEn && tour.desc_en ? tour.desc_en : tour.desc;
  const displayDuration = isEn && tour.duration_en ? tour.duration_en : tour.duration;
  const displayPeriod = isEn && tour.periodText_en ? tour.periodText_en : tour.periodText;
  const displayCountry = isEn ? displayField(tour.country).split(', ').map(c => translateCountry(c)).join(', ') : displayField(tour.country);
  const displayProvince = isEn && tour.province_en ? tour.province_en : (tour.province ? displayField(tour.province) : '-');
  const displayTransportName = isEn && tour.transport?.name_en ? tour.transport.name_en : (tour.transport?.name || '-');

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
    baht: 'Baht',
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
    baht: 'บาท',
  };

  return (
    <div className="tour-detail-page page active">
      <div className="tour-detail-container">
        <div className="tour-detail-left">
          <Image src={assetPath(tour.image)} fill sizes="(max-width: 992px) 100vw, 420px" alt={displayDesc || tour.id} />
        </div>
        <div className="tour-detail-right">
          <h1>{displayDesc?.split(isEn ? ' tour' : ' เที่ยว')[0] || tour.id}</h1>
          <p>{displayDesc}</p>
          <div className="detail-info-grid">
            <div className="detail-item">
              <Image src={assetPath('assets/images/icons/pin.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.tourId}</strong>
                <span>{tour.id}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/location.png')} width={24} height={24} alt="" />
              <div>
                <strong>{isOutbound ? t.country : t.province}</strong>
                <span>{isOutbound ? displayCountry : displayProvince}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/icons/clock_13819249.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.period}</strong>
                <span>{displayPeriod}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/icons/stopwatch.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.duration}</strong>
                <span>{displayDuration}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/price.png')} width={24} height={24} alt="" />
              <div>
                <strong>{t.priceStart}</strong>
                <span id="detailPrice">{formatPrice(tour.price)} {t.baht}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath(tour.transport?.icon || (tour.airline ? `plane-logo/${tour.airline}` : 'icons/plane.png'))} width={24} height={24} alt="" />
              <div>
                <strong>{t.transport}</strong>
                {isOutbound ? (
                  <Image src={assetPath(`plane-logo/${tour.airline}`)} width={180} height={55} className="detail-airline-logo" alt={tour.airline ? `${tour.airline} airline` : 'Airline logo'} />
                ) : (
                  <span>{displayTransportName}</span>
                )}
              </div>
            </div>
          </div>
          <div className="detail-buttons">
            <a href={`tel:${tour.phone || '+66996326146'}`} className="call-btn">
              <Image src={assetPath('assets/images/icons/phone2 (1).png')} width={24} height={24} alt="" />
              {t.call}
            </a>
            <a href="https://lin.ee/xXcNI1w" target="_blank" rel="noopener noreferrer" className="line-btn">
              <Image src={assetPath('assets/images/social/LINE.png')} width={24} height={24} alt="" />
              {t.line}
            </a>
            {tour.pdf && (
              <a href={assetPath(tour.pdf)} target="_blank" rel="noopener noreferrer" className="pdf-btn">
                <Image src={assetPath('assets/images/icons/pdf.png')} width={24} height={24} alt="" />
                {t.pdf}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}