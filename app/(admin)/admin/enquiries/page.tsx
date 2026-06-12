'use client';

import { useState, useEffect, useCallback } from 'react';
import { Eye, Trash2, Download, Mail, MailOpen, RefreshCw, Users, Clock, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

type Enquiry = {
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
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const markAsRead = async (id: string) => {
    await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_read: true }),
    });
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, is_read: true } : e));
    if (selected?.id === id) setSelected((s) => s ? { ...s, is_read: true } : null);
    toast.success('Marked as read');
  };

  const deleteEnquiry = async (id: string) => {
    await fetch('/api/contact', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    setSelected(null);
    toast.success('Enquiry deleted');
  };

  const exportCSV = () => {
    const headers = ['Name', 'Company', 'Email', 'Phone', 'Country', 'Subject', 'Service', 'Message', 'Date', 'Status'];
    const rows = filtered.map((e) => [
      e.name, e.company, e.email, e.phone || '', e.country,
      e.subject, e.service || '', `"${e.message.replace(/"/g, '""')}"`,
      new Date(e.created_at).toLocaleString(), e.is_read ? 'Read' : 'Unread',
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    toast.success('CSV exported');
  };

  const unreadCount = enquiries.filter((e) => !e.is_read).length;
  const readCount = enquiries.filter((e) => e.is_read).length;

  const filtered = enquiries.filter((e) => {
    if (filter === 'unread') return !e.is_read;
    if (filter === 'read') return e.is_read;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl uppercase text-white">Enquiries Dashboard</h1>
          <p className="text-smoke text-sm mt-1">All contact form submissions from website visitors</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={fetchEnquiries}>
            <RefreshCw size={14} /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} disabled={filtered.length === 0}>
            <Download size={14} /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card variant="dark" className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center">
            <Users size={20} className="text-gold" />
          </div>
          <div>
            <p className="font-heading text-2xl text-white">{enquiries.length}</p>
            <p className="text-xs text-smoke">Total Enquiries</p>
          </div>
        </Card>
        <Card variant="dark" className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center">
            <Mail size={20} className="text-gold" />
          </div>
          <div>
            <p className="font-heading text-2xl text-white">{unreadCount}</p>
            <p className="text-xs text-smoke">Unread</p>
          </div>
        </Card>
        <Card variant="dark" className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-onyx flex items-center justify-center">
            <CheckCircle size={20} className="text-smoke" />
          </div>
          <div>
            <p className="font-heading text-2xl text-white">{readCount}</p>
            <p className="text-xs text-smoke">Read</p>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'unread', 'read'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 text-xs font-accent uppercase tracking-wider rounded-sm border transition-colors ${
              filter === tab
                ? 'bg-gold/10 text-gold border-gold/30'
                : 'text-smoke border-onyx hover:text-white'
            }`}
          >
            {tab} {tab === 'all' ? `(${enquiries.length})` : tab === 'unread' ? `(${unreadCount})` : `(${readCount})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card variant="dark" className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-smoke">
            <RefreshCw size={20} className="animate-spin mr-2" /> Loading enquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-smoke">
            <Mail size={40} className="mb-3 opacity-30" />
            <p className="text-sm">No enquiries yet</p>
            <p className="text-xs mt-1 opacity-60">Submissions from the contact form will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-onyx text-left">
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Name</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Company</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Email</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Subject</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Date</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Status</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr
                    key={e.id}
                    className={`border-b border-onyx/50 hover:bg-onyx/30 cursor-pointer transition-colors ${!e.is_read ? 'bg-gold/5' : ''}`}
                    onClick={() => { setSelected(e); if (!e.is_read) markAsRead(e.id); }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {!e.is_read && <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />}
                        <span className="text-white font-medium">{e.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-smoke">{e.company}</td>
                    <td className="p-4 text-smoke">{e.email}</td>
                    <td className="p-4 text-smoke">{e.subject}</td>
                    <td className="p-4 text-smoke whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(e.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-4" onClick={(ev) => ev.stopPropagation()}>
                      <span className={`px-2 py-1 text-xs rounded-sm ${e.is_read ? 'bg-onyx text-smoke' : 'bg-gold/20 text-gold'}`}>
                        {e.is_read ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td className="p-4" onClick={(ev) => ev.stopPropagation()}>
                      <div className="flex gap-1">
                        <button
                          onClick={() => { setSelected(e); if (!e.is_read) markAsRead(e.id); }}
                          className="p-1.5 text-smoke hover:text-gold transition-colors"
                          title="View"
                        >
                          <Eye size={15} />
                        </button>
                        {!e.is_read && (
                          <button
                            onClick={() => markAsRead(e.id)}
                            className="p-1.5 text-smoke hover:text-gold transition-colors"
                            title="Mark as read"
                          >
                            <MailOpen size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteEnquiry(e.id)}
                          className="p-1.5 text-smoke hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <Card
            variant="dark"
            className="p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-heading text-lg uppercase text-white">{selected.subject}</h3>
                <p className="text-xs text-smoke mt-1">
                  {new Date(selected.created_at).toLocaleString('en-IN', {
                    day: '2-digit', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-smoke hover:text-white text-xl leading-none">✕</button>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-onyx/40 rounded-sm p-3">
                  <p className="text-xs text-smoke mb-1">Full Name</p>
                  <p className="text-white font-medium">{selected.name}</p>
                </div>
                <div className="bg-onyx/40 rounded-sm p-3">
                  <p className="text-xs text-smoke mb-1">Company</p>
                  <p className="text-white font-medium">{selected.company}</p>
                </div>
                <div className="bg-onyx/40 rounded-sm p-3">
                  <p className="text-xs text-smoke mb-1">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-gold hover:underline">{selected.email}</a>
                </div>
                <div className="bg-onyx/40 rounded-sm p-3">
                  <p className="text-xs text-smoke mb-1">Phone</p>
                  <p className="text-white">{selected.phone || '—'}</p>
                </div>
                <div className="bg-onyx/40 rounded-sm p-3">
                  <p className="text-xs text-smoke mb-1">Country</p>
                  <p className="text-white">{selected.country}</p>
                </div>
                <div className="bg-onyx/40 rounded-sm p-3">
                  <p className="text-xs text-smoke mb-1">Service</p>
                  <p className="text-white">{selected.service || '—'}</p>
                </div>
              </div>

              <div className="bg-onyx/40 rounded-sm p-3">
                <p className="text-xs text-smoke mb-2">Message</p>
                <p className="text-white leading-relaxed">{selected.message}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="flex-1 py-2.5 text-center text-sm bg-gold text-obsidian font-medium rounded-sm hover:bg-gold/90 transition-colors"
              >
                Reply via Email
              </a>
              <button
                onClick={() => deleteEnquiry(selected.id)}
                className="px-4 py-2.5 text-sm border border-red-500/30 text-red-400 rounded-sm hover:bg-red-500/10 transition-colors"
              >
                Delete
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
