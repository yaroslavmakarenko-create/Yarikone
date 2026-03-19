'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedSection } from '../shared/AnimatedSection'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface TrustProps {
  locale: string
}

const partners = [
  { id: 1, name: 'Київміськбуд', image: '/images/partner-1.png' },
  { id: 2, name: 'Укрбуд', image: '/images/partner-2.png' },
  { id: 3, name: 'Інтергал-Буд', image: '/images/partner-3.png' },
  { id: 4, name: 'Новая Жизнь', image: '/images/partner-1.png' },
  { id: 5, name: 'Артеміда', image: '/images/partner-2.png' },
]

export function Trust({ locale }: TrustProps) {
  const t = useTranslations('trust')

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-primary-dark font-playfair text-2xl md:text-3xl font-semibold mb-3">
            {t('title')}
          </h2>
          <p className="text-dark-gray">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* Partners Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={fadeInUp}
              className="group flex items-center justify-center p-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="max-h-16 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
