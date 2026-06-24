'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TourCard from '@/components/TourCard';
import Pagination from '@/components/Pagination';

const PER_PAGE = 12;

const durationMapEnToTh = {
  '1 day': '1 วัน',
  '2 days 1 night': '2 วัน 1 คืน',
  '3 days 2 night': '3 วัน 2 คืน',
  '4 days 3 night': '4 วัน 3 คืน',
  '5 days 4 night': '5 วัน 4 คืน',
};

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

  const normalizedDuration = isEn ? (durationMapEnToTh[duration] || duration) : duration;

  const filtered = normalizedDuration
    ? tours.filter((t) => t.duration === normalizedDuration)
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
