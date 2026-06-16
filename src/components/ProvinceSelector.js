import { assetPath } from '@/lib/utils';

export default function ProvinceSelector({ tours, onSelect, locale }) {
  const provinces = [...new Set(tours.map((t) => t.province).filter(Boolean))];

  return (
    <section className="province-section">
      <h2 style={{ textAlign: 'center', margin: '30px 0', color: '#fff' }}>
        {locale === 'th' ? 'เลือกจังหวัดที่ต้องการเดินทาง' : 'Select Province'}
      </h2>
      <div className="province-grid">
        {provinces.map((p, i) => (
          <div key={i} className="province-card" onClick={() => onSelect(p)}>
            <div className="province-placeholder">{p.charAt(0)}</div>
            <span>{p}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
