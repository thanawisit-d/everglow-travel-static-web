import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
