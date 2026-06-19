import { Kanit, Poppins, Cinzel, Caveat } from 'next/font/google';
import "./globals.css";

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-kanit',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-poppins',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-cinzel',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
});

export const metadata = {
  title: "Everglow Travel",
  description: "Everglow Travel - บริษัท เอเวอร์โกลว์ โกลบอล จำกัด",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} ${poppins.variable} ${cinzel.variable} ${caveat.variable}`}>
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