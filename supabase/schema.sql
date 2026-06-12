-- TranCoreX Supabase Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blogs
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'General',
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'TranCoreX Team',
  meta_title TEXT,
  meta_desc TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Globe',
  image TEXT,
  features JSONB DEFAULT '[]',
  benefits JSONB DEFAULT '[]',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enquiries
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  subject TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  file_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Gallery
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'General',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team
CREATE TABLE IF NOT EXISTS public.team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  image TEXT,
  linkedin TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Settings (key-value store)
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_is_read ON public.enquiries(is_read);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

-- Helper function: check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies

-- Users: admin only
CREATE POLICY "Admin can manage users" ON public.users
  FOR ALL USING (public.is_admin());

-- Blogs: public read published, admin full access
CREATE POLICY "Public can read published blogs" ON public.blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Admin can manage blogs" ON public.blogs
  FOR ALL USING (public.is_admin());

-- Services: public read, admin write
CREATE POLICY "Public can read services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage services" ON public.services
  FOR ALL USING (public.is_admin());

-- Testimonials: public read, admin write
CREATE POLICY "Public can read testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage testimonials" ON public.testimonials
  FOR ALL USING (public.is_admin());

-- Enquiries: admin only
CREATE POLICY "Admin can manage enquiries" ON public.enquiries
  FOR ALL USING (public.is_admin());

-- Allow anonymous insert for contact form
CREATE POLICY "Anyone can submit enquiries" ON public.enquiries
  FOR INSERT WITH CHECK (true);

-- Gallery: public read, admin write
CREATE POLICY "Public can read gallery" ON public.gallery
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage gallery" ON public.gallery
  FOR ALL USING (public.is_admin());

-- Team: public read, admin write
CREATE POLICY "Public can read team" ON public.team
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage team" ON public.team
  FOR ALL USING (public.is_admin());

-- FAQs: public read, admin write
CREATE POLICY "Public can read faqs" ON public.faqs
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage faqs" ON public.faqs
  FOR ALL USING (public.is_admin());

-- Settings: public read, admin write
CREATE POLICY "Public can read settings" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage settings" ON public.settings
  FOR ALL USING (public.is_admin());

-- Newsletter: anyone can subscribe, admin can read
CREATE POLICY "Anyone can subscribe" ON public.newsletter
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can read newsletter" ON public.newsletter
  FOR SELECT USING (public.is_admin());

-- Storage buckets (run in Supabase Dashboard > Storage)
-- CREATE BUCKET enquiries WITH public = true;
-- CREATE BUCKET gallery WITH public = true;
-- CREATE BUCKET blog WITH public = true;

-- Seed default settings
INSERT INTO public.settings (key, value) VALUES
  ('site_name', 'TranCoreX Pvt. Ltd.'),
  ('site_description', 'Premier export consultancy, manufacturing, and international trading company.'),
  ('contact_email', 'info@trancorex.com'),
  ('contact_phone', '+91 11 4567 8900'),
  ('whatsapp', '+919876543210'),
  ('address', 'Connaught Place, New Delhi 110001, India')
ON CONFLICT (key) DO NOTHING;

-- After creating admin user via Supabase Auth Dashboard, run:
-- INSERT INTO public.users (id, email, role) VALUES ('YOUR-USER-UUID', 'admin@trancorex.com', 'admin');
