'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { NewHere } from './new-here';

const headlineWords = ['El', 'encuentro', 'mensual', 'de', 'founders', 'venezolanos.'];

function AnimatedHeadline() {
  const [visible, setVisible] = useState<boolean[]>(Array(headlineWords.length).fill(false));

  useEffect(() => {
    headlineWords.forEach((_, i) => {
      const timer = setTimeout(() => {
        setVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 120);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-ink max-w-4xl leading-[1.08] tracking-tight mb-6 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[10rem]">
      {headlineWords.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-3 transition-all duration-600 ease-out"
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {word === 'founders' ? (
            <span className="text-blue">{word}</span>
          ) : word}
        </span>
      ))}
    </h1>
  );
}

function HeroParallax({ children }: { children: React.ReactNode }) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{ transform: `translateY(${offsetY * 0.15}px)` }}
      className="transition-none will-change-transform w-full overflow-visible"
    >
      {children}
    </div>
  );
}

// Component to auto-play muted video reliably
function AutoVideo({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.play().catch(() => {});
    }
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      className={className}
    />
  );
}

// Gallery items — images NOT repeated from photo-gallery.tsx section below
// photo-gallery uses: IMG_2070, IMG_2018, IMG_2023, IMG_2058, IMG_2059, IMG_2064, IMG_2066, IMG_2067
type GalleryItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  transform: string;
  opacity: string;
};

const galleryItems: GalleryItem[] = [
  {
    type: 'image',
    src: '/IMG_2079.jpg',
    alt: 'Conversaciones entre founders',
    transform: 'rotateY(-22deg) translateY(48px)',
    opacity: 'opacity-85',
  },
  {
    type: 'image',
    src: '/IMG_2023.jpg',
    alt: 'Asistentes en el primer evento',
    transform: 'rotateY(-18deg) translateY(36px)',
    opacity: 'opacity-90',
  },
  {
    type: 'video',
    src: '/IMG_2016.MOV',
    alt: 'Toma del espacio del evento',
    transform: 'rotateY(-12deg) translateY(24px)',
    opacity: 'opacity-95',
  },
  {
    type: 'image',
    src: '/IMG_2072.jpg',
    alt: 'Momento especial del encuentro',
    transform: 'scale(1.05) translateY(0px)',
    opacity: 'opacity-100 ring-2 ring-blue/30 shadow-lg',
  },
  {
    type: 'video',
    src: '/IMG_2003.MOV',
    alt: 'Sesión en vivo del evento',
    transform: 'rotateY(12deg) translateY(24px)',
    opacity: 'opacity-95',
  },
  {
    type: 'image',
    src: '/IMG_2091.jpg',
    alt: 'Founders reunidos en el HUB BDV',
    transform: 'rotateY(18deg) translateY(36px)',
    opacity: 'opacity-90',
  },
  {
    type: 'image',
    src: '/IMG_2093.jpg',
    alt: 'Networking y café en Caracas',
    transform: 'rotateY(22deg) translateY(48px)',
    opacity: 'opacity-85',
  },
];

export default function Hero() {
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
            ☕ 1 evento · +20 founders · Caracas
          </span>
        </div>

        {/* Headline with sequential text reveal */}
        <AnimatedHeadline />

        {/* Subheadline */}
        <p className="font-body text-muted text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8">
          Masterclasses reales, ponentes reales, comunidad real.
          Cada mes en el <span className="text-ink font-semibold">HUB BDV INNOVA</span>, Caracas.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
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

        {/* Soy nuevo aquí guide drawer */}
        <div className="mb-10">
          <NewHere />
        </div>

        {/* Dedicated prominent Venue Partner Block (Free Logo + Box below) */}
        <div className="flex flex-col items-center select-none animate-in fade-in duration-500 mb-20">
          <img
            src="/bdv.png"
            alt="HUB BDV INNOVA Logo"
            className="h-20 w-auto object-contain select-none pointer-events-none filter drop-shadow-sm mb-4 hover:scale-105 transition-all duration-300"
          />
          <div className="bg-bg-subtle border border-border/80 rounded-2xl px-5 py-2.5 shadow-xs text-center">
            <span className="block text-[9px] font-body font-bold text-muted uppercase tracking-widest leading-none mb-1">
              Sede y Aliado Estratégico
            </span>
            <span className="block text-xs font-display font-extrabold uppercase tracking-wider text-ink/80">
              HUB BDV INNOVA
            </span>
            <span className="block text-[9px] font-body text-muted leading-none mt-0.5">
              Caracas, Venezuela
            </span>
          </div>
        </div>

        {/* Fan Gallery — Real event photos & muted autoplaying videos */}
        <div className="w-full overflow-visible py-8">
          <HeroParallax>
            {/* Desktop fan layout */}
            <div
              className="hidden md:flex justify-center items-end overflow-visible gap-3 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-1000"
              style={{ perspective: '1200px' }}
            >
              {galleryItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-36 h-56 rounded-2xl overflow-hidden border border-border shadow-md transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-xl shrink-0 ${item.opacity}`}
                  style={{
                    transform: item.transform,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {item.type === 'video' ? (
                    <AutoVideo
                      src={item.src}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>
              ))}
            </div>
          </HeroParallax>

          {/* Mobile scroll carousel */}
          <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 no-scrollbar">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="w-64 h-80 rounded-2xl overflow-hidden border border-border shadow-md snap-center shrink-0"
              >
                {item.type === 'video' ? (
                  <AutoVideo
                    src={item.src}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
