import Image from 'next/image';
import { formatPrice, assetPath } from '@/lib/utils';

export default function TourDetail({ tour, onBack }) {
  if (!tour) return null;
  const isOutbound = tour.type === 'outbound';

  return (
    <div className="tour-detail-page page active">
      <button className="back-btn" onClick={onBack}>
        <Image src={assetPath('assets/images/go-back.png')} width={20} height={20} alt="กลับ" />
        กลับ
      </button>
      <div className="tour-detail-container">
        <div className="tour-detail-left" style={{ position: 'relative', minHeight: 400 }}>
          <Image src={assetPath(tour.image)} fill alt={tour.desc || tour.id} style={{ objectFit: 'contain', borderRadius: 8 }} />
        </div>
        <div className="tour-detail-right">
          <h2>{tour.desc?.split(' เที่ยว')[0] || tour.id}</h2>
          <p>{tour.desc}</p>
          <div className="detail-info-grid">
            <div className="detail-item">
              <Image src={assetPath('assets/images/pin.png')} width={24} height={24} alt="รหัสทัวร์" />
              <div>
                <strong>รหัสทัวร์</strong>
                <span>{tour.id}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/location.png')} width={24} height={24} alt="สถานที่" />
              <div>
                <strong>{isOutbound ? 'ประเทศ' : 'จังหวัด'}</strong>
                <span>{isOutbound ? tour.country : (tour.province || '-')}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/clock_13819249.png')} width={24} height={24} alt="กำหนดการเดินทาง" />
              <div>
                <strong>กำหนดการเดินทาง</strong>
                <span>{tour.periodText}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('assets/images/stopwatch.png')} width={24} height={24} alt="จำนวนวัน" />
              <div>
                <strong>จำนวนวัน</strong>
                <span>{tour.duration}</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath('icons/price.png')} width={24} height={24} alt="ราคา" />
              <div>
                <strong>ราคาเริ่มต้น</strong>
                <span id="detailPrice">{formatPrice(tour.price)} บาท</span>
              </div>
            </div>
            <div className="detail-item">
              <Image src={assetPath(isOutbound ? 'icons/plane.png' : (tour.transport?.icon || 'icons/transport.png'))} width={24} height={24} alt="การเดินทาง" />
              <div>
                <strong>{isOutbound ? 'เดินทางโดย' : 'การเดินทาง'}</strong>
                {isOutbound ? (
                  <Image src={assetPath(`plane logo/${tour.airline}`)} width={180} height={55} className="detail-airline-logo" alt={tour.airline || 'สายการบิน'} />
                ) : (
                  <span>{tour.transport?.name || '-'}</span>
                )}
              </div>
            </div>
          </div>
          <div className="detail-buttons">
            <a href={`tel:${tour.phone || '0996326146'}`} className="call-btn">
              <Image src={assetPath('assets/images/phone2 (1).png')} width={24} height={24} alt="" />
              โทรจอง
            </a>
            <a href="https://lin.ee/xXcNI1w" target="_blank" rel="noopener noreferrer" className="line-btn">
              <Image src={assetPath('assets/images/LINE.png')} width={24} height={24} alt="" />
              จองไลน์
            </a>
            {tour.pdf && (
              <a href={assetPath(tour.pdf)} target="_blank" rel="noopener noreferrer" className="pdf-btn">
                <Image src={assetPath('assets/images/pdf.png')} width={24} height={24} alt="" />
                ดูโปรแกรมทัวร์
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}