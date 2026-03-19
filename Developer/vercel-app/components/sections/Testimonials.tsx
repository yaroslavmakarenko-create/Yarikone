"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const testimonials = [
  { id: 1, name: "Олександр К.", role: "Продавець квартири", text: "Ярослав професійно підійшов до продажу нашої квартири. Отримали ціну вище очікуваної за рекордний термін.", image: "/images/client-1.jpg" },
  { id: 2, name: "Марина та Ігор", role: "Покупці будинку", text: "Знайшли свій будинок мрії завдяки експертизі Ярослава. Процес був легким та прозорим.", image: "/images/client-2.jpg" },
  { id: 3, name: "Вікторія С.", role: "Інвестор", text: "Допоміг зробити вигідну інвестицію в комерційну нерухомість. Рекомендую як надійного консультанта.", image: "/images/client-3.jpg" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-primary-dark font-playfair text-3xl md:text-4xl font-semibold mb-4">Відгуки клієнтів</h2>
          <p className="text-dark-gray text-lg max-w-2xl mx-auto">Що кажуть люди, з якими я працював</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <motion.div key={item.id} variants={fadeInUp} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-accent-gold/20" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />)}
              </div>
              <p className="text-dark-gray leading-relaxed mb-6 italic">&ldquo;{item.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <p className="text-primary-dark font-semibold">{item.name}</p>
                  <p className="text-medium-gray text-sm">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
