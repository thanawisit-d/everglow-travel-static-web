import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', flexDirection: 'column', gap: 30,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Kanit, sans-serif',
    }}>
      <h1 style={{ color: '#fff', fontSize: 48, margin: 0 }}>Everglow Travel</h1>
      <p style={{ color: '#eee', fontSize: 18 }}>เลือกภาษา / Select Language</p>
      <div style={{ display: 'flex', gap: 20 }}>
        <Link href="/th"
          style={{
            padding: '15px 40px', background: '#fff', color: '#764ba2',
            borderRadius: 10, fontSize: 20, fontWeight: 600,
            textDecoration: 'none', transition: 'transform 0.2s',
          }}
        >
          🇹🇭 ภาษาไทย
        </Link>
        <Link href="/en"
          style={{
            padding: '15px 40px', background: '#fff', color: '#667eea',
            borderRadius: 10, fontSize: 20, fontWeight: 600,
            textDecoration: 'none', transition: 'transform 0.2s',
          }}
        >
          🇬🇧 English
        </Link>
      </div>
    </div>
  );
}
