'use client'
import { useState } from 'react'
import { X, Calendar, BookOpen, Users, Compass } from 'lucide-react'

const STEPS = [
  { icon: <Calendar className="h-6 w-6 text-blue" />, title: 'Asiste al evento', desc: 'Cada mes en el HUB BDV INNOVA. Totalmente gratuito.' },
  { icon: <BookOpen className="h-6 w-6 text-blue" />, title: 'Aprende de founders reales', desc: 'Dos masterclasses de emprendedores que ya escalaron en la región.' },
  { icon: <Users className="h-6 w-6 text-blue" />, title: 'Haz networking de valor', desc: 'Conecta con founders, inversionistas y talento tecnológico local.' },
  { icon: <Compass className="h-6 w-6 text-blue" />, title: 'Registra tu startup', desc: 'Aparece en el directorio público y date a conocer en el ecosistema.' },
]

export function NewHere() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-body font-bold text-muted hover:text-blue border border-border hover:border-blue/30 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer select-none"
      >
        ¿Primera vez aquí? →
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] bg-ink/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative border border-border animate-in zoom-in-95 slide-in-from-bottom-8 duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-extrabold text-2xl text-ink uppercase tracking-wide">
                Startups Coffee
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-ink transition-colors cursor-pointer"
                aria-label="Cerrar guía"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-5">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2 bg-surface rounded-xl shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-body font-bold text-ink text-sm leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs font-body text-muted mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/register"
              onClick={() => setOpen(false)}
              className="block w-full text-center mt-8 bg-blue hover:bg-blue-dark text-white py-3 rounded-xl font-body font-semibold text-sm transition-colors cursor-pointer"
            >
              Registra tu startup →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
