"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Головна", href: "#home" },
  { id: "about", label: "Про мене", href: "#about" },
  { id: "services", label: "Послуги", href: "#services" },
  { id: "process", label: "Етапи", href: "#process" },
  { id: "testimonials", label: "Відгуки", href: "#testimonials" },
  { id: "contact", label: "Контакти", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-primary-dark/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }} className="flex flex-col">
            <span className="text-white font-playfair text-xl font-semibold">Yaroslav Makarenko</span>
            <span className="text-accent-gold text-xs tracking-wider uppercase">Real Estate Expert</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-white/80 hover:text-accent-gold text-sm font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
              className="hidden md:flex items-center gap-2 bg-accent-gold text-primary-dark px-5 py-2.5 rounded font-montserrat text-sm font-semibold uppercase tracking-wider hover:bg-accent-gold/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Зв&apos;язатися
            </a>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-primary-dark/95 backdrop-blur-md"
      >
        <nav className="flex flex-col p-5 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className="text-white/80 hover:text-accent-gold text-lg font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
