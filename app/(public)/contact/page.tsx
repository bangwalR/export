'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Upload } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG, SERVICES } from '@/lib/constants';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  subject: z.string().min(3, 'Subject is required'),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (file) formData.append('file', file);

      const res = await fetch('/api/contact', { method: 'POST', body: formData });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Submission failed');

      toast.success('Thank you! Your enquiry has been submitted successfully.');
      reset();
      setFile(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-graphite">
        <div className="container-custom">
          <SectionHeading eyebrow="Get In Touch" title="Contact Us" description="Ready to expand globally? Our team is here to help you navigate international markets." />
        </div>
      </section>

      <section className="section-padding bg-obsidian">
        <div className="container-custom grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="font-heading text-xl uppercase text-gold mb-8">Company Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-white font-medium mb-1">Address</p>
                  <p className="text-sm text-smoke">{SITE_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm text-smoke hover:text-gold">{SITE_CONFIG.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-white font-medium mb-1">Phone</p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm text-smoke hover:text-gold">{SITE_CONFIG.phone}</a>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-xl overflow-hidden border border-onyx aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.869474489887!2d77.21672131508399!3d28.63280398240747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TranCoreX Location"
              />
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="font-heading text-xl uppercase text-white mb-6">Send Enquiry</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Full Name *" {...register('name')} error={errors.name?.message} />
                <Input label="Company Name *" {...register('company')} error={errors.company?.message} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Email *" type="email" {...register('email')} error={errors.email?.message} />
                <Input label="Phone" {...register('phone')} error={errors.phone?.message} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Country *" {...register('country')} error={errors.country?.message} />
                <Input label="Subject *" {...register('subject')} error={errors.subject?.message} />
              </div>
              <div>
                <label className="block text-sm font-accent text-champagne/80 mb-2">Service Interested In</label>
                <select {...register('service')} className="w-full px-4 py-3 bg-onyx/50 border border-onyx rounded-sm text-white focus:outline-none focus:border-gold/50">
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <Textarea label="Message *" rows={5} {...register('message')} error={errors.message?.message} />
              <div>
                <label className="block text-sm font-accent text-champagne/80 mb-2">File Upload (max 5MB)</label>
                <div className="border-2 border-dashed border-onyx rounded-sm p-6 text-center hover:border-gold/30 transition-colors cursor-pointer">
                  <Upload size={24} className="text-smoke mx-auto mb-2" />
                  <input type="file" className="hidden" id="file-upload" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  <label htmlFor="file-upload" className="text-sm text-smoke cursor-pointer">
                    {file ? file.name : 'Drag & drop or click to upload'}
                  </label>
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
                Submit Enquiry
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
