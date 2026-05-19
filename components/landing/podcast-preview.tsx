'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton';
import Badge from '@/components/ui/badge';
import { Play, Instagram, Globe, Disc, Volume2 } from 'lucide-react';

export default function PodcastPreview() {
  const episodesSkeleton = [
    { num: 'Ep. 04', title: 'Crear marca y comunidad local' },
    { num: 'Ep. 03', title: 'Product Market Fit en mercados emergentes' },
    { num: 'Ep. 02', title: 'Levantamiento de capital en Venezuela' },
    { num: 'Ep. 01', title: 'Errores comunes de founders novatos' },
  ];

  return (
    <section className="bg-bg-subtle py-24 border-t border-border select-none relative overflow-hidden">
      {/* Background visual disc glow */}
      <Disc className="absolute right-[-10%] top-[20%] text-blue/4 h-[25rem] w-[25rem] animate-spin-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda (55%) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div>
              <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
                🎙 Startups Coffee Podcast
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-[1.1] tracking-tight">
                "Las conversaciones que el ecosistema venezolano necesita."
              </h2>
            </div>
            
            <p className="font-body text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
              Entrevistas sin filtros con los fundadores, operadores y referentes del ecosistema. 
              Compartimos las historias de éxito real, los fracasos de los que nadie habla y las lecciones clave para escalar.
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
                  Seguirnos en Instagram ↗
                </Button>
              </a>
              
              <div className="inline-flex items-center gap-1.5 bg-surface border border-blue/15 px-3 py-1.5 rounded-full select-none text-[10px] font-bold text-blue uppercase tracking-wider">
                <Globe className="h-3 w-3" />
                🌍 Comunidad tech venezolana
              </div>
            </div>

            {/* Audio Widget Pinned */}
            <div className="bg-white border border-border p-5 rounded-2xl max-w-md shadow-xs animate-pulse-slow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                    <Disc className="h-5 w-5 animate-spin" />
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-blue uppercase tracking-wider leading-none block mb-0.5">
                      Episodio próximo — Mes 2
                    </span>
                    <span className="text-xs font-semibold text-ink leading-none block">
                      Validación de Idea y PMF
                    </span>
                  </div>
                </div>
                <Volume2 className="h-4 w-4 text-muted" />
              </div>

              {/* Progress Bar Mock */}
              <div className="space-y-1.5">
                <div className="w-full bg-bg-subtle h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue w-1/4 h-full rounded-full" />
                </div>
                <div className="flex justify-between items-center text-[9px] text-muted font-mono">
                  <span>00:00</span>
                  <span>45:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha (45%) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider border-b border-border pb-3">
              Explore los episodios
            </h3>
            
            <div className="flex flex-col gap-4">
              {episodesSkeleton.map((ep, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white border border-border/80 p-4 rounded-xl hover:border-blue/20 hover:shadow-2xs transition-all duration-200"
                >
                  {/* Gray Thumbnail Shimmer */}
                  <Skeleton className="h-12 w-12 rounded-lg bg-bg-subtle shrink-0 flex items-center justify-center text-muted/30 text-[10px] font-bold">
                    [▶]
                  </Skeleton>
                  
                  {/* Titles Shimmers */}
                  <div className="flex-grow min-w-0 font-body">
                    <span className="text-[9px] font-semibold text-blue uppercase tracking-wider leading-none block mb-1">
                      {ep.num}
                    </span>
                    <h4 className="text-xs font-semibold text-ink truncate leading-tight mb-1">
                      {ep.title}
                    </h4>
                    {/* Small text skeleton indicator */}
                    <div className="h-2.5 bg-bg-subtle rounded w-24" />
                  </div>

                  <Badge variant="blue" className="bg-blue/10 border-blue/15 text-blue shrink-0">
                    Próximamente
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
