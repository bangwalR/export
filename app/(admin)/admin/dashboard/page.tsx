'use client';

import { useEffect, useState, useCallback } from 'react';
import { Mail, Users, CheckCircle, Clock, Eye, Trash2, MailOpen, RefreshCw, Download, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
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

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
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

  // Today's enquiries
  const todayCount = enquiries.filter((e) => {
    const d = new Date(e.created_at);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();
  }).length;

  const filtered = enquiries.filter((e) => {
    if (filter === 'unread') return !e.is_read;
    if (filter === 'read') return e.is_read;
    return true;
  });

  const stats = [
    { label: 'Total Enquiries', value: enquiries.length, sub: 'All time', icon: Users, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Unread', value: unreadCount, sub: 'Need attention', icon: Mail, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Read', value: readCount, sub: 'Reviewed', icon: CheckCircle, color: 'text-smoke', bg: 'bg-onyx' },
    { label: 'Today', value: todayCount, sub: 'New today', icon: TrendingUp, color: 'text-gold', bg: 'bg-gold/10' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl uppercase text-white">Enquiries Dashboard</h1>
          <p className="text-smoke text-sm mt-1">All contact form submissions from your website visitors</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchEnquiries}
            className="flex items-center gap-2 px-3 py-2 text-xs border border-onyx text-smoke hover:text-white rounded-sm transition-colors"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-3 py-2 text-xs border border-onyx text-smoke hover:text-white rounded-sm transition-colors disabled:opacity-40"
          >
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} variant="dark" className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-sm ${s.bg} flex items-center justify-center`}>
                  <Icon size={18} className={s.color} />
                </div>
              </div>
              <p className="font-heading text-3xl text-white">{loading ? '—' : s.value}</p>
              <p className="text-xs text-white mt-0.5">{s.label}</p>
              <p className="text-xs text-smoke mt-0.5">{s.sub}</p>
            </Card>
          );
        })}
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
            {tab}{' '}
            ({tab === 'all' ? enquiries.length : tab === 'unread' ? unreadCount : readCount})
          </button>
        ))}
      </div>

      {/* Enquiries Table */}
      <Card variant="dark" className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-smoke">
            <RefreshCw size={20} className="animate-spin mr-2" />
            Loading enquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-smoke">
            <Mail size={44} className="mb-3 opacity-20" />
            <p className="text-sm font-medium">No enquiries yet</p>
            <p className="text-xs mt-1 opacity-50">
              When visitors submit the contact form, they will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-onyx text-left">
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">#</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Name</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Company</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Email</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Country</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Subject</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Service</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Date</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Status</th>
                  <th className="p-4 text-smoke font-accent uppercase text-xs tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr
                    key={e.id}
                    className={`border-b border-onyx/40 hover:bg-onyx/30 transition-colors cursor-pointer ${!e.is_read ? 'bg-gold/5' : ''}`}
                    onClick={() => { setSelected(e); if (!e.is_read) markAsRead(e.id); }}
                  >
                    <td className="p-4 text-smoke text-xs">{i + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {!e.is_read && <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />}
                        <span className="text-white font-medium whitespace-nowrap">{e.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-smoke whitespace-nowrap">{e.company}</td>
                    <td className="p-4 text-smoke">{e.email}</td>
                    <td className="p-4 text-smoke whitespace-nowrap">{e.country}</td>
                    <td className="p-4 text-smoke whitespace-nowrap">{e.subject}</td>
                    <td className="p-4 text-smoke whitespace-nowrap">{e.service || '—'}</td>
                    <td className="p-4 text-smoke whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs">
                        <Clock size={11} />
                        {new Date(e.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="p-4" onClick={(ev) => ev.stopPropagation()}>
                      <span className={`px-2 py-1 text-xs rounded-sm whitespace-nowrap ${e.is_read ? 'bg-onyx text-smoke' : 'bg-gold/20 text-gold'}`}>
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
                          <Eye size={14} />
                        </button>
                        {!e.is_read && (
                          <button
                            onClick={() => markAsRead(e.id)}
                            className="p-1.5 text-smoke hover:text-gold transition-colors"
                            title="Mark as read"
                          >
                            <MailOpen size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteEnquiry(e.id)}
                          className="p-1.5 text-smoke hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
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
            onClick={(ev) => ev.stopPropagation()}
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
              <button onClick={() => setSelected(null)} className="text-smoke hover:text-white text-xl leading-none ml-4">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              {[
                { label: 'Full Name', value: selected.name },
                { label: 'Company', value: selected.company },
                { label: 'Email', value: selected.email, link: `mailto:${selected.email}` },
                { label: 'Phone', value: selected.phone || '—' },
                { label: 'Country', value: selected.country },
                { label: 'Service', value: selected.service || '—' },
              ].map(({ label, value, link }) => (
                <div key={label} className="bg-onyx/40 rounded-sm p-3">
                  <p className="text-xs text-smoke mb-1">{label}</p>
                  {link ? (
                    <a href={link} className="text-gold hover:underline break-all">{value}</a>
                  ) : (
                    <p className="text-white font-medium">{value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-onyx/40 rounded-sm p-3 mb-6 text-sm">
              <p className="text-xs text-smoke mb-2">Message</p>
              <p className="text-white leading-relaxed">{selected.message}</p>
            </div>

            <div className="flex gap-3">
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="flex-1 py-2.5 text-center text-sm bg-gold text-obsidian font-semibold rounded-sm hover:bg-gold/90 transition-colors"
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
