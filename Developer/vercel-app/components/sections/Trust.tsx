"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const partners = [
  { id: 1, name: "Partner 1", image: "/images/partner-1.png" },
  { id: 2, name: "Partner 2", image: "/images/partner-2.png" },
  { id: 3, name: "Partner 3", image: "/images/partner-3.png" },
  { id: 4, name: "Partner 4", image: "/images/partner-1.png" },
  { id: 5, name: "Partner 5", image: "/images/partner-2.png" },
];

export function Trust() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-primary-dark font-playfair text-2xl md:text-3xl font-semibold mb-3">Нам довіряють</h2>
          <p className="text-dark-gray">Співпраця з провідними забудовниками та партнерами</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <motion.div key={partner.id} variants={fadeInUp} className="group flex items-center justify-center p-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-400">
              <img src={partner.image} alt={partner.name} className="max-h-16 w-auto object-contain" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
