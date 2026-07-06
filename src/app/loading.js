export default function Loading() {
  return (
    <div className="landing-page">
      <div className="overlay" />
      <div className="box">
        <div className="skeleton" style={{ width: 180, height: 180, borderRadius: '50%', margin: '0 auto 20px' }} />
        <div className="skeleton" style={{ width: '60%', height: 24, margin: '0 auto 12px', borderRadius: 4 }} />
        <div className="skeleton" style={{ width: '80%', height: 40, margin: '0 auto 20px', borderRadius: 4 }} />
        <div className="skeleton" style={{ width: '40%', height: 16, margin: '0 auto 30px', borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: 140, height: 48, borderRadius: 12 }} />
          <div className="skeleton" style={{ width: 140, height: 48, borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}
