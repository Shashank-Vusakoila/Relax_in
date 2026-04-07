"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Loader2,
  Star,
  User,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { fallbackServices, fallbackTherapists } from "@/lib/booking-data";
import { createClient } from "@/lib/supabase/client";
import type { Service, Therapist } from "@/types/database";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      on: (event: string, handler: () => void) => void;
      open: () => void;
    };
  }
}

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

const STEPS = ["Service", "Therapist", "Date & Time", "Payment"];

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getMinDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [catalogMode, setCatalogMode] = useState<"live" | "fallback">("live");
  const [catalogMessage, setCatalogMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function loadBookingData() {
      try {
        const [
          { data: serviceRows, error: servicesError },
          { data: therapistRows, error: therapistsError },
          { data: { user: currentUser } },
        ] = await Promise.all([
          supabase.from("services").select("*").eq("is_active", true).order("name"),
          supabase.from("therapists").select("*").eq("is_active", true).order("name"),
          supabase.auth.getUser(),
        ]);

        setUser(currentUser);

        const hasLiveCatalog =
          !servicesError &&
          !therapistsError &&
          (serviceRows?.length ?? 0) > 0 &&
          (therapistRows?.length ?? 0) > 0;

        if (hasLiveCatalog) {
          setServices(serviceRows ?? []);
          setTherapists(therapistRows ?? []);
          setCatalogMode("live");
          setCatalogMessage("");
          return;
        }

        setServices(fallbackServices);
        setTherapists(fallbackTherapists);
        setCatalogMode("fallback");
        setCatalogMessage(
          "Live booking data is unavailable right now, so this page is showing a preview catalog. To accept real bookings, seed the Supabase services and therapists tables first."
        );
      } catch {
        setServices(fallbackServices);
        setTherapists(fallbackTherapists);
        setCatalogMode("fallback");
        setCatalogMessage(
          "We could not load the live booking catalog. Preview services are shown for now while the booking backend is being set up."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBookingData();
  }, []);

  async function handlePayment() {
    if (!user) {
      router.push("/login?redirect=/booking");
      return;
    }

    if (catalogMode === "fallback") {
      toast.error("Live booking is not ready yet. Complete the Supabase catalog setup before accepting payments.");
      return;
    }

    if (!selectedService || !selectedTherapist || !selectedDate || !selectedTime) {
      toast.error("Please complete all steps first");
      return;
    }

    setPaying(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Payment gateway failed to load. Please try again.");
        setPaying(false);
        return;
      }

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedService.price }),
      });

      const order = await orderRes.json();
      if (!orderRes.ok) {
        toast.error(order.error || "Failed to create payment order.");
        setPaying(false);
        return;
      }

      const options = {
        key: order.key,
        amount: selectedService.price * 100,
        currency: order.currency,
        name: "RelaxIn Luxury Spa",
        description: selectedService.name,
        order_id: order.orderId,
        prefill: {
          name: user.user_metadata?.full_name || "",
          email: user.email,
          contact: user.user_metadata?.phone || "",
        },
        theme: { color: "#C9A96E" },
        modal: {
          ondismiss: () => {
            setPaying(false);
            toast.error("Payment cancelled");
          },
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking: {
                service_id: selectedService.id,
                therapist_id: selectedTherapist.id,
                appointment_date: selectedDate,
                appointment_time: selectedTime,
                notes,
                total_amount: selectedService.price,
              },
            }),
          });

          const result = await verifyRes.json();
          if (result.success) {
            toast.success("Booking confirmed! See you soon.");
            router.push("/dashboard");
            return;
          }

          toast.error(result.error || "Payment verification failed");
          setPaying(false);
        },
      };

      const Razorpay = window.Razorpay;
      if (!Razorpay) {
        toast.error("Payment gateway failed to load. Please try again.");
        setPaying(false);
        return;
      }

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setPaying(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-warm flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-warm pt-28 pb-20 px-4">
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: "var(--font-jost)", fontSize: "13px" } }} />

      <div className="max-w-5xl mx-auto">
        {catalogMessage && (
          <div className="mb-8 border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="font-jost text-xs leading-relaxed text-amber-800">{catalogMessage}</p>
          </div>
        )}

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-gold" />
            <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gold-deep">Reserve Your Experience</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-cormorant text-[clamp(2.5rem,5vw,4rem)] font-light text-charcoal">Book Your Treatment</h1>
        </div>

        <div className="flex items-center justify-center mb-12 gap-0">
          {STEPS.map((label, index) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => index < step && setStep(index)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border text-xs font-jost font-medium transition-all duration-400 ${
                    index < step
                      ? "bg-gold border-gold text-dark cursor-pointer"
                      : index === step
                        ? "bg-charcoal border-charcoal text-cream"
                        : "bg-transparent border-sand text-stone cursor-default"
                  }`}
                >
                  {index < step ? <Check size={14} /> : index + 1}
                </button>
                <span className={`font-jost text-[9px] tracking-[0.15em] uppercase whitespace-nowrap ${index <= step ? "text-charcoal" : "text-stone"}`}>
                  {label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-16 md:w-24 h-px mx-2 mb-5 transition-colors duration-500 ${index < step ? "bg-gold" : "bg-sand"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-cormorant text-2xl font-light text-charcoal mb-6 text-center">Choose Your Treatment</h2>
              {services.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setStep(1);
                      }}
                      className={`text-left border transition-all duration-400 group overflow-hidden ${
                        selectedService?.id === service.id ? "border-gold bg-cream" : "border-sand bg-cream hover:border-gold/50"
                      }`}
                    >
                      {service.image_url && (
                        <div className="h-44 overflow-hidden">
                          <div
                            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url(${service.image_url})` }}
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1 block">{service.category}</span>
                        <h3 className="font-cormorant text-xl font-light text-charcoal mb-1">{service.name}</h3>
                        <p className="font-jost text-xs text-spa-muted font-light leading-relaxed mb-3 line-clamp-2">{service.description}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-sand">
                          <span className="font-cormorant text-2xl text-gold-deep font-light">{formatINR(service.price)}</span>
                          <div className="flex items-center gap-1 text-stone">
                            <Clock size={11} />
                            <span className="font-jost text-xs">{service.duration_minutes} min</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-sand p-10 text-center">
                  <p className="font-jost text-sm text-stone">No services are available yet.</p>
                </div>
              )}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-cormorant text-2xl font-light text-charcoal mb-2 text-center">Choose Your Therapist</h2>
              <p className="font-jost text-xs text-center text-stone mb-8">All our therapists are certified wellness experts</p>
              {therapists.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {therapists.map((therapist) => (
                    <button
                      key={therapist.id}
                      onClick={() => {
                        setSelectedTherapist(therapist);
                        setStep(2);
                      }}
                      className={`text-center border p-6 transition-all duration-400 group ${
                        selectedTherapist?.id === therapist.id
                          ? "border-gold bg-cream"
                          : "border-sand bg-cream hover:border-gold/50 hover:-translate-y-1"
                      }`}
                    >
                      {therapist.avatar_url ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-sand group-hover:border-gold transition-colors">
                          <Image src={therapist.avatar_url} alt={therapist.name} width={80} height={80} className="w-full h-full object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center mx-auto mb-4">
                          <User size={28} className="text-stone" />
                        </div>
                      )}
                      <h3 className="font-cormorant text-xl font-light text-charcoal mb-1">{therapist.name}</h3>
                      <p className="font-jost text-[10px] text-gold-deep tracking-wide uppercase mb-2">{therapist.specialty}</p>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star size={11} className="text-gold fill-gold" />
                        <span className="font-jost text-xs text-charcoal">{therapist.rating ?? "5.0"}</span>
                      </div>
                      <p className="font-jost text-[10px] text-stone">{therapist.experience_years} yrs experience</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-sand p-10 text-center mb-8">
                  <p className="font-jost text-sm text-stone">No therapists are available yet.</p>
                </div>
              )}
              <div className="text-center">
                <button onClick={() => setStep(0)} className="flex items-center gap-2 font-jost text-xs text-stone hover:text-charcoal transition-colors mx-auto">
                  <ArrowLeft size={12} /> Back
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-cormorant text-2xl font-light text-charcoal mb-8 text-center">Choose Date & Time</h2>
              <div className="max-w-2xl mx-auto bg-cream border border-sand p-8">
                <div className="mb-8">
                  <label className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-3 block flex items-center gap-2">
                    <Calendar size={12} /> Select Date
                  </label>
                  <input
                    type="date"
                    min={getMinDate()}
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="w-full border border-sand bg-cream-warm px-4 py-3 font-jost text-sm text-charcoal outline-none focus:border-gold transition-colors"
                  />
                </div>

                {selectedDate && (
                  <div className="mb-8">
                    <label className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-3 block">Select Time</label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 font-jost text-xs border transition-all duration-300 ${
                            selectedTime === time ? "bg-charcoal text-cream border-charcoal" : "border-sand text-stone hover:border-gold hover:text-gold-deep"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-3 block">Special Requests (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    placeholder="Any allergies, preferences, or special requests..."
                    className="w-full border border-sand bg-cream-warm px-4 py-3 font-jost text-sm text-charcoal placeholder:text-stone/60 outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 font-jost text-xs text-stone hover:text-charcoal transition-colors">
                    <ArrowLeft size={12} /> Back
                  </button>
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(3)}
                    className="flex items-center gap-3 font-jost text-xs tracking-[0.2em] uppercase bg-charcoal text-cream px-8 py-3.5 hover:bg-gold-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-cormorant text-2xl font-light text-charcoal mb-8 text-center">Review & Pay</h2>
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-cream border border-sand p-6">
                  <h3 className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-5">Booking Summary</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Treatment", value: selectedService?.name },
                      { label: "Duration", value: `${selectedService?.duration_minutes} minutes` },
                      { label: "Therapist", value: selectedTherapist?.name },
                      {
                        label: "Date",
                        value: selectedDate
                          ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
                          : "",
                      },
                      { label: "Time", value: selectedTime },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center pb-4 border-b border-sand/60 last:border-0 last:pb-0">
                        <span className="font-jost text-xs text-stone tracking-wide">{label}</span>
                        <span className="font-jost text-sm text-charcoal font-medium">{value}</span>
                      </div>
                    ))}
                    {notes && (
                      <div className="pt-2">
                        <span className="font-jost text-[10px] text-stone uppercase tracking-wider block mb-1">Notes</span>
                        <p className="font-jost text-sm text-charcoal">{notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-charcoal p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-jost text-sm text-cream/70 tracking-wide">Total Amount</span>
                    <span className="font-cormorant text-4xl font-light text-gold">{selectedService ? formatINR(selectedService.price) : ""}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 p-3 bg-cream/5 border border-cream/10">
                    <CreditCard size={14} className="text-gold shrink-0" />
                    <span className="font-jost text-xs text-cream/60">Secure payment via Razorpay. UPI, cards, net banking and wallets accepted.</span>
                  </div>

                  {catalogMode === "fallback" && (
                    <div className="mb-4 p-3 bg-amber-100/10 border border-amber-300/30">
                      <p className="font-jost text-xs text-cream/80">
                        This catalog is running in preview mode. Real payments are disabled until the Supabase services and therapists data is available.
                      </p>
                    </div>
                  )}

                  {!user && (
                    <div className="mb-4 p-3 bg-gold/10 border border-gold/30">
                      <p className="font-jost text-xs text-cream/70">
                        Please <a href="/login?redirect=/booking" className="text-gold underline">sign in</a> to complete your booking.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={paying || catalogMode === "fallback"}
                    className="w-full flex items-center justify-center gap-3 bg-gold text-dark font-jost text-xs tracking-[0.25em] uppercase py-4 hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {paying ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={14} /> Pay {selectedService ? formatINR(selectedService.price) : ""}
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 font-jost text-xs text-stone hover:text-charcoal transition-colors mx-auto">
                    <ArrowLeft size={12} /> Back
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
