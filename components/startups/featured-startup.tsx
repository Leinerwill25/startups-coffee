'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Startup } from '@/lib/supabase/types'
import { Award, Globe, ArrowUpRight } from 'lucide-react'

const FALLBACK_FEATURED: Startup = {
  id: 'feat1',
  name: 'Rematte',
  founders: 'Carlos Rodríguez & Equipo',
  industry: 'Reciclaje Tecnológico',
  stage: 'mvp',
  city: 'Caracas',
  website_or_ig: 'https://rematte.co',
  description: 'Rematte transforma desechos electrónicos en materia prima valiosa mediante procesos eco-amigables y software de trazabilidad para empresas.',
  status: 'approved',
  attended_event: true,
  featured: true,
  created_at: '',
  updated_at: '',
}

export function FeaturedStartup() {
  const [featured, setFeatured] = useState<Startup>(FALLBACK_FEATURED)

  useEffect(() => {
    async function loadFeatured() {
      try {
        const supabase = createClient()
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return

        const { data, error } = await supabase
          .from('startups')
          .select('*')
          .eq('status', 'approved')
          .eq('featured', true)
          .limit(1)
          .maybeSingle()

        if (!error && data) {
          setFeatured(data as Startup)
        }
      } catch (err) {
        console.warn("Could not load featured startup from database. Using fallback.")
      }
    }
    loadFeatured()
  }, [])

  return (
    <div className="relative border-2 border-blue bg-white rounded-3xl p-6 sm:p-8 overflow-hidden select-none font-body shadow-md">
      {/* Background Accent */}
      <div className="absolute top-[-10%] right-[-10%] w-[12rem] h-[12rem] rounded-full bg-blue/5 blur-xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[9px] font-body font-bold text-blue uppercase tracking-wider mb-4">
            <Award className="h-3.5 w-3.5 shrink-0" />
            Startup Destacada del Mes
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink uppercase tracking-wide leading-none mb-2">
            {featured.name}
          </h3>
          <p className="text-[10px] text-muted font-body mb-4">
            Fundada por <span className="font-semibold text-ink/80">{featured.founders}</span> · Sede: {featured.city}
          </p>
          <p className="text-xs text-muted leading-relaxed font-body max-w-2xl mb-5">
            {featured.description}
          </p>

          <div className="flex flex-wrap gap-2.5">
            <span className="text-[9px] font-bold uppercase tracking-wider bg-bg-subtle text-muted border border-border px-3 py-1 rounded-full">
              {featured.industry}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-blue/10 text-blue border border-blue/10 px-3 py-1 rounded-full">
              Etapa: {featured.stage.toUpperCase()}
            </span>
          </div>
        </div>

        {featured.website_or_ig && (
          <a
            href={featured.website_or_ig}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue hover:bg-blue-dark text-white font-body font-semibold text-xs px-5 py-3 rounded-2xl transition-all duration-200 shrink-0 shadow-xs hover:scale-102 cursor-pointer self-start md:self-center"
          >
            <Globe size={14} /> Visitar sitio
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  )
}
