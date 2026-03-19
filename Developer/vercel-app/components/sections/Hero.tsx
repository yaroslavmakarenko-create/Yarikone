"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import { heroContainer, heroItem } from "@/lib/animations";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/hero-bg.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 via-primary-dark/60 to-primary-dark/90" />
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 text-center pt-20">
        <motion.div variants={heroContainer} initial="hidden" animate="visible" className="space-y-6">
          <motion.p variants={heroItem} className="text-accent-gold text-sm md:text-base font-montserrat uppercase tracking-[0.2em]">
            Експерт з преміальної нерухомості
          </motion.p>

          <motion.h1 variants={heroItem} className="text-white font-playfair text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight">
            Yaroslav Makarenko
          </motion.h1>

          <motion.p variants={heroItem} className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Допомагаю знайти ідеальну нерухомість у Києві та регіоні
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center justify-center gap-2 bg-accent-gold text-primary-dark px-8 py-4 rounded font-montserrat text-sm font-semibold uppercase tracking-wider hover:bg-accent-gold/90 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              Безкоштовна консультація
            </button>
            <button
              onClick={() => scrollToSection("#services")}
              className="inline-flex items-center justify-center gap-2 border-2 border-accent-gold text-accent-gold px-8 py-4 rounded font-montserrat text-sm font-semibold uppercase tracking-wider hover:bg-accent-gold hover:text-primary-dark transition-all"
            >
              Дивитися об&apos;єкти
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12">
            <div className="text-center"><p className="text-white font-montserrat text-2xl font-bold">150+</p><p className="text-white/60 text-sm">успішних угод</p></div>
            <div className="text-center"><p className="text-white font-montserrat text-2xl font-bold">10+</p><p className="text-white/60 text-sm">років досвіду</p></div>
            <div className="text-center"><p className="text-white font-montserrat text-2xl font-bold">98%</p><p className="text-white/60 text-sm">задоволених клієнтів</p></div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button onClick={() => scrollToSection("#benefits")} className="text-white/60 hover:text-accent-gold transition-colors animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </button>
      </motion.div>
    </section>
  );
}
