import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Startup } from '@/lib/supabase/types';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import StartupDirectoryClient from '@/components/startups/startup-directory-client';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function StartupsPage() {
  let approvedStartups: Startup[] = [];
  let errorMsg = '';

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching approved startups:', error);
      errorMsg = 'No pudimos conectar con el directorio de startups. Por favor, intenta de nuevo más tarde.';
    } else {
      approvedStartups = (data as Startup[]) || [];
    }
  } catch (err) {
    console.error('Exception fetching startups:', err);
    errorMsg = 'Error al cargar el directorio de startups.';
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Header Navbar */}
      <Navbar />

      <main className="flex-grow py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header Split layout */}
          <div className="max-w-3xl mb-12 select-none">
            <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
              Directorio Público
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-ink mb-4 leading-none">
              Comunidad de Startups
            </h1>
            <p className="font-body text-muted text-xs sm:text-sm leading-relaxed">
              Explora el directorio público de proyectos tecnológicos y startups fundadas por miembros de la comunidad de Startups Coffee en Caracas y toda Venezuela.
            </p>
          </div>

          {/* Directory Content */}
          {errorMsg ? (
            <div className="rounded-2xl border border-red-200 bg-rose-50 p-6 text-red-800 text-center max-w-xl mx-auto shadow-xs">
              <span className="text-3xl block mb-2">⚠️</span>
              <p className="font-medium text-xs font-semibold select-text">{errorMsg}</p>
            </div>
          ) : (
            <StartupDirectoryClient initialStartups={approvedStartups} />
          )}
        </div>
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
}
