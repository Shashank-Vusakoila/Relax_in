-- ============================================================
-- RelaxIn Spa — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────
create table public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  full_name     text not null,
  email         text not null unique,
  phone         text,
  role          text not null default 'customer' check (role in ('customer', 'admin')),
  membership_tier text check (membership_tier in ('gold', 'platinum', 'elite')),
  membership_active boolean default false,
  avatar_url    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Guest'),
    new.email,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── SERVICES ────────────────────────────────────────────────
create table public.services (
  id               uuid default uuid_generate_v4() primary key,
  name             text not null,
  category         text not null,
  description      text not null,
  duration_minutes integer not null,
  price            numeric(10,2) not null,
  image_url        text,
  is_active        boolean default true,
  created_at       timestamptz default now()
);

-- Seed services
insert into public.services (name, category, description, duration_minutes, price, image_url) values
  ('Luxury Facial', 'Facial', 'A transformative 90-minute ritual using rare botanical extracts and 24K gold leaf infusions.', 90, 4500, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80'),
  ('Aromatherapy Massage', 'Massage', 'Drift into bliss with our master blend of essential oils, designed for total renewal.', 75, 3800, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80'),
  ('Hot Stone Therapy', 'Therapy', 'Volcanic basalt stones heated to perfection melt tension and restore inner balance.', 120, 5200, 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80'),
  ('Royal Ayurvedic Ceremony', 'Ritual', 'Five-thousand year old healing science meets modern luxury in this immersive ceremony.', 150, 6000, 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80'),
  ('Hair Spa Ritual', 'Hair', 'Nourish your crown with organic protein treatments and scalp revitalisation techniques.', 60, 2800, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80'),
  ('Deep Tissue Massage', 'Massage', 'Precision therapeutic techniques that reach the deepest layers of muscle and fascia.', 90, 4200, 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80');

-- ─── THERAPISTS ──────────────────────────────────────────────
create table public.therapists (
  id               uuid default uuid_generate_v4() primary key,
  name             text not null,
  specialty        text not null,
  experience_years integer not null default 1,
  bio              text,
  avatar_url       text,
  rating           numeric(3,1) default 5.0,
  is_active        boolean default true,
  created_at       timestamptz default now()
);

-- Seed therapists
insert into public.therapists (name, specialty, experience_years, bio, avatar_url, rating) values
  ('Riya Kapoor', 'Ayurvedic & Facial', 8, 'Certified in Kerala Ayurveda and advanced facial techniques. Trained in Bali and Japan.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', 4.9),
  ('Priya Nair', 'Hot Stone & Deep Tissue', 6, 'Expert in therapeutic massage with specialisation in sports recovery and deep tissue work.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', 4.8),
  ('Ananya Singh', 'Aromatherapy & Wellness', 10, 'Senior therapist trained in Paris and Switzerland. Specialist in holistic wellness rituals.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', 5.0),
  ('Meera Iyer', 'Hair & Scalp Rituals', 5, 'Hair restoration specialist with expertise in Ayurvedic scalp treatments and organic care.', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face', 4.7);

-- ─── BOOKINGS ────────────────────────────────────────────────
create table public.bookings (
  id                uuid default uuid_generate_v4() primary key,
  user_id           uuid references public.profiles(id) on delete cascade not null,
  service_id        uuid references public.services(id) not null,
  therapist_id      uuid references public.therapists(id) not null,
  appointment_date  date not null,
  appointment_time  time not null,
  status            text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  total_amount      numeric(10,2) not null,
  notes             text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute procedure public.update_updated_at();

-- ─── CONTACT SUBMISSIONS ─────────────────────────────────────
create table public.contact_submissions (
  id         uuid default uuid_generate_v4() primary key,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  is_read    boolean default false,
  created_at timestamptz default now()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
alter table public.profiles           enable row level security;
alter table public.services           enable row level security;
alter table public.therapists         enable row level security;
alter table public.bookings           enable row level security;
alter table public.contact_submissions enable row level security;

-- Profiles: users see own, admins see all
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles"
  on profiles for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Services & Therapists: public read, admin write
create policy "Anyone can view active services"
  on services for select using (is_active = true);
create policy "Admins can manage services"
  on services for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
create policy "Anyone can view active therapists"
  on therapists for select using (is_active = true);
create policy "Admins can manage therapists"
  on therapists for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Bookings: users see own, admins see all
create policy "Users can view own bookings"
  on bookings for select using (auth.uid() = user_id);
create policy "Users can create own bookings"
  on bookings for insert with check (auth.uid() = user_id);
create policy "Users can cancel own pending bookings"
  on bookings for update using (auth.uid() = user_id and status = 'pending');
create policy "Admins can manage all bookings"
  on bookings for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Contact: anyone insert, admins read
create policy "Anyone can submit contact form"
  on contact_submissions for insert with check (true);
create policy "Admins can view contact submissions"
  on contact_submissions for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
create policy "Admins can update contact submissions"
  on contact_submissions for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ─── MAKE YOURSELF ADMIN ─────────────────────────────────────
-- After signing up, run this to make your account admin:
-- update public.profiles set role = 'admin' where email = 'your@email.com';


-- ─── PAYMENT COLUMNS (run this migration if upgrading) ───────
-- Add payment tracking to bookings table
alter table public.bookings
  add column if not exists payment_id        text,
  add column if not exists payment_order_id  text;

-- Index for payment lookups
create index if not exists bookings_payment_id_idx on public.bookings(payment_id);
