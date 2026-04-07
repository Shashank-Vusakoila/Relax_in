"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, Loader2, Check } from "lucide-react";
import { submitContact } from "@/lib/actions";
import toast, { Toaster } from "react-hot-toast";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 9:00 PM" },
  { day: "Saturday", time: "8:00 AM – 10:00 PM" },
  { day: "Sunday", time: "9:00 AM – 8:00 PM" },
  { day: "Public Holidays", time: "10:00 AM – 7:00 PM" },
];

const subjects = [
  "General Enquiry",
  "Book an Appointment",
  "Membership Information",
  "Corporate Wellness",
  "Gift Vouchers",
  "Feedback",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await submitContact(form);
      if (res?.error) { toast.error(res.error); return; }
      setSent(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream-warm pt-28 pb-20">
      <Toaster position="top-center" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Get in Touch</span>
          </div>
          <h1 className="font-cormorant text-[clamp(3rem,6vw,5.5rem)] font-light text-charcoal leading-tight">
            We&apos;d Love to<br />
            <em className="text-gold-deep italic font-light">Hear from You</em>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left — info */}
          <div className="lg:col-span-2 space-y-10">

            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="w-10 h-10 border border-gold/40 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1">Location</p>
                    <p className="font-jost text-sm text-charcoal leading-relaxed">12 Serenity Lane, Wellness District<br />Hyderabad, Telangana 500001</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-10 h-10 border border-gold/40 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1">Phone</p>
                    <a href="tel:+919876543210" className="font-jost text-sm text-charcoal hover:text-gold-deep transition-colors block">+91 98765 43210</a>
                    <a href="tel:+914023456789" className="font-jost text-sm text-charcoal hover:text-gold-deep transition-colors block">+91 40 2345 6789</a>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-10 h-10 border border-gold/40 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1">Email</p>
                    <a href="mailto:hello@relaxin.spa" className="font-jost text-sm text-charcoal hover:text-gold-deep transition-colors">hello@relaxin.spa</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }}>
              <div className="flex items-center gap-3 mb-5">
                <Clock size={13} className="text-gold" />
                <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold-deep">Opening Hours</span>
              </div>
              <div className="space-y-3">
                {hours.map(h => (
                  <div key={h.day} className="flex justify-between items-center py-3 border-b border-sand/60 last:border-0">
                    <span className="font-jost text-xs text-spa-muted">{h.day}</span>
                    <span className="font-jost text-xs text-charcoal font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map embed */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="overflow-hidden border border-sand h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4!2d78.4744!3d17.385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjgnMjcuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy"
              />
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 border border-sand bg-cream">
                <div className="w-16 h-16 bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                  <Check size={24} className="text-gold" />
                </div>
                <h3 className="font-cormorant text-3xl font-light text-charcoal mb-3">Message Received</h3>
                <p className="font-jost text-sm text-spa-muted max-w-sm leading-relaxed mb-8">
                  Thank you for reaching out. Our team will respond to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="font-jost text-xs tracking-[0.2em] uppercase border border-sand text-charcoal px-6 py-3 hover:border-gold hover:text-gold-deep transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-cream border border-sand p-8 md:p-10">
                <h3 className="font-cormorant text-2xl font-light text-charcoal mb-1">Send a Message</h3>
                <p className="font-jost text-xs text-stone mb-8">We typically respond within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Your Name</label>
                      <input type="text" required value={form.name} onChange={set("name")} placeholder="Full name"
                        className="w-full border border-sand bg-cream-warm px-4 py-3 font-jost text-sm text-charcoal placeholder:text-stone/50 outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Email Address</label>
                      <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com"
                        className="w-full border border-sand bg-cream-warm px-4 py-3 font-jost text-sm text-charcoal placeholder:text-stone/50 outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Subject</label>
                    <select value={form.subject} onChange={set("subject")} required
                      className="w-full border border-sand bg-cream-warm px-4 py-3 font-jost text-sm text-charcoal outline-none focus:border-gold transition-colors appearance-none">
                      <option value="">Select a subject</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold-deep block mb-2">Message</label>
                    <textarea required value={form.message} onChange={set("message")} rows={6}
                      placeholder="Tell us how we can help you..."
                      className="w-full border border-sand bg-cream-warm px-4 py-3 font-jost text-sm text-charcoal placeholder:text-stone/50 outline-none focus:border-gold transition-colors resize-none" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-3 font-jost text-xs tracking-[0.25em] uppercase bg-charcoal text-cream py-4 hover:bg-gold-deep transition-colors disabled:opacity-60">
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <><ArrowRight size={13} /> Send Message</>}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
