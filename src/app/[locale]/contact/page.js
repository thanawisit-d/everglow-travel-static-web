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
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      url: `/${locale}/contact`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'x-default': '/contact',
        th: '/th/contact',
        en: '/en/contact',
      },
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  return <Contact locale={locale} standalone />;
}
