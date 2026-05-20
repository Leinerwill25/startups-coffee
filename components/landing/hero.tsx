'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400',
      alt: 'Founders en el HUB BDV',
      transform: 'rotateY(-22deg) translateY(48px)',
      opacity: 'opacity-85',
    },
    {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
      alt: 'Ponencia de startups venezolanas',
      transform: 'rotateY(-18deg) translateY(36px)',
      opacity: 'opacity-90',
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=400',
      alt: 'Masterclass en el Hub BDV Innova',
      transform: 'rotateY(-12deg) translateY(24px)',
      opacity: 'opacity-95',
    },
    {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      alt: 'Founder venezolana exponiendo',
      transform: 'scale(1.05) translateY(0px)',
      opacity: 'opacity-100 ring-2 ring-blue/30 shadow-lg',
    },
    {
      src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400',
      alt: 'Asistentes en el encuentro de Caracas',
      transform: 'rotateY(12deg) translateY(24px)',
      opacity: 'opacity-95',
    },
    {
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
      alt: 'Networking en Caracas',
      transform: 'rotateY(18deg) translateY(36px)',
      opacity: 'opacity-90',
    },
    {
      src: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=400',
      alt: 'Grupo de founders compartiendo café',
      transform: 'rotateY(22deg) translateY(48px)',
      opacity: 'opacity-85',
    },
  ];

  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-white select-none">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-surface/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-surface/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Social Proof Badge */}
        <div className="inline-flex items-center gap-3 bg-surface px-4 py-2 rounded-full border border-blue/10 mb-8 animate-in fade-in duration-300">
          {/* Avatar stack */}
          <div className="flex -space-x-2.5">
            {[
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
            ].map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt="Founder avatar"
                className="w-6 h-6 rounded-full border-2 border-white object-cover object-center shrink-0"
              />
            ))}
          </div>
          <span className="text-[11px] font-body font-semibold text-ink uppercase tracking-wider">
            ☕ 1 evento · +20 founders
          </span>
          <div className="w-px h-3.5 bg-blue/20" />
          <span className="text-[11px] font-body font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
            Sede:
            <img
              src="/bdv.png"
              alt="HUB BDV INNOVA"
              className="h-4.5 w-auto object-contain select-none pointer-events-none"
            />
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-ink max-w-4xl leading-[1.08] tracking-tight mb-6">
          El encuentro mensual de <span className="text-blue">founders venezolanos.</span>
        </h1>

        {/* Subheadline */}
        <p className="font-body text-muted text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10">
          Masterclasses reales, ponentes reales, comunidad real.
          Cada mes en el <span className="text-ink font-semibold">HUB BDV INNOVA</span>, Caracas.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="#proximo-evento">
            <Button pill size="lg" className="w-full sm:w-auto gap-2">
              Ver próximo evento
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button pill variant="secondary" size="lg" className="w-full sm:w-auto">
              Registra tu startup ↗
            </Button>
          </Link>
        </div>

        {/* Fan Gallery (3D Perspective Abanico on Desktop) */}
        <div className="w-full overflow-visible py-8">
          {/* Desktop view (fan layout) */}
          <div
            className="hidden md:flex justify-center items-end overflow-visible gap-3 max-w-6xl mx-auto"
            style={{ perspective: '1200px' }}
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`w-36 h-56 rounded-2xl overflow-hidden border border-border shadow-md transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-xl ${img.opacity}`}
                style={{
                  transform: img.transform,
                  transformStyle: 'preserve-3d',
                  flexShrink: 0,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Mobile view (touch swipeable snap carousel) */}
          <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 no-scrollbar">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="w-64 h-80 rounded-2xl overflow-hidden border border-border shadow-md snap-center shrink-0"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
