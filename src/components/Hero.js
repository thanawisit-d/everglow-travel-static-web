export default function Hero({ locale }) {
  return (
    <section className="hero">
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap" rel="stylesheet" />
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
