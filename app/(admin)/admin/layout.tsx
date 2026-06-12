'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Toaster } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster theme="dark" position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen p-6 lg:p-8 pt-16 lg:pt-8">
        {children}
      </main>
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}
