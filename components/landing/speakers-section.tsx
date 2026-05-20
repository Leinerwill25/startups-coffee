'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Speaker } from '@/lib/supabase/types'
import { Linkedin, Award } from 'lucide-react'

const FALLBACK_SPEAKERS: Speaker[] = [
  {
    id: 's1',
    name: 'Carlos Rodríguez',
    role: 'CEO & Co-founder',
    startup: 'Rematte',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    quote: 'El PMF no se encuentra, se construye paso a paso.',
    month_num: 1,
    topic: 'Validación de Idea y PMF',
    linkedin: 'https://linkedin.com',
    created_at: '',
  },
  {
    id: 's2',
    name: 'Irene Villa',
    role: 'CEO & Co-founder',
    startup: 'Syncwave',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    quote: 'La clave en B2B es entender el dolor profundo del cliente.',
    month_num: 2,
    topic: 'Estrategia Go-To-Market B2B',
    linkedin: 'https://linkedin.com',
    created_at: '',
  },
  {
    id: 's3',
    name: 'Luis Gómez',
    role: 'CTO & Co-founder',
    startup: 'Smartgib',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    quote: 'Escala tu software solo cuando la demanda te obligue a hacerlo.',
    month_num: 3,
    topic: 'Arquitectura de Software Lean',
    linkedin: 'https://linkedin.com',
    created_at: '',
  },
  {
    id: 's4',
    name: 'María Rondón',
    role: 'Founder',
    startup: 'Ashira',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    quote: 'La IA no es una feature, es el núcleo de las nuevas soluciones.',
    month_num: 4,
    topic: 'IA Aplicada a Negocios',
    linkedin: 'https://linkedin.com',
    created_at: '',
  },
]

export function SpeakersSection() {
  const [speakers, setSpeakers] = useState<Speaker[]>(FALLBACK_SPEAKERS)

  useEffect(() => {
    async function loadSpeakers() {
      try {
        const supabase = createClient()
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return

        const { data, error } = await supabase
          .from('speakers')
          .select('*')
          .order('month_num', { ascending: true })

        if (!error && data && data.length > 0) {
          setSpeakers(data as Speaker[])
        }
      } catch (err) {
        console.warn("Failed to load speakers from database. Using fallbacks.")
      }
    }
    loadSpeakers()
  }, [])

  return (
    <section className="py-24 bg-white select-none font-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-bold text-blue uppercase tracking-widest leading-none mb-3">
            Nuestros Expertos
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink uppercase tracking-wide">
            Ponentes <span className="text-blue">Invitados</span>
          </h2>
          <p className="text-muted text-xs sm:text-sm font-body max-w-lg mt-3">
            Conoce a los fundadores y directores de tecnología que comparten su conocimiento real en cada sesión.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((s) => (
            <div
              key={s.id}
              className="bg-bg-subtle/30 border border-border/80 rounded-3xl p-6 flex flex-col items-center text-center group hover:border-blue/20 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="relative mb-5">
                <img
                  src={s.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'}
                  alt={s.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-border group-hover:border-blue transition-colors duration-300"
                />
                <span className="absolute bottom-0 right-0 bg-blue text-white p-1.5 rounded-full border-2 border-white shadow-xs">
                  <Award size={12} />
                </span>
              </div>

              <h4 className="font-display font-extrabold text-base text-ink uppercase tracking-wide leading-none mb-1">
                {s.name}
              </h4>
              <p className="text-[10px] text-muted font-body mb-3">
                {s.role} · <strong className="font-semibold text-ink/80">{s.startup}</strong>
              </p>
              
              <div className="bg-white border border-border/60 rounded-2xl p-4 flex-1 flex flex-col justify-between mb-4">
                <p className="text-[10px] text-blue font-bold uppercase tracking-widest mb-1 font-body">
                  Tema: {s.topic}
                </p>
                <p className="text-[11px] text-muted italic leading-relaxed">
                  {s.quote || `"${s.topic}"`}
                </p>
              </div>

              {s.linkedin && (
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-[#0077B5] transition-colors"
                  aria-label={`LinkedIn de ${s.name}`}
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
