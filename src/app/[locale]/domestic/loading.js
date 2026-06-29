export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton skeleton-line" style={{ width: 200, height: 32, margin: '0 auto 40px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
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
