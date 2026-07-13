import Reviews from '@/components/Reviews';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

const meta = {
  th: { title: 'รีวิว', description: 'รีวิวและรูปภาพความประทับใจจากลูกค้า Everglow Travel' },
  en: { title: 'Reviews', description: 'See what our customers say about Everglow Travel experiences.' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = meta[locale] || meta.th;
  return { title: m.title, description: m.description };
}

export default async function ReviewsPage({ params }) {
  const { locale } = await params;
  return (
    <div className="reviews-page">
      <Reviews locale={locale} standalone />
    </div>
  );
}
