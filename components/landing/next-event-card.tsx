'use client'

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { EventCountdown } from './event-countdown';
import { SpeakerTeaser } from './speaker-teaser';
import { AttendanceForm } from './attendance-form';
import { ShareEvent } from './share-event';
import { generateGoogleCalendarLink } from '@/lib/calendar';

export default function NextEventCard() {
  const calLink = generateGoogleCalendarLink({
    title: 'Startups Coffee — Validación de Idea y PMF',
    description: 'Evento mensual para founders venezolanos. Masterclasses y networking en el HUB BDV INNOVA del Banco de Venezuela, Caracas.',
    location: 'HUB BDV INNOVA, Caracas, Venezuela',
    startDate: new Date('2026-06-15T18:00:00-04:00'),
    endDate:   new Date('2026-06-15T21:00:00-04:00'),
  });

  return (
    <section id="proximo-evento" className="py-24 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Card Wrapper without arbitrary yellow corner dots */}
        <div className="relative border border-border bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-blue/5 overflow-hidden group">
          {/* Decorative Corner Blue Shimmer */}
          <div className="absolute top-[-10%] right-[-10%] w-[20rem] h-[20rem] rounded-full bg-blue/5 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <div className="flex flex-col items-start text-left">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[10px] font-body font-semibold text-blue uppercase tracking-wider mb-6">
              <Calendar className="h-3 w-3 shrink-0" />
              Próximo Evento
            </div>

            {/* Title & Subheadline */}
            <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-ink mb-4 leading-tight max-w-3xl">
              Tema del mes: <span className="text-blue">Validación de Idea y PMF</span>
            </h3>
            
            <p className="font-body text-muted text-xs sm:text-sm max-w-3xl mb-8 sm:mb-12 leading-relaxed">
              Descubre cómo estructurar tu deck, validar hipótesis rápidas y levantar capital en etapas tempranas junto a dos founders que ya escalaron en el mercado regional.
            </p>

            {/* Split Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start">
              {/* Left Column: Transactional details & registration */}
              <div className="col-span-12 lg:col-span-7 space-y-8">
                {/* Countdown Timer */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-body font-bold text-muted uppercase tracking-widest leading-none">
                    Tiempo restante para el encuentro
                  </span>
                  <div className="w-full">
                    <EventCountdown />
                  </div>
                </div>

                {/* Location & Date Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-t border-b border-border">
                  <div className="flex items-center gap-3 text-ink">
                    <div className="p-2.5 bg-surface rounded-xl text-blue shrink-0">
                      <MapPin className="h-5 w-5 animate-bounce" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-body font-bold uppercase tracking-wider text-muted leading-none mb-1">
                        Ubicación
                      </span>
                      <span className="text-xs font-body font-semibold text-ink/80">
                        HUB BDV INNOVA, Las Mercedes, Caracas
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-ink">
                    <div className="p-2.5 bg-surface rounded-xl text-blue shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-body font-bold uppercase tracking-wider text-muted leading-none mb-1">
                        Fecha y Hora
                      </span>
                      <span className="text-xs font-body font-semibold text-ink/80">
                        15 de Junio, 2026 (18:00 hrs)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Google Calendar Link Action */}
                <div>
                  <a
                    href={calLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-body font-bold text-blue hover:text-blue-dark transition-all bg-surface/50 border border-blue/15 px-4 py-2.5 rounded-xl hover:scale-102 duration-200 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    Añadir a Google Calendar
                  </a>
                </div>

                {/* Attendance Reservation Form */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-display font-extrabold text-sm text-ink uppercase tracking-wide">
                    Reserva tu cupo gratuito
                  </h4>
                  <AttendanceForm />
                </div>

                {/* Share Options Row */}
                <div className="pt-6 border-t border-border/60">
                  <ShareEvent />
                </div>
              </div>

              {/* Right Column: Prominent Venue Partner and Speaker details */}
              <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-stretch space-y-8">
                {/* Venue Partner Branding Showcase */}
                <div className="flex flex-col items-center select-none text-center w-full">
                  <img
                    src="/bdv.png"
                    alt="HUB BDV INNOVA Logo"
                    className="h-28 sm:h-32 w-auto object-contain select-none pointer-events-none filter drop-shadow-sm mb-6 hover:scale-105 transition-all duration-300"
                  />
                  <div className="bg-bg-subtle border border-border/80 rounded-3xl p-6 shadow-xs text-center w-full max-w-md">
                    <span className="block text-[10px] font-body font-bold uppercase tracking-widest text-muted leading-none mb-1.5">
                      Sede Oficial y Patrocinador de Espacio
                    </span>
                    <span className="block text-base font-display font-extrabold uppercase tracking-wider text-ink/80">
                      HUB BDV INNOVA
                    </span>
                    <span className="block text-[10px] font-body text-muted mt-1 leading-none">
                      Banco de Venezuela · Caracas, Venezuela
                    </span>
                  </div>
                </div>

                {/* Upcoming Speaker Teaser */}
                <div className="w-full flex justify-center">
                  <SpeakerTeaser />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
