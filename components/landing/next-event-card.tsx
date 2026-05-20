import React from 'react';
import Button from '@/components/ui/button';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NextEventCard() {
  return (
    <section id="proximo-evento" className="py-24 bg-white select-none">
      <div className="max-w-4xl mx-auto px-6">
        {/* Border High-Contrast Card */}
        <div className="relative border-2 border-blue bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-blue/5 overflow-hidden group">
          {/* Decorative Corner Blue Shimmer */}
          <div className="absolute top-[-10%] right-[-10%] w-[15rem] h-[15rem] rounded-full bg-blue/5 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <div className="flex flex-col items-center text-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[10px] font-body font-semibold text-blue uppercase tracking-wider mb-6">
              <Calendar className="h-3 w-3 shrink-0" />
              Próximo Evento
            </div>

            {/* Tema del mes */}
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink mb-3 leading-tight max-w-xl">
              Tema del mes: <span className="text-blue">Financiamiento y Pitching</span>
            </h3>
            
            <p className="font-body text-muted text-xs sm:text-sm max-w-md mb-8 leading-relaxed">
              Descubre cómo estructurar tu deck y levantar capital en etapas tempranas junto a dos founders que ya escalaron en el mercado regional.
            </p>

            {/* Sede Oficial BDV Innova Logo */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-8 bg-bg-subtle/50 px-4 py-2 rounded-xl border border-border/60">
              <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted">
                Sede Oficial:
              </span>
              <div className="h-4 w-px bg-border/60 hidden sm:block mx-1" />
              <img
                src="/bdv.png"
                alt="HUB BDV INNOVA"
                className="h-7 w-auto object-contain select-none pointer-events-none"
              />
            </div>

            {/* Location & Date grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12 w-full max-w-md py-6 border-t border-b border-border mb-8">
              <div className="flex items-center justify-center gap-2.5 text-ink">
                <MapPin className="h-4.5 w-4.5 text-blue shrink-0 animate-bounce" />
                <div className="text-left select-text">
                  <span className="block text-[9px] font-body font-semibold uppercase tracking-wider text-muted leading-none mb-1">
                    Ubicación
                  </span>
                  <span className="text-xs font-body font-semibold leading-none">
                    HUB BDV INNOVA, Caracas
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2.5 text-ink">
                <Calendar className="h-4.5 w-4.5 text-blue shrink-0" />
                <div className="text-left select-text">
                  <span className="block text-[9px] font-body font-semibold uppercase tracking-wider text-muted leading-none mb-1">
                    Fecha del encuentro
                  </span>
                  <span className="text-xs font-body font-semibold leading-none">
                    Junio 2025 (Por confirmar)
                  </span>
                </div>
              </div>
            </div>

            {/* CTA action button */}
            <Link href="/register">
              <Button pill size="lg" className="gap-2 px-8 py-3.5">
                Quiero asistir
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
