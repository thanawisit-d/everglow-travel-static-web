import { Kanit, Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-kanit',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
});

export const metadata = {
  
  title: "Everglow Travel",
  description: "Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} ${inter.variable} ${playfair.variable}`}>
        <div className="min-h-screen w-full relative">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(125% 125% at 50% 90%, #fff 5%, #003478 100%)",
            }}
          />
          <div className="relative z-[1]">{children}</div>
        </div>
      </body>
    </html>
  );
}