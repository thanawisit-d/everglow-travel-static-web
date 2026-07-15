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
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      url: `/${locale}/about`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        th: '/th/about',
        en: '/en/about',
      },
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  return <About locale={locale} standalone />;
}
