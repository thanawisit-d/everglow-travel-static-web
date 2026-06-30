export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton-detail">
        <div className="skeleton skeleton-detail-left" />
        <div className="skeleton-detail-right">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line-long" />
          {[55, 65, 70, 50, 60, 75].map((w, i) => (
            <div key={i} className="skeleton skeleton-line" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
