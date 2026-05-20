'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    question: '¿Tiene algún costo asistir al evento?',
    answer: 'No, Startups Coffee es 100% gratuito. Nuestro objetivo es apoyar al ecosistema emprendedor venezolano. Gracias al HUB BDV INNOVA del Banco de Venezuela que nos facilita los espacios y al patrocinio de las marcas organizadoras.',
  },
  {
    question: '¿Dónde se realiza exactamente?',
    answer: 'Se lleva a cabo en la Av. Principal de Las Mercedes, Caracas, en las instalaciones del HUB BDV INNOVA del Banco de Venezuela. Es un espacio moderno diseñado para fomentar el ecosistema tecnológico.',
  },
  {
    question: '¿Mi startup debe estar constituida o facturando para estar en el directorio?',
    answer: 'Para nada. Aceptamos startups en etapas tempranas, desde fase de idea y MVP hasta tracción y escala. Lo importante es que sea un modelo de negocio escalable con base tecnológica o de innovación.',
  },
  {
    question: '¿Cómo puedo postularme como ponente?',
    answer: 'Cada mes traemos a founders venezolanos exitosos. Si has fundado una startup de tecnología, levantado capital o escalado operaciones y quieres aportar valor de forma voluntaria, puedes contactarnos por nuestras redes sociales.',
  },
  {
    question: '¿Puedo asistir si solo tengo una idea o soy estudiante?',
    answer: '¡Por supuesto! El evento está abierto a founders, estudiantes, desarrolladores y cualquier entusiasta del ecosistema de innovación que desee aprender y conectar.',
  },
]

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="py-24 bg-white select-none font-body">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] font-bold text-blue uppercase tracking-widest leading-none mb-3">
            Soporte y Preguntas
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink uppercase tracking-wide">
            Preguntas <span className="text-blue">Frecuentes</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                className="border border-border bg-bg-subtle/30 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-body font-bold text-sm text-ink cursor-pointer hover:bg-bg-subtle/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="text-blue shrink-0 ml-4">
                    {isOpen ? (
                      <Minus size={16} className="transition-transform rotate-180 duration-300" />
                    ) : (
                      <Plus size={16} className="transition-transform rotate-0 duration-300" />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 border-t border-border' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-xs text-muted leading-relaxed font-body bg-white">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
