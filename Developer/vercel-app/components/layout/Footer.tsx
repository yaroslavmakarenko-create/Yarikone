"use client";

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Send } from "lucide-react";

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navLabels: Record<string, string> = {
    home: "Головна",
    about: "Про мене",
    services: "Послуги",
    process: "Етапи",
    testimonials: "Відгуки",
    contact: "Контакти",
  };

  return (
    <footer className="bg-primary-dark text-medium-gray">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-white font-playfair text-xl font-semibold">Yaroslav Makarenko</h3>
            <p className="text-sm leading-relaxed">Ваш надійний партнер у світі преміальної нерухомості Києва</p>
            <div className="flex gap-4">
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-medium-gray hover:text-accent-gold transition-colors"><Send className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Навігація</h4>
            <ul className="space-y-2">
              {Object.keys(navLabels).map((key) => (
                <li key={key}>
                  <a href={`#${key}`} onClick={(e) => { e.preventDefault(); scrollToSection(`#${key}`); }} className="text-sm hover:text-accent-gold transition-colors">
                    {navLabels[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Послуги</h4>
            <ul className="space-y-2 text-sm">
              <li>Продаж нерухомості</li>
              <li>Купівля нерухомості</li>
              <li>Оренда</li>
              <li>Інвестиції</li>
              <li>Консультації</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Контакти</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-accent-gold" /><span className="text-sm">+38 (067) 123-45-67</span></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-accent-gold" /><span className="text-sm">info@yaroslavmakarenko.com</span></li>
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-accent-gold mt-0.5" /><span className="text-sm">м. Київ, вул. Хрещатик, 15</span></li>
              <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-accent-gold" /><span className="text-sm">Пн-Пт: 9:00 - 19:00</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.1242085462457!2d30.52123631589665!3d50.45035997947563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5054e3c167%3A0x8c5c1234567890ab!2sKhreshchatyk%20St%2C%2015%2C%20Kyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1234567890123!5m2!1sen!2sua"
            width="100%"
            height="200"
            style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>

        <div className="mt-10 pt-6 border-t border-light-gray/20 text-center text-sm">
          © 2025 Yaroslav Makarenko. Всі права захищені.
        </div>
      </div>
    </footer>
  );
}
