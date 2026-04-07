"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Pages that should NEVER show the splash loader
const NO_LOADER_PATHS = ["/admin", "/dashboard", "/login", "/register", "/booking"];

export function Loader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Never show on functional/auth pages
    if (NO_LOADER_PATHS.some(p => pathname.startsWith(p))) return;

    // Only show once per browser session (not on every page visit)
    const alreadySeen = sessionStorage.getItem("relaxin_loader_seen");
    if (alreadySeen) return;

    // Mark as seen immediately so navigating back won't re-trigger
    sessionStorage.setItem("relaxin_loader_seen", "1");
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-cream flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <p className="font-pinyon text-gold text-lg tracking-widest mb-2">Welcome to</p>
            <h1 className="font-cormorant text-5xl font-light text-charcoal tracking-[0.3em] uppercase">RelaxIn</h1>
            <p className="font-jost text-xs tracking-[0.5em] text-stone uppercase mt-2">Luxury Spa & Wellness</p>
          </motion.div>
          <motion.div className="mt-10 w-48 h-px bg-sand overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[0,1,2].map(i => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-gold"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
