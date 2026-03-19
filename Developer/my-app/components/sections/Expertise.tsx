'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { AnimatedSection } from '../shared/AnimatedSection'
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from '@/lib/animations'

interface ExpertiseProps {
  locale: string
}

function CountUp({ end, duration = 2 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const numericValue = parseInt(end.replace(/[^0-9]/g, ''))
  const suffix = end.replace(/[0-9]/g, '')

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * numericValue))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, numericValue, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export function Expertise({ locale }: ExpertiseProps) {
  const t = useTranslations('expertise')

  const stats = [
    { key: 'deals', value: '150+' },
    { key: 'volume', value: '₴500M+' },
    { key: 'satisfaction', value: '98%' },
    { key: 'experience', value: '10+' },
  ]

  const features = [
    'expertise',
    'knowledge',
    'negotiation',
    'legal'
  ]

  return (
    <section id="about" className="py-32 bg-primary-dark text-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <AnimatedSection variants={fadeInLeft}>
            <span className="text-accent-gold font-montserrat text-sm uppercase tracking-wider">
              {t('tagline')}
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-4 mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {t('description')}
            </p>

            {/* Features */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-gold" />
                  </div>
                  <span className="text-white/80">{t(`features.${index}`)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatedSection>

          {/* Right - Image & Stats */}
          <div className="space-y-8">
            <AnimatedSection variants={fadeInRight}>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/images/expert-photo.jpg"
                  alt="Yaroslav Makarenko"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
              </div>
            </AnimatedSection>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.key}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <p className="text-accent-gold font-montserrat text-3xl md:text-4xl font-bold">
                    <CountUp end={stat.value} />
                  </p>
                  <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">
                    {t(`stats.${stat.key}.label`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
