import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/server';
import { Startup } from '@/lib/supabase/types';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

// ─── Above-the-fold: load eagerly ─────────────────────────────────────────────
import Navbar       from '@/components/landing/navbar';
import Hero         from '@/components/landing/hero';
import { EventBanner } from '@/components/landing/event-banner';
import { Organizers }  from '@/components/landing/organizers';
import StatsRow     from '@/components/landing/stats-row';
import AboutSection from '@/components/landing/about-section';
import Button       from '@/components/ui/button';

// ─── Below-the-fold: code-split via dynamic() ────────────────────────────────
// Note: ssr:false is not allowed in Server Components; we use dynamic without it.
// Suspense boundaries handle the loading state while JS chunks stream in.
const BentoGrid     = dynamic(() => import('@/components/landing/bento-grid'));
const RoadmapTimeline = dynamic(() =>
  import('@/components/landing/roadmap-timeline').then(m => ({ default: m.RoadmapTimeline }))
);
const NextEventCard = dynamic(() => import('@/components/landing/next-event-card'));
const SpeakersSection = dynamic(() =>
  import('@/components/landing/speakers-section').then(m => ({ default: m.SpeakersSection }))
);
const PodcastPreview  = dynamic(() => import('@/components/landing/podcast-preview'));
const PhotoGallery    = dynamic(() =>
  import('@/components/landing/photo-gallery').then(m => ({ default: m.PhotoGallery }))
);
const VideoHighlights = dynamic(() =>
  import('@/components/landing/video-highlights').then(m => ({ default: m.VideoHighlights }))
);
const StartupsPreview = dynamic(() => import('@/components/landing/startups-preview'));
const TestimonialsCarousel = dynamic(() => import('@/components/landing/testimonials-carousel'));
const InstagramFeed   = dynamic(() =>
  import('@/components/landing/instagram-feed').then(m => ({ default: m.InstagramFeed }))
);
const FAQSection      = dynamic(() =>
  import('@/components/landing/faq-section').then(m => ({ default: m.FAQSection }))
);
const Footer          = dynamic(() => import('@/components/landing/footer'));

// Minimal skeleton placeholder while lazy chunks load
function SectionSkeleton({ h = 'h-48' }: { h?: string }) {
  return <div className={`${h} bg-bg-subtle animate-pulse`} />;
}

export const revalidate = 60;

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
      {/* Promo banner */}
      <EventBanner />

      {/* Sticky Header Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* ── ABOVE FOLD — eagerly rendered ── */}
        <Hero />
        <Organizers />
        <StatsRow />
        <AboutSection />

        {/* ── BELOW FOLD — code-split + Suspense ── */}
        <Suspense fallback={<SectionSkeleton h="h-[500px]" />}>
          <BentoGrid />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-[480px]" />}>
          <RoadmapTimeline />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-[600px]" />}>
          <NextEventCard />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-64" />}>
          <SpeakersSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-48" />}>
          <PodcastPreview />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-96" />}>
          <PhotoGallery />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-[500px]" />}>
          <VideoHighlights />
        </Suspense>

        {/* Post-event summary — lightweight inline section */}
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

        <Suspense fallback={<SectionSkeleton h="h-48" />}>
          <StartupsPreview startups={approvedStartups} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-48" />}>
          <TestimonialsCarousel />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-64" />}>
          <InstagramFeed />
        </Suspense>

        <Suspense fallback={<SectionSkeleton h="h-48" />}>
          <FAQSection />
        </Suspense>

        {/* CTA final */}
        <section className="bg-blue text-white py-20 text-center select-none relative overflow-hidden">
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

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
