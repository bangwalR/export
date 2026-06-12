import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2),
  subject: z.string().min(3),
  service: z.string().optional(),
  message: z.string().min(10),
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

// In-memory store for enquiries (persists for the server session)
const enquiriesStore: Array<{
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  country: string;
  subject: string;
  service?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}> = [];

export async function GET() {
  return NextResponse.json({ enquiries: enquiriesStore });
}

export async function PATCH(request: NextRequest) {
  const { id, is_read } = await request.json();
  const item = enquiriesStore.find((e) => e.id === id);
  if (item) item.is_read = is_read;
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const idx = enquiriesStore.findIndex((e) => e.id === id);
  if (idx !== -1) enquiriesStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const formData = await request.formData();
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      country: formData.get('country') as string,
      subject: formData.get('subject') as string,
      service: (formData.get('service') as string) || undefined,
      message: formData.get('message') as string,
    };

    const validated = contactSchema.parse(data);

    // Save enquiry to in-memory store
    enquiriesStore.unshift({
      id: Date.now().toString(),
      ...validated,
      is_read: false,
      created_at: new Date().toISOString(),
    });

    // Send email if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || 'info@trancorex.com',
        subject: `[TranCoreX Enquiry] ${validated.subject}`,
        html: `
          <h2>New Enquiry from ${validated.name}</h2>
          <p><strong>Company:</strong> ${validated.company}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          <p><strong>Phone:</strong> ${validated.phone || 'N/A'}</p>
          <p><strong>Country:</strong> ${validated.country}</p>
          <p><strong>Service:</strong> ${validated.service || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${validated.message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry.' }, { status: 500 });
  }
}
