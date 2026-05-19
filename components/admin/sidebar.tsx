'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LayoutDashboard, Rocket, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Startups',
      href: '/admin/startups',
      icon: Rocket,
    },
  ];

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
      router.push('/admin/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-ink text-white flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-white/10 shrink-0 select-none">
      {/* Sidebar Header */}
      <div className="h-16 px-6 border-b border-white/10 flex items-center gap-2 bg-black/40">
        <span className="text-xl">☕</span>
        <div className="flex flex-col font-body">
          <span className="font-display font-black text-sm leading-none tracking-wide text-white">
            Startups Coffee
          </span>
          <span className="text-[10px] font-semibold text-blue uppercase tracking-wider mt-0.5">
            Panel Admin
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-semibold transition-all ${
                active
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer (Logout) */}
      <div className="p-4 border-t border-white/10 bg-black/20 font-body">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer text-left"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
