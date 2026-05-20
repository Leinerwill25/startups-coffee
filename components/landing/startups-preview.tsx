import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import StartupCard from '@/components/startups/startup-card';
import { Startup } from '@/lib/supabase/types';
import { ArrowRight } from 'lucide-react';

interface StartupsPreviewProps {
  startups: Startup[];
}

export default function StartupsPreview({ startups }: StartupsPreviewProps) {
  // If the DB is empty, use three high-quality Venezuelan mock startups to wow the user.
  const fallbackStartups: Startup[] = [
    {
      id: 'mock-1',
      name: 'Ridery',
      founders: 'Chichí Páez, Ramón Rodríguez',
      industry: 'SaaS',
      stage: 'escala',
      city: 'Caracas',
      website_or_ig: 'https://ridery.app',
      description: 'La plataforma líder de movilidad y traslados en Venezuela, conectando miles de conductores con usuarios en tiempo real.',
      attended_event: true,
      status: 'approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'mock-2',
      name: 'Yummy',
      founders: 'Vicente Zavarce',
      industry: 'E-commerce',
      stage: 'escala',
      city: 'Caracas',
      website_or_ig: 'https://yummy.la',
      description: 'Super-app venezolana de delivery, transporte y pasarelas de pago, expandiendo la logística local en múltiples ciudades.',
      attended_event: true,
      status: 'approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'mock-3',
      name: 'Smartgib',
      founders: 'Derek Gómez, Daniel Pérez',
      industry: 'Fintech',
      stage: 'traccion',
      city: 'Caracas',
      website_or_ig: '@smartgib_ve',
      description: 'Solución descentralizada para financiamiento temprano de inventarios y cobros transfronterizos para comercios en Venezuela.',
      attended_event: true,
      status: 'approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const displayedStartups = startups && startups.length > 0 ? startups.slice(0, 3) : fallbackStartups;

  return (
    <section className="py-24 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-[10px] font-body font-semibold text-blue uppercase tracking-widest block mb-3">
              Directorio Comunitario
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink leading-none">
              Startups de <span className="text-blue block sm:inline">nuestra Comunidad</span>
            </h2>
          </div>
          
          <Link href="/startups" className="shrink-0">
            <Button variant="secondary" pill className="gap-2">
              Ver todas las startups
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {displayedStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>

        {/* Bottom Centered CTA */}
        <div className="flex justify-center">
          <Link href="/register">
            <Button size="lg" pill className="gap-2">
              → Registra tu Startup
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
