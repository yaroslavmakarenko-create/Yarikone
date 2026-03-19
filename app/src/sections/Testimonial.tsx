import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Quote } from 'lucide-react'

export default function Testimonial() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonial" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AD38]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AD38]/30 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AD38] text-sm tracking-[0.3em] uppercase mb-4 block">
            Testimonial
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif gold-text">
            {t.testimonial.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
          >
            <Quote className="w-12 h-12 text-[#D4AD38]/30" />
          </motion.div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 pt-16">
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/90 text-lg md:text-xl leading-relaxed text-center mb-10 italic"
            >
              &ldquo;{t.testimonial.quote}&rdquo;
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AD38] to-[#B89328] flex items-center justify-center mb-4">
                <span className="text-black text-xl font-serif font-bold">
                  {t.testimonial.author.charAt(0)}
                </span>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium text-lg">
                  {t.testimonial.author}
                </div>
                <div className="text-[#D4AD38] text-sm">
                  {t.testimonial.role}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AD38]/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AD38]/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AD38]/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AD38]/50" />
        </motion.div>
      </div>
    </section>
  )
}
