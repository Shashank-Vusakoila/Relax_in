"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/actions";

const links = [
  { label: "Services", href: "/services" },
  { label: "Membership", href: "/membership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user: u } }) => {
      if (u) {
        const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", u.id).single();
        setUser({ name: profile?.full_name || u.email?.split("@")[0], email: u.email });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", session.user.id).single();
        setUser({ name: profile?.full_name || session.user.email?.split("@")[0], email: session.user.email });
      } else {
        setUser(null);
      }
    });
    return () => { window.removeEventListener("scroll", onScroll); subscription.unsubscribe(); };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? "py-3 bg-cream/95 backdrop-blur-xl border-b border-sand/50 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-pinyon text-gold text-2xl group-hover:text-gold-deep transition-colors">Relax</span>
            <span className="font-cormorant text-charcoal text-2xl font-light tracking-[0.3em] uppercase -mt-1 group-hover:tracking-[0.35em] transition-all duration-500">In</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link href={href}
                  className="relative font-jost text-xs font-light tracking-[0.2em] uppercase text-spa-text hover:text-gold-deep transition-colors duration-300 group">
                  {label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 border border-sand px-4 py-2 hover:border-gold/40 transition-all duration-400 group">
                  <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center">
                    <User size={12} className="text-gold-deep" />
                  </div>
                  <span className="font-jost text-xs text-charcoal group-hover:text-gold-deep transition-colors">{user.name}</span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full mt-2 bg-cream border border-sand shadow-lg w-48 z-50">
                      <div className="p-3 border-b border-sand">
                        <p className="font-cormorant text-base text-charcoal">{user.name}</p>
                        <p className="font-jost text-[10px] text-stone">{user.email}</p>
                      </div>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 font-jost text-xs text-spa-text hover:text-gold-deep hover:bg-gold/[0.03] transition-all">
                        <User size={12} /> My Bookings
                      </Link>
                      <button onClick={() => { setUserMenuOpen(false); signOut(); }}
                        className="w-full flex items-center gap-2 px-4 py-3 font-jost text-xs text-red-400 hover:bg-red-50 transition-all border-t border-sand">
                        <LogOut size={12} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login"
                className="font-jost text-xs font-light tracking-[0.2em] uppercase border border-stone/40 text-charcoal px-4 py-2.5 hover:border-gold/60 hover:text-gold-deep transition-all duration-400">
                Sign In
              </Link>
            )}
            <Link href="/booking"
              className="relative overflow-hidden font-jost text-xs font-light tracking-[0.25em] uppercase bg-charcoal text-cream px-6 py-3 group transition-all duration-400">
              <span className="relative z-10">Book Now</span>
              <span className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              <span className="absolute inset-0 flex items-center justify-center font-jost text-xs font-light tracking-[0.25em] uppercase text-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">Book Now</span>
            </Link>
          </div>

          <button className="md:hidden text-charcoal" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-cream/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
            <button className="absolute top-6 right-6 text-charcoal" onClick={() => setOpen(false)}><X size={24} /></button>
            {links.map(({ label, href }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={href} onClick={() => setOpen(false)}
                  className="font-cormorant text-4xl font-light text-charcoal hover:text-gold transition-colors tracking-wider">{label}</Link>
              </motion.div>
            ))}
            <div className="flex flex-col items-center gap-3 mt-4">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="font-jost text-xs tracking-[0.25em] uppercase border border-sand text-charcoal px-8 py-3">My Dashboard</Link>
                  <button onClick={() => { setOpen(false); signOut(); }} className="font-jost text-xs tracking-[0.25em] uppercase text-red-400">Sign Out</button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="font-jost text-xs tracking-[0.25em] uppercase border border-sand text-charcoal px-8 py-3">Sign In</Link>
              )}
              <Link href="/booking" onClick={() => setOpen(false)} className="font-jost text-xs tracking-[0.3em] uppercase bg-charcoal text-cream px-10 py-4">Book Appointment</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
