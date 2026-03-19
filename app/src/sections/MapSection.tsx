import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { MapPin, Navigation } from 'lucide-react'

export default function MapSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Default location: Kyiv city center (you can change this to your address)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.448!2d30.5234!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0x3f3f3f3f3f3f3f3f!2sKyiv!5e0!3m2!1sen!2sua!4v1234567890"

  return (
    <section id="location" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AD38]/30 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AD38] text-sm tracking-[0.3em] uppercase mb-4 block">
            Location
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif gold-text mb-4">
            {t.map?.title || 'Наше розташування'}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            {t.map?.subtitle || 'Зустрічі проводяться в комфортному офісі в центрі міста'}
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AD38]/50" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AD38]/50" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AD38]/50" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AD38]/50" />

          {/* Map Frame */}
          <div className="relative border border-white/10 overflow-hidden">
            {/* Google Maps Embed */}
            <div className="relative w-full h-[400px] md:h-[500px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="absolute inset-0"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Location Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-black/90 backdrop-blur-sm border border-[#D4AD38]/30 p-4 md:p-6 max-w-xs"
            >
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#D4AD38] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium mb-1">
                    {t.map?.office || 'Офіс'}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {t.map?.address || 'м. Київ, центр'}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Kyiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[#D4AD38] text-sm mt-3 hover:text-[#F0E0B0] transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{t.map?.directions || 'Прокласти маршрут'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { 
              icon: MapPin, 
              title: t.map?.feature1 || 'Зручне розташування', 
              desc: t.map?.feature1desc || 'В центрі міста, поруч з метро' 
            },
            { 
              icon: Navigation, 
              title: t.map?.feature2 || 'Парковка', 
              desc: t.map?.feature2desc || 'Підземний паркинг для клієнтів' 
            },
            { 
              icon: '🏢', 
              title: t.map?.feature3 || 'Бізнес-центр', 
              desc: t.map?.feature3desc || 'Сучасний преміальний офіс' 
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-4 p-4 border border-white/10 hover:border-[#D4AD38]/30 transition-colors"
            >
              {typeof feature.icon === 'string' ? (
                <span className="text-2xl">{feature.icon}</span>
              ) : (
                <feature.icon className="w-6 h-6 text-[#D4AD38]" />
              )}
              <div>
                <h4 className="text-white font-medium">{feature.title}</h4>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
