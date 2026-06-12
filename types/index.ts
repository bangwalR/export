export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  cover_image: string | null;
  author: string;
  meta_title: string | null;
  meta_desc: string | null;
  published: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image: string | null;
  features: string[];
  benefits: { title: string; description: string }[];
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  country: string;
  rating: number;
  message: string;
  logo: string | null;
  created_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  country: string;
  subject: string;
  service: string | null;
  message: string;
  file_url: string | null;
  is_read: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  linkedin: string | null;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface Setting {
  key: string;
  value: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  country: string;
  subject: string;
  service?: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}
