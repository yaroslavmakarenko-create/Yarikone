'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { AnimatedSection } from '../shared/AnimatedSection'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface TestimonialsProps {
  locale: string
}

const testimonials = [
  { id: '1', image: '/images/client-1.jpg' },
  { id: '2', image: '/images/client-2.jpg' },
  { id: '3', image: '/images/client-3.jpg' },
]

export function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations('testimonials')

  return (
    <section id="testimonials" className="py-24 bg-off-white">
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

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent-gold/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-dark-gray leading-relaxed mb-6 italic">
                "{t(`items.${item.id}.text`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={t(`items.${item.id}.name`)}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-primary-dark font-semibold">
                    {t(`items.${item.id}.name`)}
                  </p>
                  <p className="text-medium-gray text-sm">
                    {t(`items.${item.id}.role`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
