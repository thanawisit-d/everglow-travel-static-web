import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com';

const titleTh = 'Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด';
const descTh = 'เอเวอร์โกลว์ ท่องเที่ยว บริการทัวร์ในประเทศและต่างประเทศ พร้อมทีมงานมืออาชีพ';
const titleEn = 'Everglow Travel - Everglow Global Co., Ltd.';
const descEn = 'Everglow Travel offers premium domestic and outbound tour packages with professional service.';

const pageMeta = {
  th: {
    home: { title: 'Everglow Travel', description: descTh },
    domestic: { title: 'ทัวร์ในประเทศ', description: 'ทัวร์ในประเทศ เที่ยวไทย สัมผัสประสบการณ์สุดพิเศษทั่วทุกจังหวัด' },
    outbound: { title: 'ทัวร์ต่างประเทศ', description: 'ทัวร์ต่างประเทศ พร้อมเปิดประสบการณ์การเดินทางสู่จุดหมายปลายทางทั่วโลก' },
    about: { title: 'เกี่ยวกับเรา', description: 'รู้จักกับ Everglow Travel บริษัททัวร์ชั้นนำ บริการด้วยใจ' },
    contact: { title: 'ติดต่อเรา', description: 'ช่องทางการติดต่อ Everglow Travel โทร 099-632-6146' },
    reviews: { title: 'รีวิว', description: 'รีวิวและรูปภาพความประทับใจจากลูกค้า Everglow Travel' },
  },
  en: {
    home: { title: 'Everglow Travel', description: descEn },
    domestic: { title: 'Thailand Tours', description: 'Discover Thailand with premium domestic tour packages across all provinces.' },
    outbound: { title: 'Outbound Tours', description: 'Explore extraordinary destinations around the world with Everglow Travel.' },
    about: { title: 'About Us', description: 'Learn about Everglow Travel - your trusted travel partner since establishment.' },
    contact: { title: 'Contact Us', description: 'Contact Everglow Travel - call 099-632-6146 or visit our office.' },
    reviews: { title: 'Reviews', description: 'See what our customers say about Everglow Travel experiences.' },
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const l = locale === 'en' ? 'en' : 'th';
  const meta = pageMeta[l].home;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      locale: l === 'th' ? 'th_TH' : 'en_US',
      title: meta.title,
      description: meta.description,
      url: `/${l}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/${l}`,
      languages: {
        th: '/th',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang='${locale}'`,
        }}
        suppressHydrationWarning
      />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
