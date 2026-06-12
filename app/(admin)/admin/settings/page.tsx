'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Settings saved!');
    setLoading(false);
  };

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase text-white mb-8">Settings</h1>
      <form onSubmit={handleSave} className="max-w-2xl space-y-8">
        <div>
          <h2 className="font-heading text-sm uppercase text-gold mb-4">General</h2>
          <div className="space-y-4">
            <Input label="Site Name" defaultValue={SITE_CONFIG.name} />
            <Input label="Site URL" defaultValue={SITE_CONFIG.url} />
            <Textarea label="Site Description" defaultValue={SITE_CONFIG.description} rows={3} />
          </div>
        </div>

        <div>
          <h2 className="font-heading text-sm uppercase text-gold mb-4">Contact</h2>
          <div className="space-y-4">
            <Input label="Email" defaultValue={SITE_CONFIG.email} />
            <Input label="Phone" defaultValue={SITE_CONFIG.phone} />
            <Input label="WhatsApp" defaultValue={SITE_CONFIG.whatsapp} />
            <Input label="Address" defaultValue={SITE_CONFIG.address} />
          </div>
        </div>

        <div>
          <h2 className="font-heading text-sm uppercase text-gold mb-4">Social Media</h2>
          <div className="space-y-4">
            <Input label="LinkedIn" defaultValue={SITE_CONFIG.social.linkedin} />
            <Input label="Twitter/X" defaultValue={SITE_CONFIG.social.twitter} />
            <Input label="Instagram" defaultValue={SITE_CONFIG.social.instagram} />
            <Input label="Facebook" defaultValue={SITE_CONFIG.social.facebook} />
          </div>
        </div>

        <div>
          <h2 className="font-heading text-sm uppercase text-gold mb-4">SEO Defaults</h2>
          <div className="space-y-4">
            <Input label="Default Meta Title" defaultValue="TranCoreX | Global Export Consultancy" />
            <Textarea label="Default Meta Description" defaultValue={SITE_CONFIG.description} rows={3} />
          </div>
        </div>

        <Button type="submit" variant="primary" isLoading={loading}>Save Settings</Button>
      </form>
    </div>
  );
}
