"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Link from "next/link";

const gallery = [
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", label: "Relaxation Suite", size: "large" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", label: "Expert Therapists", size: "small" },
  { src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80", label: "Signature Massage", size: "small" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", label: "Steam & Sauna", size: "small" },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80", label: "Luxury Facial", size: "large" },
  { src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80", label: "Ayurvedic Room", size: "small" },
];

export function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section-padding bg-cream">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Gallery</span>
            </div>
            <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4.5rem)] font-light text-charcoal leading-tight">
              Inside Our<br />
              <em className="text-gold-deep italic font-light">Sanctuary</em>
            </h2>
          </div>
          <Link href="/gallery" className="font-jost text-xs tracking-[0.25em] uppercase border border-stone/40 text-charcoal px-6 py-3 hover:border-gold hover:text-gold-deep transition-all duration-400 self-start">
            View Full Gallery
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative overflow-hidden cursor-pointer group ${
                item.size === "large" ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.src})` }}
              />
              <div className={`absolute inset-0 bg-charcoal/50 transition-opacity duration-500 ${hovered === i ? "opacity-80" : "opacity-0"}`} />
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hovered === i ? "opacity-100" : "opacity-0"}`}>
                <div className="text-center">
                  <div className="w-8 h-px bg-gold mx-auto mb-3" />
                  <span className="font-cormorant text-xl font-light text-cream">{item.label}</span>
                </div>
              </div>
              {/* Gold corner accent */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
