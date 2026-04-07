"use client";
import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 relative overflow-hidden">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-pinyon text-gold text-3xl block">Relax</span>
              <span className="font-cormorant text-cream text-3xl font-light tracking-[0.3em] uppercase -mt-2 block">In</span>
            </div>
            <p className="font-jost text-sm font-light leading-relaxed text-cream/60 mb-6">
              Where indulgence meets serenity. A sanctuary crafted for those who seek the extraordinary.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-cream/20 flex items-center justify-center text-cream/60 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-jost text-xs tracking-[0.3em] uppercase text-gold mb-6">Explore</h4>
            <ul className="space-y-3">
              {["Services", "Treatments", "Membership", "Gallery", "About Us", "Contact"].map(item => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="font-jost text-sm font-light text-cream/60 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-jost text-xs tracking-[0.3em] uppercase text-gold mb-6">Treatments</h4>
            <ul className="space-y-3">
              {["Luxury Facial", "Aromatherapy", "Hot Stone Therapy", "Ayurvedic Ritual", "Deep Tissue Massage", "Hair Spa"].map(item => (
                <li key={item}>
                  <span className="font-jost text-sm font-light text-cream/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-jost text-xs tracking-[0.3em] uppercase text-gold mb-6">Visit Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <p className="font-jost text-sm font-light text-cream/60 leading-relaxed">
                  12 Serenity Lane, Wellness District<br />Hyderabad, TS 500001
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={14} className="text-gold shrink-0" />
                <p className="font-jost text-sm font-light text-cream/60">+91 98765 43210</p>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={14} className="text-gold shrink-0" />
                <p className="font-jost text-sm font-light text-cream/60">hello@relaxin.spa</p>
              </div>
              <p className="font-jost text-xs font-light text-cream/40 mt-2">Mon–Sun: 9:00 AM – 9:00 PM</p>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="font-jost text-xs tracking-[0.2em] uppercase text-cream/60 mb-3">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-cream/10 border border-cream/20 px-4 py-3 text-xs font-light text-cream placeholder:text-cream/40 outline-none focus:border-gold/50 transition-colors"
                />
                <button className="bg-gold px-4 flex items-center justify-center hover:bg-gold-deep transition-colors">
                  <ArrowRight size={14} className="text-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-jost text-xs font-light text-cream/40 tracking-wider">
            © 2025 RelaxIn Luxury Spa & Wellness. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
              <a key={item} href="#" className="font-jost text-xs text-cream/40 hover:text-gold/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
