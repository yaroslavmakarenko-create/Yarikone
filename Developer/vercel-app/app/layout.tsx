import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yaroslav Makarenko | Експерт з преміальної нерухомості",
  description: "Професійні послуги з купівлі, продажу та оренди преміальної нерухомості у Києві. 10+ років досвіду, 150+ успішних угод.",
  keywords: ["нерухомість", "Київ", "преміальна нерухомість", "консультант", "купівля квартири", "продаж квартири"],
  openGraph: {
    title: "Yaroslav Makarenko | Експерт з преміальної нерухомості",
    description: "Професійні послуги з купівлі, продажу та оренди преміальної нерухомості у Києві.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`} lang="uk">
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
