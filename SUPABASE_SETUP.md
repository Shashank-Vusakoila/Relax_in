# 🌿 RelaxIn — Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → Sign up / Sign in
2. Click **"New Project"**
3. Choose a name (e.g. `relaxin-spa`), set a DB password, pick a region close to India (e.g. **Singapore**)
4. Wait ~2 minutes for the project to spin up

---

## Step 2: Run the Database Schema

1. In your Supabase dashboard → click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the file `lib/database.sql` from this project
4. Paste the entire contents into the SQL editor
5. Click **"Run"** — you should see `Success. No rows returned`

This will create all tables, seed initial services & therapists, and set up Row Level Security policies.

---

## Step 3: Get Your API Keys

1. Go to **Settings → API** in your Supabase dashboard
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 4: Set Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 5: Enable Email Auth

1. Go to **Authentication → Providers** in Supabase
2. Ensure **Email** is enabled (it is by default)
3. Optionally disable "Confirm email" for easier testing:
   - **Authentication → Settings → Email Confirmations → OFF**

---

## Step 6: Run the App

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 7: Make Yourself Admin

1. Register an account at `/register`
2. Go to **Supabase → SQL Editor** and run:

```sql
update public.profiles
set role = 'admin'
where email = 'your@email.com';
```

3. Now visit `/admin` — log in with your credentials

---

## What's Stored Where

| Data | Table | Who Can Access |
|------|-------|----------------|
| User profiles | `profiles` | Users see own; admins see all |
| Appointments | `bookings` | Users see own; admins see all |
| Treatments | `services` | Public read; admin write |
| Therapists | `therapists` | Public read; admin write |
| Contact messages | `contact_submissions` | Anyone can submit; admins read |

---

## Deploy to Vercel

```bash
npx vercel --prod
```

Add the same env variables in Vercel → Project → Settings → Environment Variables.

