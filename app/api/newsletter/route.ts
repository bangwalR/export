import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    const supabase = await createClient();
    const { error } = await supabase.from('newsletter').insert({ email });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already subscribed.' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Subscription failed.' }, { status: 500 });
  }
}
