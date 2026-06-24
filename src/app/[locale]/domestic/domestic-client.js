'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

export default function DomesticClient({ locale, tours }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEn = locale === 'en';
  const initialDuration = searchParams.get('duration') || '';

  const [duration, setDuration] = useState(initialDuration);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setDuration(searchParams.get('duration') || '');
    setPage(1);
  }, [searchParams]);

  const filtered = duration
    ? tours.filter((t) => t.duration === duration)
    : tours;

  const { items, totalPages } = paginate(filtered, page);

  return (
    <section className="page tour-list-page active">
      <h1>{isEn ? 'Thailand Tours' : 'ทัวร์ในประเทศ'}</h1>
      <div className="tour-grid">
        {items.map((t) => (
          <TourCard key={t.id} locale={locale} tour={t} onClick={() => router.push(`/${locale}/tours/${t.id}`)} isDomestic />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }} />
    </section>
  );
}
