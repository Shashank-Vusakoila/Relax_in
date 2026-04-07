"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section className="relative overflow-hidden bg-charcoal py-32 px-6">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/8 rounded-full blur-[80px]" />
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute top-0 left-0 right-0" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="font-pinyon text-gold text-3xl block mb-2">Begin your</span>
          <h2 className="font-cormorant text-[clamp(3rem,6vw,5.5rem)] font-light text-cream leading-tight mb-6">
            Wellness Journey<br />
            <em className="text-gold italic">Today</em>
          </h2>
          <p className="font-jost text-sm font-light text-cream/60 leading-relaxed mb-10 max-w-md mx-auto">
            Reserve your private retreat and let our therapists craft a journey uniquely yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="group relative overflow-hidden font-jost text-xs tracking-[0.3em] uppercase bg-gold text-dark px-10 py-4 flex items-center gap-3 hover:bg-gold-light transition-colors duration-400"
            >
              Reserve Your Experience
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+919876543210"
              className="group font-jost text-xs tracking-[0.3em] uppercase border border-cream/30 text-cream px-10 py-4 flex items-center gap-3 hover:border-gold/60 transition-all duration-400"
            >
              <Phone size={14} className="text-gold" />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute bottom-0 left-0 right-0" />
    </section>
  );
}
