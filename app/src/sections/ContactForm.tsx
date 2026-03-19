import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Get environment variables
      const botToken = import.meta.env.VITE_BOT_TOKEN
      const chatId = import.meta.env.VITE_CHAT_ID

      if (!botToken || !chatId) {
        console.error('Missing environment variables: VITE_BOT_TOKEN or VITE_CHAT_ID')
        setStatus('error')
        return
      }

      const text = `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${formData.name}
📞 <b>Phone:</b> ${formData.phone}
${formData.email ? `📧 <b>Email:</b> ${formData.email}` : ''}
${formData.message ? `💬 <b>Message:</b> ${formData.message}` : ''}

🕐 <b>Time:</b> ${new Date().toLocaleString('uk-UA')}
      `.trim()

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
      
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/77F223E3-BD60-4CF1-8E87-791F6A41D71E.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AD38] text-sm tracking-[0.3em] uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif gold-text mb-4">
            {t.form.title}
          </h2>
          <p className="text-white/60">
            {t.form.subtitle}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-white/80 text-sm mb-2">
              {t.form.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AD38] transition-colors duration-300"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-white/80 text-sm mb-2">
              {t.form.phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AD38] transition-colors duration-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white/80 text-sm mb-2">
              {t.form.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AD38] transition-colors duration-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white/80 text-sm mb-2">
              {t.form.message}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#D4AD38] transition-colors duration-300 resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative px-8 py-4 bg-[#D4AD38] text-black font-medium tracking-wide hover:bg-[#F0E0B0] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t.form.sending}</span>
              </>
            ) : (
              <>
                <span>{t.form.submit}</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 text-green-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{t.form.success}</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{t.form.error}</span>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
