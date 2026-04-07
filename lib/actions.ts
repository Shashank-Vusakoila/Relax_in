"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BookingInput, ContactInput, RegisterInput } from "@/types/database";

// ─── AUTH ACTIONS ────────────────────────────────────────────

export async function signUp(input: RegisterInput) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: { full_name: input.full_name, phone: input.phone },
    },
  });
  if (error) return { error: error.message };
  // Supabase returns a fake user with no identities when the email already exists
  // (when "Confirm email" is enabled). Surface a clear message instead of silent failure.
  if (data.user && data.user.identities?.length === 0) {
    return { error: "An account with this email already exists. Please sign in." };
  }
  return { success: true };
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getSession() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProfile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data;
}

// ─── BOOKING ACTIONS ─────────────────────────────────────────

export async function createBooking(input: BookingInput) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Please log in to book a treatment." };

  // Get service price
  const { data: service } = await supabase
    .from("services").select("price").eq("id", input.service_id).single();
  if (!service) return { error: "Service not found." };

  const { data, error } = await supabase.from("bookings").insert({
    user_id: user.id,
    service_id: input.service_id,
    therapist_id: input.therapist_id,
    appointment_date: input.appointment_date,
    appointment_time: input.appointment_time,
    total_amount: service.price,
    notes: input.notes || null,
    status: "pending",
  }).select().single();

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true, booking: data };
}

export async function cancelBooking(bookingId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("user_id", user.id)
    .eq("status", "pending");

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getUserBookings() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("bookings")
    .select(`*, service:services(*), therapist:therapists(*)`)
    .eq("user_id", user.id)
    .order("appointment_date", { ascending: false });

  return data || [];
}

// ─── CONTACT ACTIONS ─────────────────────────────────────────

export async function submitContact(input: ContactInput) {
  const supabase = createClient();
  const { error } = await supabase.from("contact_submissions").insert(input);
  if (error) return { error: error.message };
  return { success: true };
}

// ─── PUBLIC DATA ─────────────────────────────────────────────

export async function getServices() {
  const supabase = createClient();
  const { data } = await supabase
    .from("services").select("*").eq("is_active", true).order("name");
  return data || [];
}

export async function getTherapists() {
  const supabase = createClient();
  const { data } = await supabase
    .from("therapists").select("*").eq("is_active", true).order("name");
  return data || [];
}

// ─── ADMIN ACTIONS ───────────────────────────────────────────

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") throw new Error("Not authorized");
  return supabase;
}

export async function adminGetAllBookings() {
  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("bookings")
    .select(`*, service:services(*), therapist:therapists(*), profile:profiles(full_name, email, phone)`)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function adminUpdateBookingStatus(bookingId: string, status: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("bookings").update({ status }).eq("id", bookingId);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function adminGetStats() {
  const supabase = await requireAdmin();

  const today = new Date().toISOString().split("T")[0];

  const [bookingsRes, revenueRes, membersRes, contactRes, todayRes] = await Promise.all([
    supabase.from("bookings").select("id, status", { count: "exact" }),
    supabase.from("bookings").select("total_amount").eq("status", "confirmed"),
    supabase.from("profiles").select("id", { count: "exact" }).eq("membership_active", true),
    supabase.from("contact_submissions").select("id", { count: "exact" }).eq("is_read", false),
    supabase.from("bookings").select("id", { count: "exact" }).eq("appointment_date", today),
  ]);

  const totalRevenue = (revenueRes.data || []).reduce((s, b) => s + Number(b.total_amount), 0);

  return {
    totalBookings: bookingsRes.count || 0,
    totalRevenue,
    activeMembers: membersRes.count || 0,
    unreadContacts: contactRes.count || 0,
    todayBookings: todayRes.count || 0,
  };
}

export async function adminGetContacts() {
  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("contact_submissions").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function adminMarkContactRead(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin");
}

export async function adminCreateService(service: Partial<import("@/types/database").Service>) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("services").insert(service);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/services");
  return { success: true };
}

export async function adminUpdateService(id: string, updates: Partial<import("@/types/database").Service>) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("services").update(updates).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  revalidatePath("/services");
  return { success: true };
}

export async function adminToggleServiceActive(id: string, is_active: boolean) {
  return adminUpdateService(id, { is_active });
}

export async function adminCreateTherapist(t: Partial<import("@/types/database").Therapist>) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("therapists").insert(t);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function adminUpdateTherapist(id: string, updates: Partial<import("@/types/database").Therapist>) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("therapists").update(updates).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}
