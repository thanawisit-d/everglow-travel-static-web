import { formatPrice, assetPath } from '@/lib/utils';

export default function TourDetail({ tour, onBack }) {
  if (!tour) return null;
  const isOutbound = tour.type === 'outbound';

  return (
    <div className="tour-detail-page page active">
      <button className="back-btn" onClick={onBack}>
        <img src={assetPath('assets/images/go-back.png')} className="back-icon" alt="" />
        กลับ
      </button>
      <div className="tour-detail-container">
        <div className="tour-detail-left">
          <img src={assetPath(tour.image)} alt={tour.id} />
        </div>
        <div className="tour-detail-right">
          <h2>{tour.shortDesc || tour.desc?.split(' เที่ยว')[0]}</h2>
          <p>{tour.desc}</p>
          <div className="detail-info-grid">
            <div className="detail-item">
              <img src={assetPath('assets/images/pin.png')} alt="" />
              <div>
                <strong>รหัสทัวร์</strong>
                <span>{tour.id}</span>
              </div>
            </div>
            <div className="detail-item">
              <img src={assetPath('icons/location.png')} alt="" />
              <div>
                <strong>{isOutbound ? 'ประเทศ' : 'จังหวัด'}</strong>
                <span>{isOutbound ? tour.country : (tour.province || '-')}</span>
              </div>
            </div>
            <div className="detail-item">
              <img src={assetPath('assets/images/clock_13819249.png')} alt="" />
              <div>
                <strong>กำหนดการเดินทาง</strong>
                <span>{tour.periodText}</span>
              </div>
            </div>
            <div className="detail-item">
              <img src={assetPath('assets/images/stopwatch.png')} alt="" />
              <div>
                <strong>จำนวนวัน</strong>
                <span>{tour.duration}</span>
              </div>
            </div>
            <div className="detail-item">
              <img src={assetPath('icons/price.png')} alt="" />
              <div>
                <strong>ราคาเริ่มต้น</strong>
                <span id="detailPrice">{formatPrice(tour.price)} บาท</span>
              </div>
            </div>
            <div className="detail-item">
              <img src={assetPath(isOutbound ? 'icons/plane.png' : (tour.transport?.icon || 'icons/transport.png'))} alt="" />
              <div>
                <strong>{isOutbound ? 'เดินทางโดย' : 'การเดินทาง'}</strong>
                {isOutbound ? (
                  <img src={assetPath(`plane logo/${tour.airline}`)} className="detail-airline-logo" alt="" />
                ) : (
                  <span>{tour.transport?.name || '-'}</span>
                )}
              </div>
            </div>
          </div>
          <div className="detail-buttons">
            <a href="tel:0996326146" className="call-btn">
              <img src={assetPath('assets/images/phone2 (1).png')} alt="" />
              โทรจอง
            </a>
            <a href="https://lin.ee/xXcNI1w" target="_blank" rel="noopener noreferrer" className="line-btn">
              <img src={assetPath('assets/images/LINE.png')} alt="" />
              จองไลน์
            </a>
            {tour.pdf && (
              <a href={assetPath(tour.pdf)} target="_blank" rel="noopener noreferrer" className="pdf-btn">
                <img src={assetPath('assets/images/pdf.png')} alt="" />
                ดูโปรแกรมทัวร์
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
