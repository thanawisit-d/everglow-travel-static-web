import PrivacyClient from './privacy-client';

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }];
}

const pageMeta = {
  th: {
    title: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล',
    description: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลของบริษัท เอเวอร์โกลว์ โกลบอล จำกัด ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
  },
  en: {
    title: 'Privacy Policy',
    description: 'Privacy Policy of Everglow Global Co., Ltd. in compliance with the Thailand Personal Data Protection Act B.E. 2562.',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = pageMeta[locale] || pageMeta.th;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      url: `/${locale}/privacy`,
    },
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        th: '/th/privacy',
        en: '/en/privacy',
      },
    },
  };
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  return <PrivacyClient locale={locale} />;
}
