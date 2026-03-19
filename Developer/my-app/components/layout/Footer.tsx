'use client'

import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Send } from 'lucide-react'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const navT = useTranslations('navigation')

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-primary-dark text-medium-gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-white font-playfair text-xl font-semibold">
              Yaroslav Makarenko
            </h3>
            <p className="text-sm leading-relaxed">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('navigation')}</h4>
            <ul className="space-y-2">
              {['home', 'about', 'services', 'process', 'testimonials', 'contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(`#${item}`) }}
                    className="text-sm hover:text-accent-gold transition-colors"
                  >
                    {navT(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-2 text-sm">
              <li>{locale === 'uk' ? 'Продаж нерухомості' : locale === 'en' ? 'Property Sales' : 'Продажа недвижимости'}</li>
              <li>{locale === 'uk' ? 'Купівля нерухомості' : locale === 'en' ? 'Property Purchase' : 'Покупка недвижимости'}</li>
              <li>{locale === 'uk' ? 'Оренда' : locale === 'en' ? 'Rentals' : 'Аренда'}</li>
              <li>{locale === 'uk' ? 'Інвестиції' : locale === 'en' ? 'Investments' : 'Инвестиции'}</li>
              <li>{locale === 'uk' ? 'Консультації' : locale === 'en' ? 'Consultations' : 'Консультации'}</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('contacts.title')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-gold" />
                <span className="text-sm">{t('contacts.phone')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-gold" />
                <span className="text-sm">{t('contacts.email')}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-gold mt-0.5" />
                <span className="text-sm">{t('contacts.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent-gold" />
                <span className="text-sm">{t('contacts.hours')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5!2d30.5234!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0x3c3c3c3c3c3c3c3c!2sKhreshchatyk%20St%2C%2015%2C%20Kyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1234567890"
            width="100%"
            height="200"
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-light-gray/20 text-center text-sm">
          {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
