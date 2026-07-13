import Contact from '@/components/Contact';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

const meta = {
  th: { title: 'ติดต่อเรา', description: 'ช่องทางการติดต่อ Everglow Travel โทร 099-632-6146' },
  en: { title: 'Contact Us', description: 'Contact Everglow Travel - call 099-632-6146 or visit our office.' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = meta[locale] || meta.th;
  return { title: m.title, description: m.description };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  return <Contact locale={locale} standalone />;
}
