"use client";
export function Marquee() {
  const items = ["Luxury Facial", "Aromatherapy", "Hot Stone Therapy", "Ayurvedic Ritual", "Deep Tissue Massage", "Hair Spa", "Body Wraps", "Signature Rituals"];
  return (
    <div className="bg-charcoal overflow-hidden py-5 border-y border-gold/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="font-cormorant text-base font-light text-cream/70 tracking-[0.2em] uppercase">{item}</span>
            <span className="text-gold text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
