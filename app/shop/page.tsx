"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBag, Star, Check, ArrowRight, Gift, X } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const categories = ["All", "Skincare", "Oils & Serums", "Gift Sets", "Candles", "Vouchers"];

const products = [
  {
    id: "p1", name: "Gold Leaf Facial Oil", category: "Oils & Serums",
    desc: "24K gold infused with rosehip and marula oils. The same formula used in our Luxury Facial treatment.",
    price: 2800, rating: 4.9, reviews: 124, badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
  },
  {
    id: "p2", name: "Botanical Cleansing Balm", category: "Skincare",
    desc: "A melt-away cleansing balm with chamomile, calendula and sweet almond oil. Double-cleanse perfection.",
    price: 1800, rating: 4.8, reviews: 86, badge: null,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
  },
  {
    id: "p3", name: "Luxury Spa Gift Set", category: "Gift Sets",
    desc: "The perfect gift — our top 4 bestselling products beautifully packaged in a handcrafted keepsake box.",
    price: 5999, rating: 5.0, reviews: 48, badge: "Gift Favourite",
    image: "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=500&q=80",
  },
  {
    id: "p4", name: "Himalayan Salt Body Scrub", category: "Skincare",
    desc: "Pure Himalayan crystals blended with cold-pressed rose hip oil. Exfoliates, detoxes and deeply nourishes.",
    price: 1400, rating: 4.7, reviews: 92, badge: null,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
  },
  {
    id: "p5", name: "Aromatherapy Candle Set", category: "Candles",
    desc: "Three hand-poured soy candles — Jasmine & Sandalwood, White Tea, and Bergamot & Neroli.",
    price: 2200, rating: 4.9, reviews: 63, badge: null,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&q=80",
  },
  {
    id: "p6", name: "Ayurvedic Hair Oil", category: "Oils & Serums",
    desc: "Ancient Brahmi and Amla blend in a base of pure coconut and sesame oil. For scalp nourishment and hair growth.",
    price: 1600, rating: 4.8, reviews: 74, badge: null,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
  },
  {
    id: "v1", name: "₹5,000 Gift Voucher", category: "Vouchers",
    desc: "Give the gift of pure luxury. Redeemable for any treatment or product at RelaxIn. Valid 12 months.",
    price: 5000, rating: 5.0, reviews: 31, badge: "Popular Gift",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80",
  },
  {
    id: "v2", name: "₹10,000 Gift Voucher", category: "Vouchers",
    desc: "The ultimate gifting gesture. Redeemable for treatments, memberships, or products. Never expires.",
    price: 10000, rating: 5.0, reviews: 18, badge: null,
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80",
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
  const cartItems = products.filter(p => cart.includes(p.id));
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  function addToCart(id: string) {
    if (cart.includes(id)) {
      toast("Already in your bag", { icon: "🛍️" });
      return;
    }
    setCart(c => [...c, id]);
    toast.success("Added to your bag");
  }

  return (
    <div className="min-h-screen bg-cream-warm pt-28 pb-20">
      <Toaster position="top-center" />

      {/* Floating cart */}
      {cart.length > 0 && (
        <motion.button
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-charcoal text-cream w-14 h-14 flex items-center justify-center shadow-xl hover:bg-gold-deep transition-colors"
        >
          <ShoppingBag size={20} />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-dark rounded-full flex items-center justify-center font-jost text-[10px] font-bold">
            {cart.length}
          </span>
        </motion.button>
      )}

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/50 z-[60]" onClick={() => setCartOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-[70] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-sand">
                <h3 className="font-cormorant text-2xl font-light text-charcoal">Your Bag ({cart.length})</h3>
                <button onClick={() => setCartOpen(false)} className="text-stone hover:text-charcoal transition-colors"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-sand">
                    <div className="w-16 h-16 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="flex-1">
                      <p className="font-cormorant text-lg font-light text-charcoal">{item.name}</p>
                      <p className="font-jost text-xs text-stone mt-0.5">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <button onClick={() => setCart(c => c.filter(id => id !== item.id))}
                      className="text-stone hover:text-red-400 transition-colors self-start mt-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-sand">
                <div className="flex justify-between mb-4">
                  <span className="font-jost text-sm text-spa-muted">Total</span>
                  <span className="font-cormorant text-2xl font-light text-gold-deep">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <button className="w-full bg-charcoal text-cream font-jost text-xs tracking-[0.2em] uppercase py-4 hover:bg-gold-deep transition-colors flex items-center justify-center gap-2">
                  Checkout <ArrowRight size={13} />
                </button>
                <p className="font-jost text-[10px] text-stone text-center mt-3">Shop checkout coming soon — call us to order</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">RelaxIn Shop</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="font-cormorant text-[clamp(3rem,6vw,5.5rem)] font-light text-charcoal leading-tight">
              Take the Luxury<br />
              <em className="text-gold-deep italic font-light">Home with You</em>
            </h1>
            <p className="font-jost text-sm font-light text-spa-muted max-w-xs leading-relaxed">
              The same organic products used in our treatments — now available for your home ritual.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap mt-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`font-jost text-xs tracking-[0.18em] uppercase px-5 py-2 border transition-all duration-300 ${
                  activeCategory === cat ? "bg-charcoal text-cream border-charcoal" : "border-sand text-stone hover:border-gold hover:text-gold-deep"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gift voucher banner */}
        {(activeCategory === "All" || activeCategory === "Vouchers") && (
          <div className="bg-charcoal p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent absolute top-0 left-0 right-0" />
            <div className="w-16 h-16 border border-gold/40 flex items-center justify-center shrink-0">
              <Gift size={24} className="text-gold" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-cormorant text-2xl font-light text-cream mb-1">Give the Gift of Wellness</h3>
              <p className="font-jost text-xs text-cream/60">Gift vouchers are the perfect present — valid 12 months, redeemable for any treatment.</p>
            </div>
            <a href="tel:+919876543210" className="font-jost text-xs tracking-[0.2em] uppercase border border-gold/40 text-gold px-8 py-3 hover:bg-gold hover:text-dark transition-all whitespace-nowrap">
              Order by Phone
            </a>
          </div>
        )}

        {/* Products grid */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group bg-cream border border-sand/60 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }} />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-gold px-3 py-1">
                      <span className="font-jost text-[9px] tracking-[0.15em] uppercase text-dark font-semibold">{product.badge}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1 block">{product.category}</span>
                  <h3 className="font-cormorant text-xl font-light text-charcoal mb-2 group-hover:text-gold-deep transition-colors">{product.name}</h3>
                  <p className="font-jost text-xs font-light text-spa-muted leading-relaxed mb-4 line-clamp-2">{product.desc}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-sand fill-sand"} />
                      ))}
                    </div>
                    <span className="font-jost text-[10px] text-stone">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-sand/60">
                    <span className="font-cormorant text-2xl font-light text-gold-deep">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className={`flex items-center gap-2 font-jost text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 border transition-all duration-300 ${
                        cart.includes(product.id)
                          ? "border-gold bg-gold/10 text-gold-deep"
                          : "border-charcoal text-charcoal hover:bg-charcoal hover:text-cream"
                      }`}
                    >
                      {cart.includes(product.id) ? <><Check size={11} /> Added</> : <><ShoppingBag size={11} /> Add</>}
                    </button>
                  </div>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center border border-dashed border-sand p-10">
          <p className="font-cormorant text-2xl font-light text-charcoal mb-2">
            Prefer to shop in person?
          </p>
          <p className="font-jost text-sm text-spa-muted mb-6">
            Visit us at our Hyderabad studio — our team will help you find the perfect products for your skin type and wellness goals.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 font-jost text-xs tracking-[0.25em] uppercase border border-charcoal text-charcoal px-8 py-3.5 hover:bg-charcoal hover:text-cream transition-all">
            Get Directions <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
