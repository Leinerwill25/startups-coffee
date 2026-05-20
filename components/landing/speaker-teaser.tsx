'use client'

import React from 'react'

const NEXT_SPEAKER = {
  name:    'Carlos Rodríguez',
  startup: 'Rematte',
  role:    'CEO & Co-founder',
  quote:   '"El PMF no se encuentra, se construye. Y hay señales muy claras para saberlo."',
  avatar:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  topic:   'Validación de Idea y PMF',
}

export function SpeakerTeaser() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-surface border border-blue/15 rounded-2xl p-5 mt-6 text-left w-full select-none font-body overflow-hidden">
      <img
        src={NEXT_SPEAKER.avatar}
        alt={NEXT_SPEAKER.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-blue shadow-sm shrink-0"
      />
      {/* min-w-0 is critical — prevents flex child from overflowing its container */}
      <div className="min-w-0 w-full">
        <p className="text-[9px] text-blue font-bold uppercase tracking-widest mb-1">
          Ponente del mes
        </p>
        <p className="font-display font-extrabold text-base text-ink uppercase tracking-wide leading-none">
          {NEXT_SPEAKER.name}
        </p>
        <p className="text-xs text-muted mt-0.5">
          {NEXT_SPEAKER.role} · <strong className="font-semibold text-ink/80">{NEXT_SPEAKER.startup}</strong>
        </p>
        <p className="text-xs text-ink/80 mt-2.5 italic leading-relaxed border-l-2 border-blue/30 pl-2 break-words">
          {NEXT_SPEAKER.quote}
        </p>
      </div>
    </div>
  )
}
