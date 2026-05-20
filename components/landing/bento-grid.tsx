import React from 'react';
import { Sparkles, MessageSquare, Heart, Shield } from 'lucide-react';

export default function BentoGrid() {
  return (
    <section className="py-24 bg-bg-subtle select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
            Nuestra Metodología
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-tight">
            Cómo funciona el encuentro
          </h2>
          <p className="font-body text-muted text-xs sm:text-sm mt-3 leading-relaxed">
            Una experiencia diseñada de fundador a fundador para maximizar la entrega de valor sin rodeos teóricos.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
          {/* Fila 1: Card 1 (Image Overlay 60%) */}
          <div className="lg:col-span-6 relative h-80 rounded-2xl overflow-hidden border border-border shadow-sm group">
            <img
              src="/IMG_2070.jpg"
              alt="Dos Masterclasses en acción en el Hub"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            
            {/* Card Content (Pinned Bottom) */}
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue px-2.5 py-0.5 text-[9px] font-body font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="h-3 w-3 shrink-0" />
                Dos Masterclasses
              </span>
              <h3 className="font-display text-2xl font-extrabold mb-1.5">
                Ponentes founders reales
              </h3>
              <p className="font-body text-white/70 text-[11px] leading-relaxed max-w-sm">
                Escucha el proceso de founders que ya validaron, vendieron y escalaron. Sin adornos ni teoría académica.
              </p>
            </div>
          </div>

          {/* Fila 1: Card 2 (Text Card 40%) */}
          <div className="lg:col-span-4 bg-surface p-8 rounded-2xl border border-blue/10 shadow-sm flex flex-col justify-between hover:border-blue/30 transition-all duration-300">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center border border-blue/10 text-blue shadow-xs">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[9px] font-body font-semibold text-blue uppercase tracking-wider block mb-1">
                Conectar
              </span>
              <h3 className="font-display text-2xl font-extrabold text-ink mb-1.5">
                Networking
              </h3>
              <p className="font-body text-muted text-xs leading-relaxed">
                Al terminar las masterclasses, el espacio del HUB BDV se convierte en un centro libre de interacción para alianzas, feedbacks e intercambios reales.
              </p>
            </div>
          </div>

          {/* Fila 2: Card 3 (Text Card 35%) */}
          <div className="lg:col-span-4 bg-surface p-8 rounded-2xl border border-blue/10 shadow-sm flex flex-col justify-between hover:border-blue/30 transition-all duration-300">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center border border-blue/10 text-blue shadow-xs">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[9px] font-body font-semibold text-blue uppercase tracking-wider block mb-1">
                Colaboración
              </span>
              <h3 className="font-display text-2xl font-extrabold text-ink mb-1.5">
                Ponentes Voluntarios
              </h3>
              <p className="font-body text-muted text-xs leading-relaxed">
                Nuestros ponentes asisten motivados por el deseo genuino de expandir el semillero tecnológico de Venezuela, compartiendo lo que nadie más te cuenta.
              </p>
            </div>
          </div>

          {/* Fila 2: Card 4 (Image Overlay 65%) */}
          <div className="lg:col-span-6 relative h-80 rounded-2xl overflow-hidden border border-border shadow-sm group">
            <img
              src="/IMG_2071.jpg"
              alt="Comunidad Real de startups en Caracas"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

            {/* Card Content (Pinned Bottom) */}
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue px-2.5 py-0.5 text-[9px] font-body font-semibold uppercase tracking-wider mb-3">
                <Shield className="h-3 w-3 shrink-0" />
                Comunidad Real
              </span>
              <h3 className="font-display text-2xl font-extrabold mb-1.5">
                Ecosistema sin filtros
              </h3>
              <p className="font-body text-white/70 text-[11px] leading-relaxed max-w-sm">
                Un entorno donde las preguntas difíciles son bienvenidas y se resuelven con honestidad total y apoyo comunitario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
