"use client";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions";
import toast, { Toaster } from "react-hot-toast";

// ── Inner form — uses useSearchParams so must be inside <Suspense> ──
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const res = await signIn(form.email, form.password);
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Welcome back 🌿");
        router.push(redirect);
      } else {
        if (!form.full_name || !form.phone) { toast.error("Please fill all fields"); return; }
        const res = await signUp({ full_name: form.full_name, email: form.email, phone: form.phone, password: form.password });
        if (res?.error) { toast.error(res.error); return; }
        toast.success("Account created! Please check your email to verify.");
        setMode("login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Link href="/" className="flex flex-col leading-none mb-10 lg:hidden">
        <span className="font-pinyon text-gold text-2xl">Relax</span>
        <span className="font-cormorant text-charcoal text-2xl font-light tracking-[0.3em] uppercase -mt-1">In</span>
      </Link>

      <div className="mb-8">
        <h1 className="font-cormorant text-4xl font-light text-charcoal mb-1">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="font-jost text-sm text-stone font-light">
          {mode === "login" ? "Sign in to your account" : "Begin your wellness journey"}
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex border border-sand mb-8">
        {(["login", "signup"] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-3 font-jost text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
              mode === m ? "bg-charcoal text-cream" : "text-stone hover:text-charcoal"
            }`}
          >
            {m === "login" ? "Sign In" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence>
          {mode === "signup" && (
            <motion.div
              key="signup-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Full Name</label>
                <input type="text" required value={form.full_name} onChange={set("full_name")} placeholder="Your full name"
                  className="w-full border border-sand bg-cream px-4 py-3 font-jost text-sm text-charcoal placeholder:text-stone/50 outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Phone</label>
                <input type="tel" required value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210"
                  className="w-full border border-sand bg-cream px-4 py-3 font-jost text-sm text-charcoal placeholder:text-stone/50 outline-none focus:border-gold transition-colors" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Email Address</label>
          <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com"
            className="w-full border border-sand bg-cream px-4 py-3 font-jost text-sm text-charcoal placeholder:text-stone/50 outline-none focus:border-gold transition-colors" />
        </div>

        <div>
          <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} required value={form.password}
              onChange={set("password")} placeholder="••••••••" minLength={8}
              className="w-full border border-sand bg-cream px-4 py-3 pr-12 font-jost text-sm text-charcoal placeholder:text-stone/50 outline-none focus:border-gold transition-colors"
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal transition-colors">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full font-jost text-xs tracking-[0.25em] uppercase bg-charcoal text-cream py-4 mt-2 flex items-center justify-center gap-2 hover:bg-gold-deep transition-colors disabled:opacity-60">
          {loading
            ? <Loader2 size={16} className="animate-spin" />
            : mode === "login" ? "Sign In" : "Create Account"
          }
        </button>
      </form>

      <p className="font-jost text-xs text-stone text-center mt-6">
        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-gold-deep hover:text-gold transition-colors underline"
        >
          {mode === "login" ? "Register" : "Sign In"}
        </button>
      </p>
    </div>
  );
}

// ── Page shell — Suspense wraps the part that uses useSearchParams ──
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream-warm flex">
      <Toaster position="top-center" />

      {/* Left — decorative image panel */}
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden items-end p-16"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        <div className="relative z-10">
          <Link href="/" className="flex flex-col leading-none mb-12">
            <span className="font-pinyon text-gold text-3xl">Relax</span>
            <span className="font-cormorant text-cream text-3xl font-light tracking-[0.3em] uppercase -mt-1">In</span>
          </Link>
          <h2 className="font-cormorant text-5xl font-light text-cream leading-tight mb-4">
            Your sanctuary<br />
            <em className="text-gold italic">awaits you</em>
          </h2>
          <p className="font-jost text-sm font-light text-cream/60 max-w-xs leading-relaxed">
            Sign in to book treatments, manage appointments, and access your wellness journey.
          </p>
        </div>
      </div>

      {/* Right — form wrapped in Suspense */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Suspense fallback={
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gold" size={28} />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
