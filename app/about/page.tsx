"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const team = [
  { name: "Riya Kapoor", role: "Founder & Wellness Director", bio: "Certified in Kerala Ayurveda, trained across Bali, Japan, and Switzerland. Riya founded RelaxIn with one mission — to bring world-class wellness to Hyderabad.", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face" },
  { name: "Ananya Singh", role: "Head Therapist", bio: "10+ years of mastery in aromatherapy and holistic wellness. Trained in Paris. Ananya has personally designed every treatment protocol at RelaxIn.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face" },
  { name: "Priya Nair", role: "Therapy Specialist", bio: "Expert in hot stone, deep tissue, and sports recovery. Priya's precision technique has made her one of the most sought-after therapists in the city.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face" },
  { name: "Meera Iyer", role: "Hair & Scalp Expert", bio: "Ayurvedic hair restoration specialist with a deep passion for organic haircare. Meera's treatments combine ancient Indian rituals with modern science.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face" },
];

const values = [
  { icon: "🌿", title: "Pure & Organic", desc: "Every product is certified organic, ethically sourced, and free from harmful chemicals. We believe what goes on your body matters as much as what goes in it." },
  { icon: "🤝", title: "Personalised Care", desc: "No two guests are the same. Each treatment is tailored to your unique needs, skin type, stress levels, and wellness goals by our expert therapists." },
  { icon: "✨", title: "Uncompromising Quality", desc: "From Egyptian cotton linens to rare botanical extracts — every element of your experience is curated to the highest possible standard." },
  { icon: "🧘", title: "Holistic Wellbeing", desc: "We treat the whole person — body, mind, and spirit. Our approach combines ancient Eastern wisdom with evidence-based modern wellness science." },
];

const milestones = [
  { year: "2015", event: "RelaxIn founded in Hyderabad by Riya Kapoor" },
  { year: "2017", event: "Awarded Best Luxury Spa in Hyderabad — Times Food & Nightlife" },
  { year: "2019", event: "Expanded to 3 private suites, launched Ayurvedic Ceremony" },
  { year: "2021", event: "Ranked India's Top 10 Luxury Spas by Condé Nast Traveller" },
  { year: "2023", event: "Launched Elite Membership — first 100 members fully booked in 48 hours" },
  { year: "2025", event: "Celebrating 10 years, 5,000+ happy clients and counting" },
];

export default function AboutPage() {
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-cream-warm">

      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=85')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/20" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 pt-40">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold/60" />
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold">Our Story</span>
            </div>
            <h1 className="font-cormorant text-[clamp(3rem,7vw,7rem)] font-light text-cream leading-[1.0] max-w-3xl">
              A Decade of<br />
              <em className="text-gold italic">Pure Luxury</em>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div ref={ref1} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Who We Are</span>
            </div>
            <h2 className="font-cormorant text-[clamp(2.2rem,4vw,3.8rem)] font-light text-charcoal leading-tight mb-6">
              Born from a passion<br />
              <em className="text-gold-deep italic">for pure wellness</em>
            </h2>
            <p className="font-jost text-sm font-light text-spa-muted leading-relaxed mb-6">
              RelaxIn was founded in 2015 by Riya Kapoor — a certified Ayurvedic practitioner who had spent years training across the world's finest wellness destinations. She returned to Hyderabad with one vision: to create a sanctuary that would rival the best spas in the world, right here at home.
            </p>
            <p className="font-jost text-sm font-light text-spa-muted leading-relaxed mb-8">
              Today, RelaxIn is home to 30+ expert therapists, offers 20+ bespoke treatments, and has become the most trusted name in luxury wellness in Hyderabad. Every treatment, every product, every detail has been curated with an obsessive attention to quality.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-sand">
              {[{ num: "10+", label: "Years" }, { num: "5K+", label: "Clients" }, { num: "30+", label: "Therapists" }].map(s => (
                <div key={s.label} className="text-center">
                  <span className="font-cormorant text-4xl font-light text-gold-deep block">{s.num}</span>
                  <span className="font-jost text-[9px] tracking-[0.25em] uppercase text-stone mt-1 block">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }}
            className="relative h-[560px]">
            <div className="absolute top-0 right-0 w-[75%] h-[70%] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80')" }} />
              <div className="absolute inset-[10px] border border-gold/20 pointer-events-none" />
            </div>
            <div className="absolute bottom-0 left-0 w-[55%] h-[55%] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] border-4 border-cream-warm">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80')" }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-charcoal py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[80px]" />
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute top-0 left-0 right-0" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold/60" />
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold">Our Philosophy</span>
              <span className="w-8 h-px bg-gold/60" />
            </div>
            <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4rem)] font-light text-cream">What We Stand For</h2>
          </div>
          <div ref={ref2} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="border border-cream/10 p-7 hover:border-gold/30 transition-all duration-400 group"
              >
                <div className="text-3xl mb-5">{v.icon}</div>
                <h3 className="font-cormorant text-xl font-light text-cream mb-3 group-hover:text-gold transition-colors">{v.title}</h3>
                <p className="font-jost text-xs font-light text-cream/50 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute bottom-0 left-0 right-0" />
      </div>

      {/* Team */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">The Team</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4rem)] font-light text-charcoal">
            Masters of Their <em className="text-gold-deep italic">Craft</em>
          </h2>
        </div>
        <div ref={ref3} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden h-80 mb-5">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <div className="absolute inset-[10px] border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
              </div>
              <h3 className="font-cormorant text-xl font-light text-charcoal group-hover:text-gold-deep transition-colors">{member.name}</h3>
              <p className="font-jost text-[9px] tracking-[0.2em] uppercase text-gold-deep mt-1 mb-3">{member.role}</p>
              <p className="font-jost text-xs text-spa-muted leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-cream py-24">
        <div className="max-w-[720px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Milestones</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-cormorant text-4xl font-light text-charcoal">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-sand" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex gap-8 items-start"
                >
                  <div className="w-[60px] text-right shrink-0">
                    <span className="font-cormorant text-2xl font-light text-gold-deep">{m.year}</span>
                  </div>
                  <div className="relative flex-1 pb-2">
                    <div className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-gold border-2 border-cream-warm" />
                    <p className="font-jost text-sm text-charcoal leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-cream-warm py-20 text-center">
        <p className="font-cormorant text-3xl font-light text-charcoal mb-2 italic">Come experience it yourself</p>
        <p className="font-jost text-sm text-spa-muted mb-8">Join 5,000+ guests who&apos;ve made RelaxIn their wellness home</p>
        <Link href="/booking" className="inline-flex items-center gap-3 font-jost text-xs tracking-[0.3em] uppercase bg-charcoal text-cream px-10 py-4 hover:bg-gold-deep transition-colors">
          Book Your Treatment <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
