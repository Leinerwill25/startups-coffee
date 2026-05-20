import React from 'react';

export default function AboutSection() {
  const features = [
    {
      title: 'Masterclasses',
      subtitle: 'Ponencias Reales',
      description:
        'Dos sesiones por evento con founders exitosos que ya recorrieron el camino. Sin teoría académica, solo lecciones del mundo real y aprendizajes prácticos.',
    },
    {
      title: 'Networking',
      subtitle: 'Conexión Directa',
      description:
        'Conecta de verdad con emprendedores, inversionistas y entusiastas en distintas etapas. Al terminar las masterclasses, tiempo libre para potenciar alianzas.',
    },
    {
      title: 'Comunidad',
      subtitle: 'Directorio Público',
      description:
        'Forma parte activa del semillero de startups venezolanas. Registra tu empresa para tener visibilidad ante inversionistas, aliados y clientes potenciales.',
    },
  ];

  return (
    <section className="py-24 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-16 mb-20">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
              Sobre el evento
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-tight">
              El semillero del <span className="text-blue">ecosistema venezolano.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="font-body text-muted text-sm sm:text-base leading-relaxed">
              Startups Coffee es un encuentro mensual diseñado para impulsar a los fundadores
              venezolanos en etapas tempranas. Co-organizado por{' '}
              <span className="font-semibold text-ink">Smartgib</span>,{' '}
              <span className="font-semibold text-ink">Rematte</span>,{' '}
              <span className="font-semibold text-ink">Ashira</span> y{' '}
              <span className="font-semibold text-ink">Syncwave</span> en el{' '}
              <span className="font-semibold text-ink">HUB BDV INNOVA</span> del Banco de Venezuela,
              creamos un espacio sin filtros donde la experiencia práctica desplaza a la teoría y el
              networking genera alianzas reales y medibles.
            </p>

            {/* Organizer Logo Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {/* Card 1: Smartgib */}
              <div className="bg-bg-subtle/40 border border-border/60 rounded-xl p-3 flex items-center justify-center hover:border-blue/30 transition-all hover:bg-white duration-200">
                <svg className="w-4 h-4 text-blue/80 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                  <path d="M6 9v6" />
                </svg>
                <span className="font-display font-extrabold text-[11px] tracking-wider text-ink/80 uppercase">
                  Smartgib
                </span>
              </div>

              {/* Card 2: Rematte */}
              <div className="bg-bg-subtle/40 border border-border/60 rounded-xl p-3 flex items-center justify-center hover:border-blue/30 transition-all hover:bg-white duration-200">
                <svg className="w-4 h-4 text-blue/80 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 5 4 4" />
                  <path d="M9 11l4 4" />
                  <path d="M5 15l4 4" />
                  <path d="M2 22l4-4" />
                  <path d="M22 2l-3.5 3.5-6.5-6.5L15.5 2z" />
                  <path d="m13.5 6.5 4 4-10 10-4-4 10-10z" />
                </svg>
                <span className="font-display font-extrabold text-[11px] tracking-wider text-ink/80 uppercase">
                  Rematte
                </span>
              </div>

              {/* Card 3: Ashira */}
              <div className="bg-bg-subtle/40 border border-border/60 rounded-xl p-3 flex items-center justify-center hover:border-blue/30 transition-all hover:bg-white duration-200">
                <svg className="w-4 h-4 text-blue/80 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
                </svg>
                <span className="font-display font-extrabold text-[11px] tracking-wider text-ink/80 uppercase">
                  Ashira
                </span>
              </div>

              {/* Card 4: Syncwave */}
              <div className="bg-bg-subtle/40 border border-border/60 rounded-xl p-3 flex items-center justify-center hover:border-blue/30 transition-all hover:bg-white duration-200">
                <svg className="w-4 h-4 text-blue/80 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h3l3-9 4 18 3-12h5" />
                </svg>
                <span className="font-display font-extrabold text-[11px] tracking-wider text-ink/80 uppercase">
                  Syncwave
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist 3 Columns Features (Text-Only, Horizontal Dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
          {features.map((feat, idx) => (
            <div key={idx} className="space-y-4 pt-4 border-t-2 border-transparent hover:border-blue transition-all duration-300">
              <div>
                <span className="text-[9px] font-body font-semibold text-blue uppercase tracking-wider block mb-1">
                  {feat.subtitle}
                </span>
                <h3 className="font-display text-xl font-extrabold text-ink">
                  {feat.title}
                </h3>
              </div>
              <p className="font-body text-muted text-xs leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
