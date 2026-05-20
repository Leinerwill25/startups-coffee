import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Startup } from '@/lib/supabase/types';

// Importing upgraded Phase 2 layout sections
import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import StatsRow from '@/components/landing/stats-row';
import AboutSection from '@/components/landing/about-section';
import BentoGrid from '@/components/landing/bento-grid';
import NextEventCard from '@/components/landing/next-event-card';
import PodcastPreview from '@/components/landing/podcast-preview';
import StartupsPreview from '@/components/landing/startups-preview';
import TestimonialsCarousel from '@/components/landing/testimonials-carousel';
import Footer from '@/components/landing/footer';
import Button from '@/components/ui/button';
import Link from 'next/link';

// Módulo de Interactividad components
import { EventBanner } from '@/components/landing/event-banner';
import { Organizers } from '@/components/landing/organizers';
import { RoadmapTimeline } from '@/components/landing/roadmap-timeline';
import { FAQSection } from '@/components/landing/faq-section';
import { PhotoGallery } from '@/components/landing/photo-gallery';
import { VideoHighlights } from '@/components/landing/video-highlights';
import { InstagramFeed } from '@/components/landing/instagram-feed';
import { SpeakersSection } from '@/components/landing/speakers-section';
import { BookOpen } from 'lucide-react';

export const revalidate = 60; // ISR - revalidate page cache every 60 seconds

export default async function Home() {
  let approvedStartups: Startup[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('startups')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(3);

    if (data) {
      approvedStartups = data as Startup[];
    }
  } catch (err) {
    console.error('Error fetching landing startups:', err);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Promo banner at the top of everything */}
      <EventBanner />

      {/* Sticky Header Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner + 3D Abanico fan gallery */}
        <Hero />

        {/* Co-organizers discrete logos row */}
        <Organizers />

        {/* Dark Metric Stats Grid Row with count up */}
        <StatsRow />

        {/* Split About Section + Minimal Text columns */}
        <AboutSection />

        {/* Asymmetric Bento Grid rows */}
        <BentoGrid />

        {/* Interactive Roadmap Timeline */}
        <RoadmapTimeline />

        {/* Large centered custom border Next Event Card */}
        <NextEventCard />

        {/* Past speakers profile grid */}
        <SpeakersSection />

        {/* Dark theme Podcast Section + Shimmer Skeletons list */}
        <PodcastPreview />

        {/* Past Event Photo Lightbox gallery */}
        <PhotoGallery />

        {/* Vertical Reel Video highlights */}
        <VideoHighlights />

        {/* Post-event summaries quick report banner */}
        <section className="bg-surface py-12 border-t border-b border-blue/10 select-none text-center">
          <div className="max-w-xl mx-auto px-6">
            <span className="inline-flex items-center gap-1.5 bg-blue/10 text-blue px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-3">
              <BookOpen size={12} /> Lectura rápida
            </span>
            <h4 className="font-display font-extrabold text-sm text-ink uppercase tracking-wide mb-1">
              ¿Te perdiste el último encuentro?
            </h4>
            <p className="text-xs text-muted font-body mb-4">
              Lee los aprendizajes clave del taller de validación.
            </p>
            <Link href="/eventos/pmf-y-validacion">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue hover:text-blue-dark hover:underline transition-colors cursor-pointer">
                Ver resumen del mes 1 →
              </span>
            </Link>
          </div>
        </section>

        {/* Startups community approved listings grid */}
        <StartupsPreview startups={approvedStartups} />

        {/* Testimonials pure-React dots carousel with auto-slide & Touch check */}
        <TestimonialsCarousel />

        {/* Instagram post grid embed */}
        <InstagramFeed />

        {/* Smooth Accordion FAQ list */}
        <FAQSection />

        {/* CTA final centered box */}
        <section className="bg-blue text-white py-20 text-center select-none relative overflow-hidden">
          {/* Subtle decor dots grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />
          <div className="max-w-2xl mx-auto px-6 relative z-10 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              ¿Listo para ser parte de la comunidad?
            </h2>
            <p className="font-sans text-white/80 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Registra tu startup hoy para obtener visibilidad pública, conexiones exclusivas y asistencia a nuestros encuentros mensuales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register" className="w-full sm:w-auto">
                <Button pill size="lg" className="bg-white text-blue hover:bg-surface border-transparent shadow-md w-full">
                  Registra tu Startup
                </Button>
              </Link>
              <Link href="/startups" className="w-full sm:w-auto">
                <Button pill variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/5 w-full">
                  Ver el directorio
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
}
