'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Phone, Send, Loader2, CheckCircle } from 'lucide-react'
import { AnimatedSection } from '../shared/AnimatedSection'

interface CTAProps {
  locale: string
}

export function CTA({ locale }: CTAProps) {
  const t = useTranslations('cta')
  const currentLocale = useLocale()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale: currentLocale
        })
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        setFormData({ name: '', phone: '' })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert(t('form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-primary-blue to-primary-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10">
        <AnimatedSection className="text-center text-white">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-4">
            {t('title')}
          </h2>
          <p className="text-white/70 text-lg mb-10">
            {t('subtitle')}
          </p>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{t('form.success')}</h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('form.name')}
                  className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t('form.phone')}
                  className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-accent-gold text-primary-dark px-10 py-4 rounded-lg font-montserrat font-semibold uppercase tracking-wider hover:bg-accent-gold/90 transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('form.sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('form.submit')}
                  </>
                )}
              </button>
            </form>
          )}

          {/* Direct Contact */}
          <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
            <Phone className="w-4 h-4" />
            <span>+38 (067) 123-45-67</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
