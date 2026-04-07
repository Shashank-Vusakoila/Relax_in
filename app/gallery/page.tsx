"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Suites", "Treatments", "Facilities", "Ambiance"];

const photos = [
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", label: "The Grand Suite", category: "Suites", size: "large" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", label: "Stone Therapy", category: "Treatments", size: "small" },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80", label: "Luxury Facial", category: "Treatments", size: "small" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", label: "Aromatherapy", category: "Treatments", size: "small" },
  { src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80", label: "Ayurvedic Suite", category: "Suites", size: "large" },
  { src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80", label: "Deep Tissue", category: "Treatments", size: "small" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", label: "Hair Ritual", category: "Treatments", size: "small" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80", label: "Relaxation Pool", category: "Facilities", size: "large" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", label: "Expert Therapist", category: "Treatments", size: "small" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", label: "Reception Lounge", category: "Ambiance", size: "small" },
  { src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80", label: "Wellness Corridor", category: "Ambiance", size: "large" },
  { src: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1200&q=85", thumb: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80", label: "Steam Room", category: "Facilities", size: "small" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const prev = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <div className="min-h-screen bg-cream-warm pt-28 pb-20">

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Our Gallery</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-cormorant text-[clamp(3rem,6vw,5.5rem)] font-light text-charcoal leading-tight">
              Inside Our<br />
              <em className="text-gold-deep italic font-light">Sanctuary</em>
            </h1>
            <p className="font-jost text-sm font-light text-spa-muted max-w-xs leading-relaxed">
              Every corner of RelaxIn is designed to transport you. A visual journey through our world of indulgence.
            </p>
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="flex gap-3 flex-wrap mt-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-jost text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-charcoal text-cream border-charcoal"
                  : "border-sand text-stone hover:border-gold hover:text-gold-deep"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                onClick={() => setLightbox(i)}
                className="relative overflow-hidden cursor-pointer group break-inside-avoid mb-4"
              >
                <div
                  className="w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${photo.thumb})`,
                    paddingBottom: photo.size === "large" ? "133%" : "75%",
                  }}
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/55 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center">
                    <ZoomIn size={24} className="text-cream mx-auto mb-2" />
                    <span className="font-cormorant text-lg font-light text-cream">{photo.label}</span>
                    <div className="font-jost text-[9px] tracking-[0.2em] uppercase text-gold mt-1">{photo.category}</div>
                  </div>
                </div>
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/70 transition-all duration-500" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/0 group-hover:border-gold/70 transition-all duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 border border-cream/30 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-all">
              <X size={18} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-cream/30 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-cream/30 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-all">
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-5xl max-h-[85vh] relative"
              onClick={e => e.stopPropagation()}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${filtered[lightbox].src})`, minWidth: "min(80vw, 900px)", minHeight: "50vh", maxHeight: "80vh" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <p className="font-cormorant text-xl text-cream font-light">{filtered[lightbox].label}</p>
                <p className="font-jost text-[9px] tracking-[0.25em] uppercase text-gold mt-1">{filtered[lightbox].category}</p>
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-jost text-xs text-cream/40">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 text-center">
        <p className="font-cormorant text-2xl font-light text-charcoal mb-2 italic">Ready to experience it for yourself?</p>
        <Link href="/booking" className="inline-flex items-center gap-3 font-jost text-xs tracking-[0.3em] uppercase bg-charcoal text-cream px-10 py-4 hover:bg-gold-deep transition-colors mt-4">
          Book Your Visit
        </Link>
      </div>
    </div>
  );
}
