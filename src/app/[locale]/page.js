import HomeClient from './home-client';

export function generateStaticParams() {
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

export default async function LocalePage({ params }) {
  const { locale } = await params;
  return <HomeClient locale={locale} />;
}
