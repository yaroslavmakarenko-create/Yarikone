import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import { Phone, Mail, Instagram, Linkedin, MessageCircle } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AD38]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <svg
                viewBox="0 0 120 80"
                className="h-16 w-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="goldGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F0E0B0" />
                    <stop offset="50%" stopColor="#D4AD38" />
                    <stop offset="100%" stopColor="#B89328" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 65 L20 35 L35 20 L50 35 L50 65 L40 65 L40 50 L30 50 L30 65 Z"
                  fill="url(#goldGradientFooter)"
                  opacity="0.9"
                />
                <path
                  d="M45 15 L55 35 L65 15 L75 15 L60 42 L60 65 L50 65 L50 42 L35 15 Z"
                  fill="url(#goldGradientFooter)"
                />
                <path
                  d="M70 65 L70 15 L80 15 L90 40 L100 15 L110 15 L110 65 L100 65 L100 35 L92 55 L88 55 L80 35 L80 65 Z"
                  fill="url(#goldGradientFooter)"
                />
              </svg>
              <span className="block text-[10px] tracking-[0.2em] gold-text font-medium mt-1">
                YAROSLAV MAKARENKO
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium Real Estate Consultant
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#D4AD38] text-sm tracking-[0.2em] uppercase mb-6">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+380000000000" 
                  className="flex items-center space-x-3 text-white/70 hover:text-[#D4AD38] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+38 (000) 000-00-00</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@yaroslavmakarenko.com" 
                  className="flex items-center space-x-3 text-white/70 hover:text-[#D4AD38] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@yaroslavmakarenko.com</span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#D4AD38] text-sm tracking-[0.2em] uppercase mb-6">
              {t.footer.social}
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:border-[#D4AD38] hover:text-[#D4AD38] transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:border-[#D4AD38] hover:text-[#D4AD38] transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:border-[#D4AD38] hover:text-[#D4AD38] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 text-center"
        >
          <p className="text-white/40 text-sm">
            &copy; {currentYear} Yaroslav Makarenko. {t.footer.rights}.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
