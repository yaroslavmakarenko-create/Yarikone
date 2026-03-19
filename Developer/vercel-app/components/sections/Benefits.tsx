"use client";

import { motion } from "framer-motion";
import { TrendingUp, Heart, Shield, Lock, Clock, Headphones } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const benefits = [
  { id: "expertise", title: "Експертиза ринку", description: "Глибоке розуміння ринку преміальної нерухомості Києва", icon: TrendingUp },
  { id: "personal", title: "Персональний підхід", description: "Індивідуальна стратегія для кожного клієнта", icon: Heart },
  { id: "fullservice", title: "Повний супровід", description: "Від пошуку до оформлення документів — під ключ", icon: Shield },
  { id: "confidential", title: "Конфіденційність", description: "Повна конфіденційність угод та дискреція", icon: Lock },
  { id: "time", title: "Економія часу", description: "Оптимізований процес без зайвих витрат часу", icon: Clock },
  { id: "aftersale", title: "Післяпродажний сервіс", description: "Підтримка навіть після завершення угоди", icon: Headphones },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-primary-dark font-playfair text-3xl md:text-4xl font-semibold mb-4">Чому обирають мене</h2>
          <p className="text-dark-gray text-lg max-w-2xl mx-auto">Професійний підхід та індивідуальна увага до кожного клієнта</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={benefit.id} variants={fadeInUp} className="group p-8 rounded-lg bg-off-white hover:bg-white hover:shadow-xl transition-all duration-400 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-lg bg-primary-dark/5 flex items-center justify-center mb-6 group-hover:bg-accent-gold/10 transition-colors">
                  <Icon className="w-7 h-7 text-accent-gold" />
                </div>
                <h3 className="text-primary-dark font-semibold text-xl mb-3">{benefit.title}</h3>
                <p className="text-dark-gray leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
