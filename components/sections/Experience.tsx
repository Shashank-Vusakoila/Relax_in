"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Leaf, Shield, Award, Sparkles } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Organic", text: "Every product and ingredient is certified organic, sourced from ethical farms worldwide." },
  { icon: Shield, title: "Private Suites", text: "Luxurious private treatment suites ensuring absolute discretion and comfort." },
  { icon: Award, title: "Award-Winning", text: "Recognised as India's #1 luxury spa for three consecutive years." },
  { icon: Sparkles, title: "Expert Therapists", text: "Our certified therapists train for years in international wellness institutes." },
];

const imageGrid = [
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", label: "Private Suites" },
  { src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80", label: "Organic Rituals" },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={containerRef} className="section-padding bg-charcoal relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-spa-olive/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold/60" />
                <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold">The Experience</span>
              </div>
              <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-tight mb-6">
                A World Apart,<br />
                <em className="text-gold italic font-light">Within Reach</em>
              </h2>
              <p className="font-jost text-sm font-light text-cream/60 leading-relaxed mb-10 max-w-md">
                Step into RelaxIn and leave the world behind. Our sanctuary is designed to awaken every sense — from the scent of rare botanicals to the touch of the finest linens.
              </p>
            </motion.div>

            <div className="space-y-6">
              {features.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                  className="flex gap-5 pb-6 border-b border-cream/8 last:border-0 group hover:border-gold/20 transition-colors duration-400"
                >
                  <div className="w-11 h-11 border border-gold/30 flex items-center justify-center shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-400">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-cormorant text-xl font-light text-cream mb-1 group-hover:text-gold transition-colors duration-300">{title}</h4>
                    <p className="font-jost text-xs font-light text-cream/50 leading-relaxed">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image side with 3D parallax */}
          <div className="relative h-[600px] perspective-[1000px]">
            {/* Main large image */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, rotateY: -5 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute top-0 right-0 w-[72%] h-[65%] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageGrid[0].src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/30" />
              <div className="absolute bottom-0 left-0 bg-cream/95 px-4 py-2">
                <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-charcoal">Private Suites</span>
              </div>
              {/* Inner border effect */}
              <div className="absolute inset-[10px] border border-gold/20 pointer-events-none" />
            </motion.div>

            {/* Small bottom-left image */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, rotateY: 5 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute bottom-0 left-0 w-[55%] h-[52%] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageGrid[1].src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              <div className="absolute bottom-0 left-0 bg-cream/95 px-4 py-2">
                <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-charcoal">Organic Rituals</span>
              </div>
            </motion.div>

            {/* Rotating badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-[40%] left-[36%] z-10 w-24 h-24 bg-cream border border-sand/60 rounded-full flex flex-col items-center justify-center shadow-xl"
            >
              <span className="font-cormorant text-2xl font-light text-gold-deep leading-none">10+</span>
              <span className="font-jost text-[8px] tracking-[0.15em] uppercase text-stone text-center leading-tight">Years of<br />Excellence</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
