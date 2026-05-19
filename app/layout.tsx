import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Startups Coffee · Caracas',
  description: 'El encuentro mensual de founders venezolanos. Masterclasses reales, ponentes reales, comunidad real. Cada mes en el HUB BDV INNOVA, Caracas.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased font-body selection:bg-[#EEF2FF] selection:text-[#1D4ED8]">
        {children}
      </body>
    </html>
  );
}

