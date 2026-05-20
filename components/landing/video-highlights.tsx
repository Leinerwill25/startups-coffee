'use client'

import React, { useRef, useState } from 'react'
import { Play, Volume2 } from 'lucide-react'

interface VideoItem {
  src: string
  title: string
}

const VIDEOS: VideoItem[] = [
  { src: '/a.mov', title: 'Comunidad & Networking' },
  { src: '/b.mov', title: 'Masterclasses Reales' },
  { src: '/c.mov', title: 'Espacio HUB BDV INNOVA' },
]

function VideoCard({ video }: { video: VideoItem }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (!ref.current) return
    if (playing) {
      ref.current.pause()
      setPlaying(false)
    } else {
      ref.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="relative aspect-[9/16] rounded-3xl overflow-hidden border border-border shadow-lg bg-ink group select-none">
      <video
        ref={ref}
        src={video.src}
        preload="metadata"
        playsInline
        loop
        onClick={handlePlay}
        className="w-full h-full object-cover cursor-pointer"
        controls={playing}
      />
      
      {!playing && (
        <div
          onClick={handlePlay}
          className="absolute inset-0 bg-ink/40 flex flex-col justify-between p-6 cursor-pointer transition-colors duration-300 group-hover:bg-ink/50"
        >
          <span className="self-start bg-white/20 backdrop-blur-xs text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
            Encuentro 1
          </span>
          
          <div className="flex flex-col items-center gap-3 my-auto">
            <div className="w-14 h-14 rounded-full bg-blue text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Play size={22} className="fill-white translate-x-0.5" />
            </div>
            <span className="text-[10px] text-white/80 font-medium tracking-wide flex items-center gap-1">
              <Volume2 size={12} /> Clic para reproducir
            </span>
          </div>

          <div>
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider leading-tight">
              {video.title}
            </h4>
            <p className="text-[9px] text-white/60 font-body uppercase tracking-widest mt-0.5">
              Startups Coffee Caracas
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function VideoHighlights() {
  return (
    <section className="py-24 bg-white select-none font-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-bold text-blue uppercase tracking-widest leading-none mb-3">
            El Evento en Video
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink uppercase tracking-wide">
            Highlights en <span className="text-blue">Movimiento</span>
          </h2>
          <p className="text-muted text-xs sm:text-sm font-body max-w-lg mt-3">
            Explora las tomas rápidas, testimonios y la energía del primer encuentro de fundadores a través de estos reels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {VIDEOS.map((video, idx) => (
            <VideoCard key={idx} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
