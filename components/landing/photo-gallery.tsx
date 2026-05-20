'use client'

import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const IMAGES = [
  { src: '/IMG_2070.jpg', alt: 'Ambiente del primer encuentro Startups Coffee' },
  { src: '/IMG_2018.jpg', alt: 'Ponente compartiendo su experiencia' },
  { src: '/IMG_2023.jpg', alt: 'Asistentes en las instalaciones del HUB BDV' },
  { src: '/IMG_2058.jpg', alt: 'Sesión interactiva de preguntas' },
  { src: '/IMG_2059.jpg', alt: 'Pitching de startups en vivo' },
  { src: '/IMG_2064.jpg', alt: 'Networking libre del ecosistema' },
  { src: '/IMG_2066.jpg', alt: 'Co-organizadores dialogando con founders' },
  { src: '/IMG_2067.jpg', alt: 'Feedback grupal y mentorías' },
]

export function PhotoGallery() {
  const [index, setIndex] = useState<number | null>(null)

  const open = (i: number) => setIndex(i)
  const close = () => setIndex(null)
  
  const prev = () => {
    if (index === null) return
    setIndex((index - 1 + IMAGES.length) % IMAGES.length)
  }

  const next = () => {
    if (index === null) return
    setIndex((index + 1) % IMAGES.length)
  }

  return (
    <section className="py-24 bg-bg-subtle select-none font-body">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-bold text-blue uppercase tracking-widest leading-none mb-3">
            Galería del Evento
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink uppercase tracking-wide">
            Nuestros <span className="text-blue">Momentos</span>
          </h2>
          <p className="text-muted text-xs sm:text-sm font-body max-w-lg mt-3">
            Echa un vistazo a la energía, el aprendizaje y las conversaciones del último encuentro presencial.
          </p>
        </div>

        {/* Vertical Portrait Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              onClick={() => open(i)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border group cursor-pointer shadow-xs hover:scale-101 hover:shadow-md transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover brightness-[0.72] group-hover:scale-105 group-hover:brightness-75 transition-all duration-500"
              />
              {/* Permanent dark vignette overlay */}
              <div className="absolute inset-0 bg-ink/25 pointer-events-none" />
              {/* Hover zoom icon */}
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <ZoomIn className="text-white" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[200] bg-ink/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar visor"
          >
            <X size={24} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-6 text-white/70 hover:text-white transition-colors p-2 cursor-pointer"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-6 text-white/70 hover:text-white transition-colors p-2 cursor-pointer"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={36} />
          </button>

          {/* Large image */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMAGES[index].src}
              alt={IMAGES[index].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl"
            />
            <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-wide text-center">
              {IMAGES[index].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
