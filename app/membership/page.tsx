"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star, ArrowRight, Crown, Sparkles, Gem } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    id: "gold", tier: "Gold", name: "Serenity", icon: Star,
    price: 4999, period: "/month", highlight: false,
    color: "from-gold/20 to-gold/5",
    description: "Perfect for those beginning their wellness journey",
    benefits: [
      "2 signature treatments per month",
      "10% off all services",
      "Priority booking access",
      "Welcome spa gift set",
      "Member-only seasonal events",
      "Complimentary birthday treatment",
    ],
  },
  {
    id: "platinum", tier: "Platinum", name: "Opulence", icon: Crown,
    price: 9999, period: "/month", highlight: true,
    color: "from-charcoal to-spa-dark",
    description: "Our most popular plan — complete luxury immersion",
    benefits: [
      "5 signature treatments per month",
      "20% off all services",
      "Dedicated personal therapist",
      "Complimentary luxury products",
      "Private treatment suite access",
      "Quarterly detox package",
      "2 guest passes per month",
      "24/7 concierge scheduling",
    ],
  },
  {
    id: "elite", tier: "Elite", name: "Transcendence", icon: Gem,
    price: 19999, period: "/month", highlight: false,
    color: "from-gold/10 to-spa-olive/10",
    description: "The ultimate in personalised wellness",
    benefits: [
      "Unlimited treatments",
      "30% off all retail products",
      "Personal wellness concierge",
      "Annual 3-day wellness retreat",
      "Exclusive member lounge access",
      "Seasonal curated gifting",
      "Home spa consultation",
      "Nutrition & lifestyle coaching",
    ],
  },
];

const faqs = [
  { q: "Can I pause my membership?", a: "Yes — members can pause their membership for up to 2 months per year. Simply contact your concierge 7 days in advance." },
  { q: "Do unused treatments roll over?", a: "Gold and Platinum treatments roll over for 30 days. Elite members can carry forward unlimited treatments." },
  { q: "Can I upgrade or downgrade anytime?", a: "Upgrades take effect immediately. Downgrades apply at the start of your next billing cycle." },
  { q: "Is there a joining fee?", a: "There is a one-time joining fee of ₹999 waived during our current launch period." },
  { q: "How does the guest pass work?", a: "Platinum guest passes allow you to bring a friend for any standard treatment at no extra charge." },
];

export default function MembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-cream-warm">

      {/* Hero */}
      <div className="pt-28 pb-20 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80')" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/8 rounded-full blur-[80px]" />
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute bottom-0 left-0 right-0" />
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold/60" />
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold">Exclusive Membership</span>
              <span className="w-8 h-px bg-gold/60" />
            </div>
            <h1 className="font-cormorant text-[clamp(3rem,6vw,5.5rem)] font-light text-cream leading-tight mb-6">
              Belong to Something<br />
              <em className="text-gold italic">Extraordinary</em>
            </h1>
            <p className="font-jost text-sm font-light text-cream/60 leading-relaxed max-w-md mx-auto">
              Join our circle of discerning members and unlock a world of unparalleled wellness privileges, year-round.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tiers */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
        <div ref={ref} className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`relative border transition-all duration-500 group ${
                  tier.highlight
                    ? "bg-charcoal border-transparent text-cream shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:-translate-y-6"
                    : "bg-cream border-sand hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:-translate-y-2"
                }`}
              >
                <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent ${!tier.highlight ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""}`} />
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold px-4 py-1.5">
                    <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-dark font-semibold">Most Popular</span>
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon size={16} className="text-gold" />
                    <span className="font-jost text-[9px] tracking-[0.4em] uppercase text-gold">{tier.tier}</span>
                  </div>
                  <h3 className={`font-cormorant text-3xl font-light mb-2 ${tier.highlight ? "text-cream" : "text-charcoal"}`}>{tier.name}</h3>
                  <p className={`font-jost text-xs mb-6 pb-6 border-b ${tier.highlight ? "text-cream/50 border-cream/10" : "text-stone border-sand"}`}>{tier.description}</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-cormorant text-5xl font-light text-gold">
                      ₹{tier.price.toLocaleString("en-IN")}
                    </span>
                    <span className={`font-jost text-sm font-light ${tier.highlight ? "text-cream/50" : "text-stone"}`}>{tier.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map(b => (
                      <li key={b} className="flex items-start gap-3">
                        <Check size={12} className="text-gold mt-0.5 shrink-0" />
                        <span className={`font-jost text-sm font-light ${tier.highlight ? "text-cream/70" : "text-spa-muted"}`}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className={`w-full block text-center font-jost text-xs tracking-[0.2em] uppercase py-4 transition-all duration-400 flex items-center justify-center gap-2 ${
                      tier.highlight
                        ? "bg-gold text-dark hover:bg-gold-light"
                        : "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream"
                    }`}
                  >
                    Begin Journey <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compare note */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          className="text-center font-jost text-xs text-stone mt-10"
        >
          All memberships include complimentary parking, welcome beverage, and use of relaxation facilities.
        </motion.p>
      </div>

      {/* Benefits strip */}
      <div className="bg-cream border-y border-sand py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "🎁", label: "Welcome Gift", desc: "Luxury spa kit on joining" },
              { icon: "⭐", label: "Priority Booking", desc: "First access to all slots" },
              { icon: "💆", label: "Dedicated Therapist", desc: "Platinum & Elite members" },
              { icon: "🍾", label: "Exclusive Events", desc: "Seasonal member nights" },
            ].map(item => (
              <div key={item.label} className="group">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-cormorant text-lg font-light text-charcoal group-hover:text-gold-deep transition-colors">{item.label}</div>
                <div className="font-jost text-xs text-stone mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[720px] mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">FAQ</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-cormorant text-4xl font-light text-charcoal">Common Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-sand bg-cream">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-cormorant text-lg font-light text-charcoal">{faq.q}</span>
                <span className={`font-jost text-gold text-lg transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="font-jost text-sm text-spa-muted leading-relaxed px-5 pb-5">{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
