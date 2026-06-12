'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set auth cookie readable by middleware
      document.cookie = 'admin_auth=true; path=/; max-age=86400; SameSite=Strict';
      toast.success('Login successful!');
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img src="/images/logo.svg" alt="TranCoreX" className="h-16 w-auto" />
          </div>
          <span className="font-heading text-2xl font-bold tracking-wider text-white">
            TRAN<span className="text-gold">CORE</span><span className="text-gold">X</span>
          </span>
          <p className="text-smoke text-sm mt-2">Admin Portal</p>
        </div>

        <div className="glass-card p-8">
          <h1 className="font-heading text-xl uppercase text-white mb-6 text-center">Sign In</h1>
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="admin"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
