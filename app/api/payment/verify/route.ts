import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking,
    } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    // ── 1. Verify Razorpay signature ──────────────────────────
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed — invalid signature" }, { status: 400 });
    }

    // ── 2. Get authenticated user ─────────────────────────────
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // ── 3. Create confirmed booking in Supabase ───────────────
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      service_id: booking.service_id,
      therapist_id: booking.therapist_id,
      appointment_date: booking.appointment_date,
      appointment_time: booking.appointment_time,
      total_amount: booking.total_amount,
      notes: booking.notes || null,
      status: "confirmed",                    // confirmed immediately after payment
      payment_id: razorpay_payment_id,        // store for reference
      payment_order_id: razorpay_order_id,
    });

    if (error) {
      console.error("Booking insert error:", error);
      // Payment succeeded but booking failed — flag for manual review
      return NextResponse.json({
        error: "Payment received but booking failed. Please contact support with your payment ID: " + razorpay_payment_id,
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, payment_id: razorpay_payment_id });
  } catch (err) {
    console.error("Verify payment error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
