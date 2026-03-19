'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { MessageSquare, Search, Eye, Handshake, Key } from 'lucide-react'
import { AnimatedSection } from '../shared/AnimatedSection'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface ProcessProps {
  locale: string
}

const steps = [
  { id: '1', icon: MessageSquare },
  { id: '2', icon: Search },
  { id: '3', icon: Eye },
  { id: '4', icon: Handshake },
  { id: '5', icon: Key },
]

export function Process({ locale }: ProcessProps) {
  const t = useTranslations('process')

  return (
    <section id="process" className="py-24 bg-off-white">
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

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-light-gray">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
              className="h-full bg-accent-gold"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="relative text-center"
                >
                  {/* Number Badge */}
                  <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-off-white">
                    <span className="text-accent-gold font-montserrat text-2xl font-bold">
                      0{step.id}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary-dark/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-dark" />
                  </div>

                  {/* Content */}
                  <h3 className="text-primary-dark font-semibold text-lg mb-2">
                    {t(`steps.${step.id}.title`)}
                  </h3>
                  <p className="text-dark-gray text-sm leading-relaxed">
                    {t(`steps.${step.id}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
