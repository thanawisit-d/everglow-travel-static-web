import About from '@/components/About';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  return <About locale={locale} standalone />;
}
