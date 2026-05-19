import React from 'react';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/sidebar';

export const metadata = {
  title: 'Admin Panel · Startups Coffee',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;

  try {
    const supabase = await createClient();
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();
    user = supabaseUser;
  } catch (err) {
    console.error('Error fetching admin session layout:', err);
  }

  if (!user) {
    // Render minimal layout without sidebar (e.g. for /admin/login)
    return (
      <div className="bg-bg-subtle min-h-screen flex flex-col justify-center">
        {children}
      </div>
    );
  }

  // Render dashboard layout with fixed sidebar
  return (
    <div className="flex bg-bg-subtle min-h-screen text-ink">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-grow pl-64 min-h-screen flex flex-col">
        <div className="flex-grow p-8 sm:p-10">{children}</div>
      </div>
    </div>
  );
}
