import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Benefits } from '@/components/sections/Benefits'
import { Expertise } from '@/components/sections/Expertise'
import { Process } from '@/components/sections/Process'
import { Trust } from '@/components/sections/Trust'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })
  
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen">
      <Header locale={locale} />
      <Hero locale={locale} />
      <Benefits locale={locale} />
      <Expertise locale={locale} />
      <Process locale={locale} />
      <Trust locale={locale} />
      <Testimonials locale={locale} />
      <CTA locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
