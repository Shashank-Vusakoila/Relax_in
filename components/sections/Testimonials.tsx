"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Creative Director, Mumbai",
    text: "RelaxIn is not just a spa — it's a transformative experience. The Ayurvedic ritual left me feeling reborn. The therapists are pure artists. I've been to spas across the world and nothing compares.",
    rating: 5,
    treatment: "Ayurvedic Ritual",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Arjun Mehta",
    role: "Tech Entrepreneur, Hyderabad",
    text: "Every detail at RelaxIn is perfection. From the moment you walk in, the scent, the ambiance, the warm reception — it's an entirely different world. The hot stone therapy was life-changing.",
    rating: 5,
    treatment: "Hot Stone Therapy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Ananya Krishnan",
    role: "Wellness Blogger",
    text: "I've visited over 50 luxury spas globally and RelaxIn ranks among the finest. The luxury facial used ingredients I'd never encountered before — pure botanical luxury. Absolutely worth every rupee.",
    rating: 5,
    treatment: "Luxury Facial",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Vikram Rao",
    role: "Film Director",
    text: "The membership is the best investment I've made for my wellbeing. My dedicated therapist understands exactly what my body needs. RelaxIn isn't a luxury — it's a necessity for the modern life.",
    rating: 5,
    treatment: "Platinum Member",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-padding bg-cream-warm relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div ref={ref} className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Testimonials</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4.5rem)] font-light text-charcoal leading-tight">
            Words from Our<br />
            <em className="text-gold-deep italic">Beloved Guests</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-cream border border-sand/80 p-10 md:p-14 relative"
            >
              {/* Quote icon */}
              <Quote size={40} className="text-gold/20 absolute top-8 left-8" />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array(testimonials[current].rating).fill(0).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="font-cormorant text-xl md:text-2xl font-light text-charcoal leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center border border-sand"
                  style={{ backgroundImage: `url(${testimonials[current].avatar})` }}
                />
                <div className="text-left">
                  <p className="font-cormorant text-lg font-light text-charcoal">{testimonials[current].name}</p>
                  <p className="font-jost text-xs text-stone">{testimonials[current].role}</p>
                </div>
                <div className="ml-4 pl-4 border-l border-sand">
                  <span className="font-jost text-[9px] tracking-[0.2em] uppercase text-gold-deep">{testimonials[current].treatment}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 border border-sand flex items-center justify-center text-stone hover:border-gold hover:text-gold-deep transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-400 ${i === current ? "w-8 h-1 bg-gold" : "w-1 h-1 rounded-full bg-sand"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 border border-sand flex items-center justify-center text-stone hover:border-gold hover:text-gold-deep transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
