import { redirect } from "next/navigation";
import { getSession, getUserBookings, getProfile, cancelBooking } from "@/lib/actions";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

// Status badge colours
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending:    "bg-amber-50  text-amber-700  border-amber-200",
    cancelled:  "bg-red-50    text-red-700    border-red-200",
    completed:  "bg-stone-100 text-stone-600  border-stone-200",
  };
  return (
    <span className={`font-jost text-[9px] tracking-[0.2em] uppercase border px-2.5 py-1 ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}


// Server action must be defined separately, not inline
async function cancelBookingAction(formData: FormData) {
  "use server";
  const id = formData.get("bookingId") as string;
  await cancelBooking(id);
}

function CancelButton({ bookingId }: { bookingId: string }) {
  return (
    <form action={cancelBookingAction}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <button
        type="submit"
        className="font-jost text-[10px] tracking-[0.15em] uppercase text-red-400 border border-red-200 px-3 py-2 hover:bg-red-50 transition-colors"
      >
        Cancel
      </button>
    </form>
  );
}

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect("/login?redirect=/dashboard");

  const [bookings, profile] = await Promise.all([getUserBookings(), getProfile()]);

  const upcoming = bookings.filter(b => b.status !== "cancelled" && b.status !== "completed");
  const past     = bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  return (
    <div className="min-h-screen bg-cream-warm pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-px bg-gold" />
              <span className="font-jost text-[9px] tracking-[0.4em] uppercase text-gold-deep">My Account</span>
            </div>
            <h1 className="font-cormorant text-4xl font-light text-charcoal">
              Welcome, {profile?.full_name?.split(" ")[0] || "Guest"}
            </h1>
            <p className="font-jost text-xs text-stone mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/booking"
              className="flex items-center gap-2 font-jost text-xs tracking-[0.2em] uppercase bg-charcoal text-cream px-6 py-3 hover:bg-gold-deep transition-colors">
              Book Treatment <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "Total Bookings", value: bookings.length },
            { label: "Upcoming", value: upcoming.length },
            { label: "Completed", value: past.filter(b => b.status === "completed").length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-cream border border-sand p-5 text-center">
              <span className="font-cormorant text-4xl font-light text-gold-deep block leading-none">{value}</span>
              <span className="font-jost text-[9px] tracking-[0.2em] uppercase text-stone mt-2 block">{label}</span>
            </div>
          ))}
        </div>

        {/* Upcoming bookings */}
        {upcoming.length > 0 && (
          <div className="mb-10">
            <h2 className="font-cormorant text-2xl font-light text-charcoal mb-5">Upcoming Appointments</h2>
            <div className="space-y-4">
              {upcoming.map(b => (
                <div key={b.id} className="bg-cream border border-sand p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-cormorant text-xl font-light text-charcoal">{b.service?.name}</h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="flex flex-wrap gap-5 text-stone">
                      <span className="flex items-center gap-1.5 font-jost text-xs">
                        <Calendar size={11} className="text-gold" />
                        {new Date(b.appointment_date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1.5 font-jost text-xs">
                        <Clock size={11} className="text-gold" />
                        {b.appointment_time}
                      </span>
                      <span className="flex items-center gap-1.5 font-jost text-xs">
                        <User size={11} className="text-gold" />
                        {b.therapist?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-cormorant text-2xl font-light text-gold-deep">
                      ₹{Number(b.total_amount).toLocaleString("en-IN")}
                    </span>
                    {b.status === "pending" || b.status === "confirmed" ? (
                      <CancelButton bookingId={b.id} />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past bookings */}
        {past.length > 0 && (
          <div>
            <h2 className="font-cormorant text-2xl font-light text-charcoal mb-5">Past Appointments</h2>
            <div className="space-y-3">
              {past.map(b => (
                <div key={b.id} className="bg-cream/60 border border-sand/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-75">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-cormorant text-lg font-light text-charcoal">{b.service?.name}</h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="flex flex-wrap gap-4 text-stone">
                      <span className="font-jost text-xs flex items-center gap-1.5">
                        <Calendar size={10} className="text-gold/70" />
                        {new Date(b.appointment_date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="font-jost text-xs flex items-center gap-1.5">
                        <User size={10} className="text-gold/70" />
                        {b.therapist?.name}
                      </span>
                    </div>
                  </div>
                  <span className="font-cormorant text-xl font-light text-stone">₹{Number(b.total_amount).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {bookings.length === 0 && (
          <div className="text-center py-20 border border-dashed border-sand">
            <span className="font-pinyon text-gold text-5xl block mb-4">Begin</span>
            <p className="font-cormorant text-2xl font-light text-charcoal mb-2">No bookings yet</p>
            <p className="font-jost text-sm text-stone mb-8">Book your first treatment and start your wellness journey</p>
            <Link href="/booking" className="inline-flex items-center gap-2 font-jost text-xs tracking-[0.2em] uppercase bg-charcoal text-cream px-8 py-4 hover:bg-gold-deep transition-colors">
              Book Now <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
