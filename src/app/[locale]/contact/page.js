import Contact from '@/components/Contact';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  return <Contact locale={locale} />;
}
