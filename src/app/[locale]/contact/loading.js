export default function Loading() {
  return (
    <div className="skeleton-page" style={{ padding: '100px 20px 40px', maxWidth: 800, margin: '0 auto' }}>
      <div className="skeleton skeleton-line" style={{ width: '35%', height: 32, margin: '0 auto 40px' }} />
      <div className="skeleton skeleton-line" style={{ width: '60%', height: 16, margin: '0 auto 12px' }} />
      <div className="skeleton skeleton-line" style={{ width: '50%', height: 16, margin: '0 auto 12px' }} />
      <div className="skeleton skeleton-line" style={{ width: '70%', height: 16, margin: '0 auto 12px' }} />
      <div className="skeleton skeleton-line" style={{ width: '40%', height: 16, margin: '0 auto 40px' }} />
      <div className="skeleton skeleton-line" style={{ width: '80%', height: 300, margin: '0 auto' }} />
    </div>
  );
}
