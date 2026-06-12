'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Mail, FileText, Briefcase, Image, MessageSquare,
  Users, HelpCircle, Settings, LogOut, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Mail },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = 'admin_auth=; path=/; max-age=0';
    window.location.href = '/admin/login';
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-graphite border border-onyx rounded-sm text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        'fixed top-0 left-0 bottom-0 w-64 bg-graphite border-r border-onyx z-40 transition-transform lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-5 border-b border-onyx">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <img src="/images/logo.svg" alt="TranCoreX" className="h-10 w-auto" />
            <div>
              <span className="font-heading text-base font-bold tracking-wider text-white">
                TRAN<span className="text-gold">CORE</span><span className="text-gold">X</span>
              </span>
              <p className="text-[10px] text-smoke mt-0.5">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors',
                  isActive ? 'bg-gold/10 text-gold border border-gold/20' : 'text-smoke hover:text-white hover:bg-onyx/50'
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-onyx">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm text-smoke hover:text-red-400 transition-colors rounded-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
