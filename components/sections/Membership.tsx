"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    id: "gold",
    tier: "Gold",
    name: "Serenity",
    price: "₹4,999",
    period: "/month",
    highlight: false,
    benefits: [
      "2 signature treatments/month",
      "10% off all services",
      "Priority booking",
      "Welcome spa gift",
      "Member-only events",
    ],
  },
  {
    id: "platinum",
    tier: "Platinum",
    name: "Opulence",
    price: "₹9,999",
    period: "/month",
    highlight: true,
    benefits: [
      "5 signature treatments/month",
      "20% off all services",
      "Dedicated therapist",
      "Complimentary products",
      "Private suite access",
      "Quarterly detox package",
      "Guest passes (2/month)",
    ],
  },
  {
    id: "elite",
    tier: "Elite",
    name: "Transcendence",
    price: "₹19,999",
    period: "/month",
    highlight: false,
    benefits: [
      "Unlimited treatments",
      "30% off retail products",
      "Personal wellness concierge",
      "Annual wellness retreat",
      "Exclusive member lounge",
      "Seasonal gifting",
      "24/7 scheduling",
    ],
  },
];

export function Membership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-cream">
      <div ref={ref} className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Exclusive Membership</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4.5rem)] font-light text-charcoal leading-tight">
            Belong to Something<br />
            <em className="text-gold-deep italic font-light">Extraordinary</em>
          </h2>
          <p className="font-jost text-sm font-light text-spa-muted mt-4 max-w-md mx-auto leading-relaxed">
            Join our circle of discerning members and unlock a world of unparalleled wellness privileges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`relative border transition-all duration-500 group cursor-pointer ${
                tier.highlight
                  ? "bg-charcoal border-transparent text-cream shadow-[0_20px_60px_rgba(0,0,0,0.15)] md:-translate-y-4"
                  : "bg-cream border-sand hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:-translate-y-2"
              }`}
            >
              {/* Top gold bar */}
              <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent ${!tier.highlight ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""}`} />

              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold px-4 py-1">
                  <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-dark font-medium">Most Popular</span>
                </div>
              )}

              <div className="p-8">
                <span className="font-jost text-[9px] tracking-[0.4em] uppercase text-gold block mb-1">{tier.tier}</span>
                <h3 className={`font-cormorant text-3xl font-light mb-6 pb-6 border-b ${tier.highlight ? "text-cream border-cream/10" : "text-charcoal border-sand"}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="font-cormorant text-5xl font-light text-gold">{tier.price}</span>
                  <span className={`font-jost text-sm font-light ${tier.highlight ? "text-cream/50" : "text-stone"}`}>{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map(b => (
                    <li key={b} className="flex items-start gap-3">
                      <Check size={13} className="text-gold mt-0.5 shrink-0" />
                      <span className={`font-jost text-sm font-light ${tier.highlight ? "text-cream/70" : "text-spa-muted"}`}>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/membership"
                  className={`w-full block text-center font-jost text-xs tracking-[0.2em] uppercase py-4 transition-all duration-400 ${
                    tier.highlight
                      ? "bg-gold text-dark hover:bg-gold-light"
                      : "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream"
                  }`}
                >
                  Begin Journey
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
