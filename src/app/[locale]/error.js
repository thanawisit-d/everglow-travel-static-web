'use client';

export default function LocaleError({ error, reset }) {
  return (
    <div className="page-content text-center py-20">
      <h1 style={{ color: 'var(--navy)' }}>Something went wrong</h1>
      <p className="text-muted" style={{ marginTop: '8px', color: 'var(--text-muted)' }}>กรุณาลองใหม่อีกครั้ง</p>
      <button
        onClick={reset}
        style={{
          marginTop: '20px',
          padding: '12px 32px',
          background: 'var(--navy)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: 'var(--radius)',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Try again
      </button>
    </div>
  );
}
