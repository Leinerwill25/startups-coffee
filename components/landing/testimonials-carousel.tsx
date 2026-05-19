'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export default function TestimonialsCarousel() {
  const testimonials: Testimonial[] = [
    {
      text: 'Fue la primera vez que entendí realmente cómo estructurar mi startup desde cero en Caracas. Las masterclasses son sumamente prácticas y no se andan con rodeos.',
      author: 'Juan Pérez',
      role: 'Founder · MiStartup',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    },
    {
      text: 'El nivel del networking en el HUB BDV Innova es absurdo. Conocimos a nuestro actual socio tecnológico tomándonos un café después de la segunda masterclass.',
      author: 'Ana Martínez',
      role: 'Co-founder · PagoFácil',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    },
    {
      text: 'Respirar el ambiente del Hub del Banco de Venezuela y conectar con founders locales te recarga las pilas. Un espacio honesto sobre la realidad de emprender.',
      author: 'Carlos Espinoza',
      role: 'Founder · LogiVe',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    },
    {
      text: 'Sin filtros corporativos ni teorías aburridas. Ponentes contándote cómo resolvieron sus propios cuellos de botella en la operación diaria en Venezuela.',
      author: 'Valentina Gómez',
      role: 'CGO · Mercadito',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  // Auto-slide every 5s unless hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Mobile touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (diff > 50) {
      // Swipe Left -> Next
      handleNext();
    } else if (diff < -50) {
      // Swipe Right -> Prev
      handlePrev();
    }

    touchStartRef.current = null;
  };

  return (
    <section className="py-24 bg-bg-subtle select-none overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
            Testimonios
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
            Lo que dicen <span className="text-blue">nuestros asistentes</span>
          </h2>
        </div>

        {/* Carousel Frame */}
        <div
          className="relative bg-white border border-border rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Quote Icon Background Decorator */}
          <Quote className="absolute top-8 right-8 text-surface h-16 w-16 -rotate-12 pointer-events-none" />

          {/* Testimonial Active Slide */}
          <div className="min-h-[10rem] flex flex-col justify-between">
            <div>
              <p className="font-body text-ink text-sm sm:text-base md:text-lg italic leading-relaxed mb-8">
                "{testimonials[activeIndex].text}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-4">
              <img
                src={testimonials[activeIndex].avatar}
                alt={testimonials[activeIndex].author}
                className="h-11 w-11 rounded-full object-cover border-2 border-surface shrink-0"
              />
              <div>
                <h4 className="font-body font-bold text-ink text-xs sm:text-sm leading-none block mb-1">
                  {testimonials[activeIndex].author}
                </h4>
                <span className="font-body text-[10px] sm:text-xs text-muted leading-none block">
                  {testimonials[activeIndex].role}
                </span>
              </div>
            </div>
          </div>

          {/* Controls (Arrows & Dots inline bottom) */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8 pt-8 border-t border-border">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-6 bg-blue' : 'w-2 bg-border hover:bg-muted'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="h-9 w-9 rounded-xl border border-border hover:border-blue flex items-center justify-center text-muted hover:text-blue transition-all cursor-pointer bg-white"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={handleNext}
                className="h-9 w-9 rounded-xl border border-border hover:border-blue flex items-center justify-center text-muted hover:text-blue transition-all cursor-pointer bg-white"
                aria-label="Next slide"
              >
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
