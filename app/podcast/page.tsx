import React from 'react';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import EpisodeSkeleton from '@/components/podcast/episode-skeleton';
import Button from '@/components/ui/button';
import { Play, Instagram, Globe, Disc, Volume2, ShieldCheck, Target, Zap, ArrowRight } from 'lucide-react';

export default function PodcastPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Header Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* SECTION 1: Light Hero Banner */}
        <section className="bg-bg-subtle border-b border-border py-24 select-none relative overflow-hidden">
          {/* Subtle decor glowing disc */}
          <Disc className="absolute left-[-5%] top-[10%] text-blue/4 h-[22rem] w-[22rem] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (55%) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div>
                  <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
                    🎙 Podcast Oficial
                  </span>
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink leading-[1.08] tracking-tight">
                    "Las conversaciones que el ecosistema venezolano necesita."
                  </h1>
                </div>

                <p className="font-body text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
                  Founders venezolanos que ya escalaron en mercados locales y globales compartiendo lo que nadie más te cuenta. Lecciones honestas y sin filtros.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Button pill size="md" className="gap-2">
                    <Play className="h-4 w-4 fill-white" />
                    Próximamente
                  </Button>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button pill variant="secondary" size="md" className="border-border text-ink hover:bg-white hover:border-blue/30 gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram ↗
                    </Button>
                  </a>

                  <div className="inline-flex items-center gap-1.5 bg-surface border border-blue/15 px-3 py-1.5 rounded-full text-[10px] font-bold text-blue uppercase tracking-wider">
                    <Globe className="h-3 w-3" />
                    🌍 Comunidad tech venezolana
                  </div>
                </div>

                {/* Audio Widget Mockup */}
                <div className="bg-white border border-border p-5 rounded-2xl max-w-md shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                        <Disc className="h-5 w-5 animate-spin-slow" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-blue uppercase tracking-wider leading-none block mb-0.5">
                          Ep. 01 — Próximamente
                        </span>
                        <span className="text-xs font-semibold text-ink leading-none block">
                          Estructurando tu MVP
                        </span>
                      </div>
                    </div>
                    <Volume2 className="h-4 w-4 text-muted" />
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-bg-subtle h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue w-1/12 h-full rounded-full animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-muted font-mono">
                      <span>00:00</span>
                      <span>38:15</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (45% B&W Unsplash with blue overlay) */}
              <div className="lg:col-span-5 relative h-96 rounded-3xl overflow-hidden border border-border group shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800"
                  alt="Vintage Studio Microphone"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition-all duration-500"
                />
                {/* Tech blue tint overlay */}
                <div className="absolute inset-0 bg-blue/15 mix-blend-color-burn" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Upcoming Episodes in Grid skeletons */}
        <section className="py-24 bg-white select-none">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
              <div>
                <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
                  Calendario de Lanzamientos
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                  Episodios que vienen
                </h2>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-full text-[10px] font-body font-semibold text-blue uppercase tracking-wider border border-blue/15 animate-pulse">
                🔔 Suscríbete para ser el primero
              </div>
            </div>

            {/* Render 6 Episodes Shimmer skeletons */}
            <EpisodeSkeleton />
          </div>
        </section>

        {/* SECTION 3: Why listen to us (Bento values style) */}
        <section className="py-24 bg-bg-subtle select-none">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
                Propuesta de Valor
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                Por qué escucharnos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Col 1: Sin filtros */}
              <div className="bg-white rounded-2xl border border-border p-8 shadow-xs flex flex-col justify-between h-56 hover:border-blue/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-lg bg-surface flex items-center justify-center text-blue shadow-3xs shrink-0">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-ink mb-1.5">
                    🎯 Sin filtros
                  </h3>
                  <p className="font-body text-muted text-xs leading-relaxed">
                    Conversamos abiertamente sobre lo que realmente pasó en la operación, las decisiones difíciles, los tropiezos y las lecciones honestas de founders locales.
                  </p>
                </div>
              </div>

              {/* Col 2: Contexto local */}
              <div className="bg-white rounded-2xl border border-border p-8 shadow-xs flex flex-col justify-between h-56 hover:border-blue/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-lg bg-surface flex items-center justify-center text-blue shadow-3xs shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-ink mb-1.5">
                    🇻🇪 Contexto local
                  </h3>
                  <p className="font-body text-muted text-xs leading-relaxed">
                    Un podcast diseñado específicamente para el ecosistema venezolano. Hablamos de los retos reales de infraestructura, cobros, captación de talento y escalamiento.
                  </p>
                </div>
              </div>

              {/* Col 3: Siempre disponible */}
              <div className="bg-white rounded-2xl border border-border p-8 shadow-xs flex flex-col justify-between h-56 hover:border-blue/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-lg bg-surface flex items-center justify-center text-blue shadow-3xs shrink-0">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-ink mb-1.5">
                    📱 Siempre disponible
                  </h3>
                  <p className="font-body text-muted text-xs leading-relaxed">
                    Cada masterclass y entrevista quedará completamente documentada y archivada, permitiéndote acceder al contenido de valor cuando lo necesites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Blue CTA Footer */}
        <section className="bg-blue text-white py-16 text-center select-none relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />
          <div className="max-w-2xl mx-auto px-6 relative z-10 space-y-4">
            <h2 className="font-display text-3xl font-extrabold leading-tight">
              ¿Eres un founder con historia que contar?
            </h2>
            <p className="font-body text-white/80 text-xs leading-relaxed max-w-sm mx-auto">
              Buscamos ponentes que quieran compartir aprendizajes prácticos de negocio y nutrir a la nueva generación de emprendedores venezolanos.
            </p>
            <div className="pt-2">
              <a href="mailto:ponente@startupscoffee.com?subject=Interés en participar como Ponente">
                <Button pill className="bg-white text-blue hover:bg-surface border-transparent gap-2 px-8 py-3">
                  Conviértete en ponente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
}
