'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { fieldIncludes } from '@/lib/i18n';
import { assetPath } from '@/lib/assets';
import TourCard from '@/components/TourCard';
import Pagination from '@/components/Pagination';

const PER_PAGE = 12;

function paginate(items, page) {
  const totalPages = Math.ceil(items.length / PER_PAGE) || 1;
  return {
    items: items.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    totalPages,
  };
}

export default function SearchClient({ locale, tours }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEn = locale === 'en';

  const q = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const date = searchParams.get('date') || '';

  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [q, location, date]);

  const selectedMonth = date ? date.substring(0, 7) : '';

  const results = tours.filter((tour) => {
    const matchLocation = !location ||
      fieldIncludes(tour.country, location) ||
      fieldIncludes(tour.province, location);
    const matchKeyword = !q ||
      (tour.id || '').toLowerCase().includes(q.toLowerCase()) ||
      (tour.desc || '').toLowerCase().includes(q.toLowerCase()) ||
      (isEn && tour.desc_en && tour.desc_en.toLowerCase().includes(q.toLowerCase()));
    const matchDate = !selectedMonth || !tour.startMonth ||
      (selectedMonth >= tour.startMonth && selectedMonth <= tour.endMonth);
    return matchLocation && matchKeyword && matchDate;
  });

  const { items, totalPages } = paginate(results, page);

  return (
    <section className="page search-results-page active">
      <h1>{isEn ? `Search Results (${results.length})` : `ผลการค้นหา (${results.length} รายการ)`}</h1>
      {results.length === 0 && (
        <div className="no-result">
          <Image src={assetPath('assets/images/iconNo.png')} width={30} height={30} alt="" /> {isEn ? 'No tours found' : 'ไม่พบโปรแกรมทัวร์'}
        </div>
      )}
      <div className="tour-grid">
        {items.map((t) => (
          <TourCard key={t.id} locale={locale} tour={t} onClick={() => router.push(`/${locale}/tours/${t.id}`)} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }} />
    </section>
  );
}
