"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function CountUp({ end }: { end: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(end.replace(/[^0-9]/g, ""));

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / 2000, 1);
        setCount(Math.floor(progress * numericValue));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue]);

  const suffix = end.replace(/[0-9]/g, "");
  return <span ref={ref}>{count}{suffix}</span>;
}

const features = [
  "Експертиза преміального сегмента",
  "Глибоке знання ринку Києва",
  "Переговорні навички топ-рівня",
  "Юридичний супровід угод"
];

const stats = [
  { value: "150+", label: "Успішних угод" },
  { value: "₴500M+", label: "Оборот угод" },
  { value: "98%", label: "Задоволених клієнтів" },
  { value: "10+", label: "Років досвіду" },
];

export function Expertise() {
  return (
    <section id="about" className="py-32 bg-primary-dark text-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-accent-gold font-montserrat text-sm uppercase tracking-wider">Моя експертиза</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-4 mb-6 leading-tight">10+ років досвіду на ринку преміальної нерухомості</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">Спеціалізація на преміальному сегменті нерухомості Києва. Поглиблене розуміння ринку, трендів та можливостей для максимально вигідних угод.</p>
            <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {features.map((feature, index) => (
                <motion.li key={index} variants={fadeInUp} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-gold" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative rounded-lg overflow-hidden">
              <img src="/images/expert-photo.jpg" alt="Yaroslav Makarenko" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                  <p className="text-accent-gold font-montserrat text-3xl md:text-4xl font-bold"><CountUp end={stat.value} /></p>
                  <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
