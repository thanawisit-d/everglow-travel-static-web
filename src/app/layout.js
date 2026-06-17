import "./globals.css";

export const metadata = {
  title: "Everglow Travel",
  description: "Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&family=Poppins:wght@300;500;700&family=Cinzel:wght@500;700&family=Caveat:wght@400..700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = location.pathname.startsWith('/en') ? 'en' : 'th';
            if (location.pathname.startsWith('/en')) {
              document.body.classList.add('en-page');
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}