import Image from 'next/image';

export default function Hero({ locale }) {
  return (
    <section className="hero">
      <Image src="/assets/images/slide1 (1).jpg" fill className="hero-bg" alt="" priority />
      <div className="hero-overlay" />
      <div className="hero-content">
        {locale === 'th' ? (
          <>
            <h1>ยินดีต้อนรับสู่ Everglow Travel</h1>
            <p>ค้นหาทัวร์ที่ใช่สำหรับคุณ พร้อมประสบการณ์การเดินทางที่น่าประทับใจ</p>
          </>
        ) : (
          <>
            <h1>Welcome to Everglow Travel</h1>
            <p>Discover Thailand with us — unforgettable travel experiences await</p>
          </>
        )}
      </div>
    </section>
  );
}
