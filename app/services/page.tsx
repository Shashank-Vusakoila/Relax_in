"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Clock, Star, ArrowRight, Filter } from "lucide-react";

const categories = ["All", "Massage", "Facial", "Ritual", "Therapy", "Hair"];

const services = [
  {
    id: "01", name: "Luxury Facial", tagline: "Signature Glow", category: "Facial",
    desc: "A transformative 90-minute ritual using rare botanical extracts, 24K gold leaf infusions, and micro-current therapy. Restores luminosity and deep hydration.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&q=80",
    price: 4500, duration: "90 min", rating: 4.9,
    includes: ["Gold leaf infusion", "Botanical extracts", "Micro-current therapy", "Neck & décolleté"],
  },
  {
    id: "02", name: "Aromatherapy Massage", tagline: "Essence Journey", category: "Massage",
    desc: "Drift into bliss with our master blend of rare essential oils — bergamot, neroli, and jasmine — designed to unlock total renewal of body and mind.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80",
    price: 3800, duration: "75 min", rating: 4.8,
    includes: ["Custom oil blend", "Full body massage", "Scalp treatment", "Warm compress"],
  },
  {
    id: "03", name: "Hot Stone Therapy", tagline: "Earth's Warmth", category: "Therapy",
    desc: "Volcanic basalt stones heated to the perfect temperature melt away deep-seated tension, improve circulation, and restore the body's natural energy flow.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=80",
    price: 5200, duration: "120 min", rating: 5.0,
    includes: ["Volcanic basalt stones", "Full body placement", "Muscle tension release", "Grounding meditation"],
  },
  {
    id: "04", name: "Royal Ayurvedic Ceremony", tagline: "Ancient Wisdom", category: "Ritual",
    desc: "Five-thousand years of healing science meets modern luxury. A full ceremony with Abhyanga oil massage, Shirodhara, and herbal steam — completely immersive.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=700&q=80",
    price: 6000, duration: "150 min", rating: 4.9,
    includes: ["Abhyanga oil massage", "Shirodhara therapy", "Herbal steam bath", "Ayurvedic consultation"],
  },
  {
    id: "05", name: "Hair Spa Ritual", tagline: "Crown Therapy", category: "Hair",
    desc: "Restore your crown's natural vitality with organic protein treatments, scalp revitalisation, and a deep conditioning ritual using Argan and Marula oils.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    price: 2800, duration: "60 min", rating: 4.7,
    includes: ["Organic protein mask", "Scalp massage", "Argan & Marula oils", "Blow-dry finish"],
  },
  {
    id: "06", name: "Deep Tissue Massage", tagline: "Core Release", category: "Massage",
    desc: "Precision therapeutic techniques targeting the deepest layers of muscle and fascia. Ideal for chronic tension, sports recovery, and postural correction.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=700&q=80",
    price: 4200, duration: "90 min", rating: 4.8,
    includes: ["Deep muscle technique", "Trigger point therapy", "Fascia release", "Recovery stretching"],
  },
  {
    id: "07", name: "Himalayan Salt Scrub", tagline: "Renewal Ritual", category: "Ritual",
    desc: "Pure Himalayan salt crystals blended with cold-pressed rose hip and vitamin E oils exfoliate, detoxify and leave skin impossibly soft and radiant.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=700&q=80",
    price: 3200, duration: "60 min", rating: 4.7,
    includes: ["Himalayan salt crystals", "Rose hip oil blend", "Full body exfoliation", "Moisturising wrap"],
  },
  {
    id: "08", name: "Couple's Retreat", tagline: "Together", category: "Ritual",
    desc: "Share the ultimate wellness experience in our private suite — synchronised massages, Champagne, rose petal bath, and a personalised aromatherapy journey.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80",
    price: 9500, duration: "180 min", rating: 5.0,
    includes: ["Private suite", "Synchronised massages", "Rose petal bath", "Champagne & canapes"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="group bg-cream border border-sand/60 hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)] transition-all duration-700"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <span className="absolute top-4 right-4 font-cormorant text-5xl font-light text-cream/20 leading-none select-none">{service.id}</span>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <span className="font-cormorant text-2xl text-gold block leading-none">
              ₹{service.price.toLocaleString("en-IN")}
            </span>
            <span className="font-jost text-[10px] tracking-[0.2em] text-cream/70 uppercase">{service.duration}</span>
          </div>
          <div className="flex items-center gap-1 bg-cream/20 backdrop-blur-sm px-2 py-1">
            <Star size={10} className="text-gold fill-gold" />
            <span className="font-jost text-[10px] text-cream">{service.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="font-jost text-[9px] tracking-[0.4em] uppercase text-gold-deep mb-2 block">{service.tagline}</span>
        <h3 className="font-cormorant text-2xl font-light text-charcoal mb-2 group-hover:text-gold-deep transition-colors duration-400">
          {service.name}
        </h3>
        <p className="font-jost text-sm font-light text-spa-muted leading-relaxed mb-4">{service.desc}</p>

        {/* Includes */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 border-t border-sand">
                <p className="font-jost text-[9px] tracking-[0.25em] uppercase text-gold-deep mb-3">What&apos;s Included</p>
                <ul className="space-y-1.5">
                  {service.includes.map(item => (
                    <li key={item} className="flex items-center gap-2 font-jost text-xs text-spa-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4 border-t border-sand/60 mt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-jost text-[10px] tracking-[0.15em] uppercase text-stone hover:text-gold-deep transition-colors"
          >
            {expanded ? "Less ↑" : "Details ↓"}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-stone">
              <Clock size={11} />
              <span className="font-jost text-xs">{service.duration}</span>
            </div>
            <Link
              href="/booking"
              className="flex items-center gap-2 font-jost text-[10px] tracking-[0.2em] uppercase text-charcoal hover:text-gold-deep transition-colors group/btn"
            >
              Book <ArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeCategory === "All"
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream-warm pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Signature Treatments</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-cormorant text-[clamp(3rem,6vw,5.5rem)] font-light text-charcoal leading-tight">
              Curated for the<br />
              <em className="text-gold-deep italic font-light">Discerning Soul</em>
            </h1>
            <div className="max-w-sm">
              <p className="font-jost text-sm font-light text-spa-muted leading-relaxed">
                Each treatment is a masterpiece crafted by our expert therapists — honouring ancient wisdom with modern luxury.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap mt-10">
            <Filter size={13} className="text-stone" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-jost text-xs tracking-[0.18em] uppercase px-5 py-2 border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-charcoal text-cream border-charcoal"
                    : "border-sand text-stone hover:border-gold hover:text-gold-deep"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="mt-24 bg-charcoal p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80')" }} />
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute top-0 left-0 right-0" />
          <div className="relative z-10">
            <span className="font-pinyon text-gold text-2xl block mb-2">Begin your</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream mb-4">
              Wellness Journey <em className="text-gold italic">Today</em>
            </h2>
            <p className="font-jost text-sm text-cream/60 mb-8 max-w-md mx-auto">
              Not sure which treatment is right for you? Our wellness consultants are happy to guide you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking" className="font-jost text-xs tracking-[0.3em] uppercase bg-gold text-dark px-10 py-4 hover:bg-gold-light transition-colors flex items-center gap-2">
                Book Now <ArrowRight size={13} />
              </Link>
              <Link href="/contact" className="font-jost text-xs tracking-[0.3em] uppercase border border-cream/30 text-cream px-10 py-4 hover:border-gold/60 transition-colors">
                Speak to Us
              </Link>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute bottom-0 left-0 right-0" />
        </div>
      </div>
    </div>
  );
}
