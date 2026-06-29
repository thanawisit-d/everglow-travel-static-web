export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton-detail">
        <div className="skeleton skeleton-detail-left" />
        <div className="skeleton-detail-right">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line-long" />
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="skeleton skeleton-line" style={{ width: `${50 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
