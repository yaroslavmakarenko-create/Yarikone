import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export default function Hero() {
  const { t } = useLanguage()

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/562B56E2-8561-441E-84AE-252F9682E14E.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#D4AD38] text-sm md:text-base tracking-[0.3em] uppercase mb-6"
          >
            Premium Real Estate
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8"
          >
            <span className="gold-text">{t.hero.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            onClick={scrollToContact}
            className="group relative px-10 py-4 border border-[#D4AD38] text-[#D4AD38] tracking-[0.2em] uppercase text-sm hover:bg-[#D4AD38] hover:text-black transition-all duration-500"
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <motion.div
              className="absolute inset-0 bg-[#D4AD38]"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/40"
        >
          <span className="text-xs tracking-widest mb-2">SCROLL</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      <div className="absolute top-1/4 left-10 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#D4AD38]/50 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#D4AD38]/50 to-transparent hidden lg:block" />
    </section>
  )
}
