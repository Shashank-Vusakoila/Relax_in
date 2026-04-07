export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: "customer" | "admin";
  membership_tier: "gold" | "platinum" | "elite" | null;
  membership_active: boolean | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration_minutes: number;
  price: number;
  image_url: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  bio: string | null;
  avatar_url: string | null;
  rating: number | null;
  is_active: boolean | null;
  created_at: string | null;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  therapist_id: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  total_amount: number;
  notes: string | null;
  payment_id?: string | null;
  payment_order_id?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean | null;
  created_at: string | null;
}

export interface RegisterInput {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface BookingInput {
  service_id: string;
  therapist_id: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
