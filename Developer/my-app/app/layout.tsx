import type { Metadata } from 'next'
import { Playfair_Display, Inter, Montserrat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yaroslav Makarenko | Real Estate Expert',
  description: 'Premium real estate services in Kyiv',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
