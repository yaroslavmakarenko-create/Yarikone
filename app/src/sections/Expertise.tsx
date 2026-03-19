import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Building2, Home, TrendingUp, Shield } from 'lucide-react'

export default function Expertise() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: '10+', label: t.expertise.stats.years },
    { value: '150+', label: t.expertise.stats.deals },
    { value: '200+', label: t.expertise.stats.clients },
  ]

  const services = [
    { icon: Home, title: 'Private Residences', description: 'Exclusive homes and villas' },
    { icon: Building2, title: 'Commercial', description: 'Office spaces and retail' },
    { icon: TrendingUp, title: 'Investment', description: 'High-yield properties' },
    { icon: Shield, title: 'Legal Support', description: 'Full transaction security' },
  ]

  return (
    <section id="expertise" className="relative py-24 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: 'url(/images/5775EDBD-AE2F-49CB-83C4-0D2489173C8A.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AD38] text-sm tracking-[0.3em] uppercase mb-4 block">
            About
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif gold-text">
            {t.expertise.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-white/80 text-lg leading-relaxed">
              {t.expertise.paragraph1}
            </p>
            <p className="text-white/70 leading-relaxed">
              {t.expertise.paragraph2}
            </p>
            <p className="text-white/70 leading-relaxed">
              {t.expertise.paragraph3}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="p-6 border border-white/10 hover:border-[#D4AD38]/50 transition-colors duration-300 group"
              >
                <service.icon className="w-8 h-8 text-[#D4AD38] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-medium mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif gold-text mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm md:text-base tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
