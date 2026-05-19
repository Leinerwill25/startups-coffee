'use client';

import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface StartupFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  industries: string[];
  cities: string[];
  onReset: () => void;
}

export default function StartupFilters({
  searchQuery,
  setSearchQuery,
  selectedIndustry,
  setSelectedIndustry,
  selectedStage,
  setSelectedStage,
  selectedCity,
  setSelectedCity,
  industries,
  cities,
  onReset,
}: StartupFiltersProps) {
  const stages = [
    { label: 'Todos', value: '' },
    { label: 'Idea', value: 'idea' },
    { label: 'MVP', value: 'mvp' },
    { label: 'Tracción', value: 'traccion' },
    { label: 'Escala', value: 'escala' },
  ];

  return (
    <div className="w-full bg-white border border-border rounded-2xl p-6 shadow-xs select-none font-body">
      <div className="flex flex-col gap-6">
        {/* Row 1: Search & Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por startup, founder, palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-bg-subtle/50 border border-border rounded-xl text-xs placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all font-semibold"
            />
          </div>

          {/* Industry Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg-subtle/50 border border-border rounded-xl text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">Todas las industrias</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg-subtle/50 border border-border rounded-xl text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all cursor-pointer"
            >
              <option value="">Todas las ciudades</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Stages Chips & Reset */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold text-ink uppercase tracking-wider mr-2">
              Filtrar por Etapa:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stages.map((stg) => {
                const isActive = selectedStage === stg.value;
                return (
                  <button
                    key={stg.label}
                    onClick={() => setSelectedStage(stg.value)}
                    className={`px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue border-blue text-white shadow-sm shadow-blue/15'
                        : 'bg-white border-border text-muted hover:border-blue hover:text-blue'
                    }`}
                  >
                    {stg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Action */}
          {(searchQuery || selectedIndustry || selectedStage || selectedCity) && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
