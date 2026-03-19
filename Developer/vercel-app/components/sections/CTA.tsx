"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Send, Loader2, CheckCircle } from "lucide-react";

export function CTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = { name: "", phone: "" };
    let isValid = true;

    if (formData.name.trim().length < 2) {
      newErrors.name = "Введіть ім'я (мінімум 2 символи)";
      isValid = false;
    }

    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Введіть коректний номер телефону";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "" });
      } else {
        setApiError(data.error || "Помилка відправки");
      }
    } catch (error) {
      setApiError("Помилка з'єднання");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-primary-blue to-primary-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center text-white">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-4">Готові знайти свою ідеальну нерухомість?</h2>
          <p className="text-white/70 text-lg mb-10">Запишіться на безкоштовну консультацію</p>

          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Дякую! Я зв&apos;яжуся з вами найближчим часом.</h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше ім'я"
                    className={`w-full px-6 py-4 rounded-lg bg-white/10 border ${errors.name ? "border-red-500" : "border-white/20"} text-white placeholder:text-white/50 focus:outline-none focus:border-accent-gold transition-all`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="text-left">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Телефон"
                    className={`w-full px-6 py-4 rounded-lg bg-white/10 border ${errors.phone ? "border-red-500" : "border-white/20"} text-white placeholder:text-white/50 focus:outline-none focus:border-accent-gold transition-all`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              {apiError && <p className="text-red-400 text-sm">{apiError}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-accent-gold text-primary-dark px-10 py-4 rounded-lg font-montserrat font-semibold uppercase tracking-wider hover:bg-accent-gold/90 transition-all disabled:opacity-50">
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Відправка...</> : <><Send className="w-5 h-5" />Замовити дзвінок</>}
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
            <Phone className="w-4 h-4" />
            <span>+38 (067) 123-45-67</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
