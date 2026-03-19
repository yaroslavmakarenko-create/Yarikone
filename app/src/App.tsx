import { useEffect } from 'react'
import { LanguageProvider } from '@/hooks/useLanguage'
import { useTelegram } from '@/hooks/useTelegram'
import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import Expertise from '@/sections/Expertise'
import Testimonial from '@/sections/Testimonial'
import MapSection from '@/sections/MapSection'
import ContactForm from '@/sections/ContactForm'
import Footer from '@/sections/Footer'
import './App.css'

function AppContent() {
  useTelegram()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-web-app.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Expertise />
      <Testimonial />
      <MapSection />
      <ContactForm />
      <Footer />
    </main>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
