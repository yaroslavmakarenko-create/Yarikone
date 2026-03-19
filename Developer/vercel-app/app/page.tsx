import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Expertise } from "@/components/sections/Expertise";
import { Process } from "@/components/sections/Process";
import { Trust } from "@/components/sections/Trust";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Benefits />
      <Expertise />
      <Process />
      <Trust />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
