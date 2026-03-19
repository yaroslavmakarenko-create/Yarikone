"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, Eye, Handshake, Key } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const steps = [
  { number: "01", title: "Консультація", description: "Безкоштовна зустріч для обговорення ваших потреб та цілей", icon: MessageSquare },
  { number: "02", title: "Підбір варіантів", description: "Формування короткого списку об'єктів під ваші критерії", icon: Search },
  { number: "03", title: "Огляди", description: "Організація переглядів обраних об'єктів у зручний час", icon: Eye },
  { number: "04", title: "Переговори", description: "Професійні переговори та підготовка угоди", icon: Handshake },
  { number: "05", title: "Оформлення", description: "Повний юридичний супровід та закриття угоди", icon: Key },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-primary-dark font-playfair text-3xl md:text-4xl font-semibold mb-4">Як ми будемо працювати</h2>
          <p className="text-dark-gray text-lg max-w-2xl mx-auto">Прозорий процес від першої зустрічі до отримання ключів</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="relative">
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-light-gray">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }} className="h-full bg-accent-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.number} variants={fadeInUp} className="relative text-center">
                  <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-off-white">
                    <span className="text-accent-gold font-montserrat text-2xl font-bold">{step.number}</span>
                  </div>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary-dark/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-dark" />
                  </div>
                  <h3 className="text-primary-dark font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-dark-gray text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
