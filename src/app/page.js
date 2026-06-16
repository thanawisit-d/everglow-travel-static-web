import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', flexDirection: 'column', gap: 20,
      fontFamily: 'Kanit, sans-serif',
      background: 'rgba(0,0,0,0.3)',
    }}>
      <img src="/assets/images/Logo.jpg" alt="Everglow Travel"
        style={{ width: 180, borderRadius: 12 }} />
      <h1 style={{ color: '#fff', fontSize: 48, margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
        Everglow Travel
      </h1>
      <p style={{ color: '#eee', fontSize: 18, margin: 0, opacity: 0.9 }}>
        เลือกภาษา / Select Language
      </p>
      <div style={{ display: 'flex', gap: 20 }}>
        <Link href="/th" style={{
          padding: '15px 40px', background: 'rgba(255,255,255,0.95)', borderRadius: 10,
          fontSize: 20, fontWeight: 600, textDecoration: 'none', color: '#764ba2',
        }}>
          🇹🇭 ภาษาไทย
        </Link>
        <Link href="/en" style={{
          padding: '15px 40px', background: 'rgba(255,255,255,0.95)', borderRadius: 10,
          fontSize: 20, fontWeight: 600, textDecoration: 'none', color: '#667eea',
        }}>
          🇬🇧 English
        </Link>
      </div>
    </div>
  );
}
