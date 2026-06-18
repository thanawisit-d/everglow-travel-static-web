export default function Hero({ locale }) {
  return (
    <section className="hero">
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
      <div className="scroll-indicator">⌄</div>
    </section>
  );
}
