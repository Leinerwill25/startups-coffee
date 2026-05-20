'use client'

import React from 'react'
import { Instagram, Play, ArrowUpRight } from 'lucide-react'

const REELS = [
  {
    type: 'reel' as const,
    url: 'https://www.instagram.com/reel/DXcxxF5kRIX/',
    thumbnail: '/IMG_2058.jpg',
    caption: 'El ambiente del primer Startups Coffee',
    tag: 'Encuentro #1',
  },
  {
    type: 'reel' as const,
    url: 'https://www.instagram.com/reel/DXUUfMbpDQx/',
    thumbnail: '/IMG_2067.jpg',
    caption: 'Founders conectando y construyendo comunidad',
    tag: 'Encuentro #1',
  },
  { type: 'soon' as const, url: '', thumbnail: '', caption: '', tag: '' },
  { type: 'soon' as const, url: '', thumbnail: '', caption: '', tag: '' },
]

export function InstagramFeed() {
  return (
    <section className="py-24 bg-ink select-none font-body">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none block mb-3">
              Síguenos en Redes
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-wide flex items-center gap-2.5">
              <Instagram size={28} className="text-white/60" />
              Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/startupcoffeeve"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer self-start sm:self-auto"
          >
            Ver perfil completo
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {REELS.map((reel, i) =>
            reel.type === 'reel' ? (
              <a
                key={i}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] shadow-md"
              >
                {/* Background thumbnail */}
                <img
                  src={reel.thumbnail}
                  alt={reel.caption}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.5] group-hover:scale-105 transition-all duration-500"
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <Play size={22} className="text-white fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="block text-[8px] font-bold text-white/60 uppercase tracking-widest mb-1">
                    {reel.tag}
                  </span>
                  <p className="text-[11px] font-semibold text-white leading-snug line-clamp-2">
                    {reel.caption}
                  </p>
                </div>

                {/* Instagram badge top-right */}
                <div className="absolute top-3 right-3">
                  <Instagram size={16} className="text-white/70" />
                </div>
              </a>
            ) : (
              <div
                key={i}
                className="relative aspect-[9/16] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3"
              >
                <Instagram size={24} className="text-white/20" />
                <div className="text-center px-4">
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-none">
                    Próximamente
                  </p>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </section>
  )
}
