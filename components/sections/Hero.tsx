"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number; maxLife: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 200,
      });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife) { p.life = 0; p.x = Math.random() * canvas.width; p.y = canvas.height; }
        const fade = p.life < 30 ? p.life / 30 : p.life > p.maxLife - 30 ? (p.maxLife - p.life) / 30 : 1;
        ctx.save();
        ctx.globalAlpha = p.opacity * fade;
        ctx.fillStyle = "#C9A96E";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[2]" />;
}

export function Hero() {
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 3.0 } } };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-cream-warm">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          transform: "scale(1.05)",
        }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-gold/[0.08] blur-[100px] pointer-events-none z-[1] animate-float" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] rounded-full bg-spa-olive/5 blur-[80px] pointer-events-none z-[1]" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/4 w-[200px] h-[200px] rounded-full bg-gold/[0.06] blur-[60px] pointer-events-none z-[1] animate-float" style={{ animationDelay: "1.5s" }} />

      <Particles />

      {/* Side text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 hidden lg:block"
      >
        <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-stone">Since 2015 · Hyderabad</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div variants={item} className="flex items-center justify-center gap-4 mb-6">
          <span className="w-10 h-px bg-gold" />
          <span className="font-jost text-[10px] tracking-[0.5em] uppercase text-gold-deep">Luxury Spa & Wellness</span>
          <span className="w-10 h-px bg-gold" />
        </motion.div>

        <motion.div variants={item}>
          <h1 className="font-cormorant font-light text-charcoal leading-[1.05] mb-4">
            <span className="block text-[clamp(3rem,8vw,6.5rem)] tracking-tight">Indulge in</span>
            <span className="block font-pinyon text-[clamp(3.5rem,9vw,8rem)] text-gold leading-[0.9]">Pure Luxury</span>
            <span className="block text-[clamp(3rem,8vw,6.5rem)] tracking-tight italic font-light">&amp; Wellness</span>
          </h1>
        </motion.div>

        <motion.p
          variants={item}
          className="font-jost font-light text-spa-muted text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10 tracking-wide"
        >
          A sanctuary where ancient rituals meet modern luxury. Surrender to pure indulgence.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="group relative overflow-hidden font-jost text-xs font-light tracking-[0.3em] uppercase bg-charcoal text-cream px-10 py-4 flex items-center gap-3 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              Book Appointment
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="absolute inset-0 flex items-center justify-center gap-3 font-jost text-xs font-light tracking-[0.3em] uppercase text-dark opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              Book Appointment <ArrowRight size={14} />
            </span>
          </Link>
          <Link
            href="/services"
            className="group font-jost text-xs font-light tracking-[0.3em] uppercase border border-stone/50 text-charcoal px-10 py-4 flex items-center gap-3 hover:border-gold hover:text-gold-deep transition-all duration-400"
          >
            Explore Treatments
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8 border-t border-sand/60"
        >
          {[
            { num: "10+", label: "Years of Excellence" },
            { num: "5K+", label: "Happy Clients" },
            { num: "30+", label: "Expert Therapists" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <span className="font-cormorant text-3xl font-light text-gold-deep block leading-none">{num}</span>
              <span className="font-jost text-[10px] tracking-[0.2em] uppercase text-stone mt-1 block">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-jost text-[9px] tracking-[0.4em] uppercase text-stone">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />
    </section>
  );
}
