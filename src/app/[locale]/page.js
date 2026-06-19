import LocaleClient from './locale-client';

export function generateStaticParams() {
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

export default function LocalePage() {
  return <LocaleClient />;
}
