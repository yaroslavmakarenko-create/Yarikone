'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { TrendingUp, Heart, Shield, Lock, Clock, Headphones } from 'lucide-react'
import { AnimatedSection } from '../shared/AnimatedSection'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface BenefitsProps {
  locale: string
}

const benefits = [
  { id: 'expertise', icon: TrendingUp },
  { id: 'personal', icon: Heart },
  { id: 'fullservice', icon: Shield },
  { id: 'confidential', icon: Lock },
  { id: 'time', icon: Clock },
  { id: 'aftersale', icon: Headphones },
]

export function Benefits({ locale }: BenefitsProps) {
  const t = useTranslations('benefits')

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-primary-dark font-playfair text-3xl md:text-4xl font-semibold mb-4">
            {t('title')}
          </h2>
          <p className="text-dark-gray text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.id}
                variants={fadeInUp}
                className="group p-8 rounded-lg bg-off-white hover:bg-white hover:shadow-xl transition-all duration-400 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-lg bg-primary-dark/5 flex items-center justify-center mb-6 group-hover:bg-accent-gold/10 transition-colors">
                  <Icon className="w-7 h-7 text-accent-gold" />
                </div>
                <h3 className="text-primary-dark font-semibold text-xl mb-3">
                  {t(`items.${benefit.id}.title`)}
                </h3>
                <p className="text-dark-gray leading-relaxed">
                  {t(`items.${benefit.id}.description`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
