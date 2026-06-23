import LocaleClient from './locale-client';

export function generateStaticParams() {
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

export default async function LocalePage({ params }) {
  const { locale } = await params;
  return <LocaleClient locale={locale} />;
}
