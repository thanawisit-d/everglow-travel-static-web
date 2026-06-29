import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: 'Everglow Travel',
    description: locale === 'en'
      ? 'Everglow Travel - Everglow Global Co., Ltd.'
      : 'Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
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
      />
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
