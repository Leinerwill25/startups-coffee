'use client'

import React from 'react'

const organizers = [
  { name: 'Smartgib', detail: 'Founder Team' },
  { name: 'Rematte', detail: 'Reciclaje Tech' },
  { name: 'Ashira', detail: 'Web3 & AI' },
  { name: 'Syncwave', detail: 'Telecomunicaciones' },
]

export function Organizers() {
  return (
    <div className="w-full bg-white py-10 border-t border-border select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-5">
        <p className="text-[10px] font-body font-bold text-muted uppercase tracking-widest leading-none">
          Co-organizado por
        </p>
        <div className="flex items-center gap-x-12 gap-y-6 flex-wrap justify-center max-w-4xl">
          {organizers.map((org) => (
            <div
              key={org.name}
              className="flex flex-col items-center opacity-65 hover:opacity-100 hover:scale-105 transition-all duration-300 group"
            >
              <span className="font-display font-black text-lg tracking-wider text-ink/80 group-hover:text-blue transition-colors">
                {org.name.toUpperCase()}
              </span>
              <span className="text-[8px] font-body text-muted uppercase tracking-widest mt-0.5 font-semibold">
                {org.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
