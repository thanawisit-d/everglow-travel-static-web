import Reviews from '@/components/Reviews';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

export default async function ReviewsPage({ params }) {
  const { locale } = await params;
  return (
    <div className="reviews-page">
      <Reviews locale={locale} standalone />
    </div>
  );
}
