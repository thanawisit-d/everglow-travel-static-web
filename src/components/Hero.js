export default function Hero({ locale }) {
  return (
    <section className="hero">
      <svg width="0" height="0" aria-hidden="true" /> 
      {locale === 'th' ? (
        <>
          <h1>ยินดีต้อนรับสู่ Everglow Travel</h1>
          <p>ค้นหาทัวร์ที่ใช่สำหรับคุณ</p>
        </>
      ) : (
        <>
          <h1>Welcome to Everglow Travel</h1>
          <p>Discover Thailand with us</p>
        </>
      )}
    </section>
  );
}
