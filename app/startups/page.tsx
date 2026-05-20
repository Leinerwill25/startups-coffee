import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Startup } from '@/lib/supabase/types';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import StartupDirectoryClient from '@/components/startups/startup-directory-client';

// Advanced interactive ecosystem items
import { FeaturedStartup } from '@/components/startups/featured-startup';
import { EcosystemMap } from '@/components/startups/ecosystem-map';
import { CommunityStats } from '@/components/startups/community-stats';

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
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          {/* Header Split layout */}
          <div className="max-w-3xl select-none">
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

          {/* Startup Destacada del Mes (Feature 23) */}
          <FeaturedStartup />

          {/* Leaflet ecosystem map showing pins across cities (Feature 19) */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-blue uppercase tracking-widest block mb-1">
                Ecosistema Nacional
              </span>
              <h3 className="font-display font-extrabold text-base text-ink uppercase tracking-wide">
                Distribución Geográfica
              </h3>
            </div>
            <EcosystemMap />
          </div>

          {/* Recharts community stats (Feature 20) */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-blue uppercase tracking-widest block mb-1">
                Métricas de Comunidad
              </span>
              <h3 className="font-display font-extrabold text-base text-ink uppercase tracking-wide">
                Análisis Estadístico
              </h3>
            </div>
            <CommunityStats />
          </div>

          {/* Directory Filter & Listings Content */}
          <div className="space-y-4 pt-6 border-t border-border/80">
            <div>
              <span className="text-[10px] font-bold text-blue uppercase tracking-widest block mb-1">
                Explorar Proyectos
              </span>
              <h3 className="font-display font-extrabold text-base text-ink uppercase tracking-wide">
                Directorio
              </h3>
            </div>
            
            {errorMsg ? (
              <div className="rounded-2xl border border-red-200 bg-rose-50 p-6 text-red-800 text-center max-w-xl mx-auto shadow-xs">
                <span className="text-3xl block mb-2">⚠️</span>
                <p className="font-medium text-xs font-semibold select-text">{errorMsg}</p>
              </div>
            ) : (
              <StartupDirectoryClient initialStartups={approvedStartups} />
            )}
          </div>
        </div>
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
}
