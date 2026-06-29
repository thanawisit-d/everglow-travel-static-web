export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton skeleton-detail-left" style={{ maxWidth: 800, margin: '0 auto 30px' }} />
      <div className="skeleton skeleton-line" style={{ width: '50%', margin: '0 auto 16px' }} />
      <div className="skeleton skeleton-line" style={{ width: '70%', margin: '0 auto 32px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginTop: 40 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-img" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line-short" />
            <div className="skeleton skeleton-line-short" />
          </div>
        ))}
      </div>
    </div>
  );
}
