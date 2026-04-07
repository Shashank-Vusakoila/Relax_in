"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";

const services = [
  {
    id: "01",
    name: "Luxury Facial",
    tagline: "Signature Glow",
    desc: "A transformative 90-minute ritual using rare botanical extracts and gold leaf infusions.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
    price: "₹4,500",
    duration: "90 min",
    rating: 4.9,
  },
  {
    id: "02",
    name: "Aromatherapy",
    tagline: "Essence Journey",
    desc: "Drift into bliss with our master blend of essential oils, designed for total renewal.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    price: "₹3,800",
    duration: "75 min",
    rating: 4.8,
  },
  {
    id: "03",
    name: "Hot Stone Therapy",
    tagline: "Earth's Warmth",
    desc: "Volcanic basalt stones heated to perfection melt tension and restore inner balance.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    price: "₹5,200",
    duration: "120 min",
    rating: 5.0,
  },
  {
    id: "04",
    name: "Ayurvedic Ritual",
    tagline: "Ancient Wisdom",
    desc: "Five-thousand year old healing science meets modern luxury in this immersive ceremony.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
    price: "₹6,000",
    duration: "150 min",
    rating: 4.9,
  },
  {
    id: "05",
    name: "Hair Spa Ritual",
    tagline: "Crown Therapy",
    desc: "Nourish your crown with organic protein treatments and scalp revitalisation techniques.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    price: "₹2,800",
    duration: "60 min",
    rating: 4.7,
  },
  {
    id: "06",
    name: "Deep Tissue Massage",
    tagline: "Core Release",
    desc: "Precision therapeutic techniques that reach the deepest layers of muscle and fascia.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
    price: "₹4,200",
    duration: "90 min",
    rating: 4.8,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden bg-cream border border-sand/60 hover:border-gold/40 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

        {/* Number overlay */}
        <span className="absolute top-4 right-4 font-cormorant text-5xl font-light text-cream/20 leading-none select-none">
          {service.id}
        </span>

        {/* Price & Duration */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <span className="font-pinyon text-gold text-2xl block leading-none">{service.price}</span>
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

        <div className="flex items-center justify-between pt-4 border-t border-sand/60">
          <div className="flex items-center gap-1 text-stone">
            <Clock size={11} />
            <span className="font-jost text-xs">{service.duration}</span>
          </div>
          <Link
            href="/booking"
            className="group/btn flex items-center gap-2 font-jost text-[10px] tracking-[0.2em] uppercase text-charcoal hover:text-gold-deep transition-colors"
          >
            Book Now
            <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Gold accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
}

export function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-cream-warm">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Signature Treatments</span>
            </div>
            <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4.5rem)] font-light text-charcoal leading-tight">
              Curated for the<br />
              <em className="text-gold-deep not-italic font-light italic">Discerning Soul</em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-xs"
          >
            <p className="font-jost text-sm font-light text-spa-muted leading-relaxed">
              Each treatment is a masterpiece, crafted by experts with a passion for holistic wellbeing.
            </p>
            <Link href="/services" className="inline-flex items-center gap-2 mt-4 font-jost text-xs tracking-[0.2em] uppercase text-gold-deep hover:text-gold transition-colors group">
              View All Services
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
