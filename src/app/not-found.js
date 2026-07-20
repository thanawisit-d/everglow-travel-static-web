import Link from 'next/link';

export const dynamic = 'force-static';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-logo-wrap">
          <img src="/favicon-32x32.png" alt="Everglow Travel" width="64" height="64" className="not-found-logo" />
        </div>
        <h1 className="not-found-code">404</h1>
        <p className="not-found-msg-th">ไม่พบหน้าที่คุณกำลังมองหา</p>
        <p className="not-found-msg-en">The page you are looking for does not exist.</p>
        <Link href="/" className="back-btn not-found-btn">
          กลับหน้าแรก / Back to Home
        </Link>
      </div>
    </div>
  );
}
