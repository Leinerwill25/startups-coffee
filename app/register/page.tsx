import React from 'react';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import RegisterForm from '@/components/register/register-form';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Header Navbar */}
      <Navbar />

      <main className="flex-grow py-16 bg-bg-subtle/30">
        <div className="mx-auto max-w-7xl px-6">
          <RegisterForm />
        </div>
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
}
