import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'expertise', href: '#expertise' },
    { key: 'testimonial', href: '#testimonial' },
    { key: 'contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-effect py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center"
            >
              <div className="relative">
                <svg
                  viewBox="0 0 120 80"
                  className="h-12 w-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F0E0B0" />
                      <stop offset="50%" stopColor="#D4AD38" />
                      <stop offset="100%" stopColor="#B89328" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 65 L20 35 L35 20 L50 35 L50 65 L40 65 L40 50 L30 50 L30 65 Z"
                    fill="url(#goldGradient)"
                    opacity="0.9"
                  />
                  <path
                    d="M45 15 L55 35 L65 15 L75 15 L60 42 L60 65 L50 65 L50 42 L35 15 Z"
                    fill="url(#goldGradient)"
                  />
                  <path
                    d="M70 65 L70 15 L80 15 L90 40 L100 15 L110 15 L110 65 L100 65 L100 35 L92 55 L88 55 L80 35 L80 65 Z"
                    fill="url(#goldGradient)"
                  />
                </svg>
                <span className="block text-center text-[10px] tracking-[0.2em] gold-text font-medium mt-1">
                  YAROSLAV MAKARENKO
                </span>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-300 relative group"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AD38] transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setLanguage('uk')}
                className={`px-3 py-1 text-sm tracking-wide transition-all duration-300 ${
                  language === 'uk'
                    ? 'text-[#D4AD38] border border-[#D4AD38]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                УКР
              </button>
              <span className="text-white/30">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm tracking-wide transition-all duration-300 ${
                  language === 'en'
                    ? 'text-[#D4AD38] border border-[#D4AD38]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                ENG
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white text-2xl tracking-wide hover:text-[#D4AD38] transition-colors"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
              <div className="flex items-center space-x-4 pt-8">
                <button
                  onClick={() => setLanguage('uk')}
                  className={`px-4 py-2 text-lg tracking-wide transition-all duration-300 ${
                    language === 'uk'
                      ? 'text-[#D4AD38] border border-[#D4AD38]'
                      : 'text-white/60'
                  }`}
                >
                  УКР
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 text-lg tracking-wide transition-all duration-300 ${
                    language === 'en'
                      ? 'text-[#D4AD38] border border-[#D4AD38]'
                      : 'text-white/60'
                  }`}
                >
                  ENG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
