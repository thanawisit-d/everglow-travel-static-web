import About from '@/components/About';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

const meta = {
  th: { title: 'เกี่ยวกับเรา', description: 'รู้จักกับ Everglow Travel บริษัททัวร์ชั้นนำ บริการด้วยใจ' },
  en: { title: 'About Us', description: 'Learn about Everglow Travel - your trusted travel partner since establishment.' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = meta[locale] || meta.th;
  return { title: m.title, description: m.description };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  return <About locale={locale} standalone />;
}
