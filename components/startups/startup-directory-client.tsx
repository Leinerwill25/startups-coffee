'use client';

import React, { useState, useMemo } from 'react';
import { Startup } from '@/lib/supabase/types';
import StartupFilters from './startup-filters';
import StartupCard from './startup-card';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle, UserPlus, Grid } from 'lucide-react';

interface StartupDirectoryClientProps {
  initialStartups: Startup[];
}

export default function StartupDirectoryClient({
  initialStartups,
}: StartupDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Extract unique industries & cities for dropdown filters
  const industries = useMemo(() => {
    const list = initialStartups.map((s) => s.industry);
    return Array.from(new Set(list)).sort();
  }, [initialStartups]);

  const cities = useMemo(() => {
    const list = initialStartups.map((s) => s.city);
    return Array.from(new Set(list)).sort();
  }, [initialStartups]);

  // Client side filtering logic
  const filteredStartups = useMemo(() => {
    return initialStartups.filter((startup) => {
      const matchesSearch =
        searchQuery === '' ||
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.founders.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesIndustry =
        selectedIndustry === '' || startup.industry === selectedIndustry;

      const matchesStage = selectedStage === '' || startup.stage === selectedStage;

      const matchesCity = selectedCity === '' || startup.city === selectedCity;

      return matchesSearch && matchesIndustry && matchesStage && matchesCity;
    });
  }, [initialStartups, searchQuery, selectedIndustry, selectedStage, selectedCity]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedIndustry('');
    setSelectedStage('');
    setSelectedCity('');
  };

  return (
    <div className="space-y-8 select-none">
      {/* Stats Counter Row */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-surface/50 border border-blue/10 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue/15 flex items-center justify-center text-blue shrink-0">
            <Grid className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-muted font-body font-semibold uppercase tracking-wider block">
              Comunidad Activa
            </span>
            <div className="flex items-center gap-1.5 text-xs font-body font-semibold text-ink">
              <span>{initialStartups.length} startups</span>
              <span className="text-muted/50">•</span>
              <span>{cities.length} ciudades</span>
              <span className="text-muted/50">•</span>
              <span>{industries.length} industrias</span>
            </div>
          </div>
        </div>

        <Link href="/register">
          <Button size="sm" pill className="gap-1 text-xs">
            <UserPlus className="h-3.5 w-3.5" />
            Registrar mi Startup
          </Button>
        </Link>
      </div>

      {/* Filters Module */}
      <StartupFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        industries={industries}
        cities={cities}
        onReset={handleReset}
      />

      {/* Startups Grid */}
      {filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      ) : (
        /* Dynamic Empty Placeholders */
        <div className="bg-bg-subtle border border-border rounded-2xl p-12 text-center flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-white border border-border flex items-center justify-center text-muted mb-4 shadow-2xs">
            <AlertCircle className="h-6 w-6 text-blue" />
          </div>
          <h3 className="font-display text-xl font-extrabold text-ink mb-1.5">
            No se encontraron startups
          </h3>
          <p className="font-body text-muted text-xs max-w-sm mb-6 leading-relaxed">
            Prueba ajustando tus parámetros de búsqueda o limpiando los filtros activos para explorar otras opciones.
          </p>
          <Button variant="secondary" pill size="sm" onClick={handleReset}>
            Ver todas las startups
          </Button>
        </div>
      )}
    </div>
  );
}
