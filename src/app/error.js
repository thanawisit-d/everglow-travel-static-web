'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--navy)' }}>Something went wrong</h1>
        <p className="mt-3" style={{ color: 'var(--text-muted)' }}>กรุณาลองใหม่อีกครั้ง</p>
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
    </div>
  );
}
