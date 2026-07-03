export default function Loading() {
  return (
    <div className="skeleton-page" style={{ padding: '100px 20px 40px', maxWidth: 800, margin: '0 auto' }}>
      <div className="skeleton" style={{ width: '30%', height: 32, margin: '0 auto 40px', borderRadius: 8 }} />
      {[1,2,3].map(i => (
        <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 24, padding: 20, background: '#f8faff', borderRadius: 14 }}>
          <div className="skeleton" style={{ width: 60, height: 60, borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ width: '40%', height: 16, marginBottom: 8, borderRadius: 4 }} />
            <div className="skeleton" style={{ width: '90%', height: 14, marginBottom: 6, borderRadius: 4 }} />
            <div className="skeleton" style={{ width: '75%', height: 14, borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
