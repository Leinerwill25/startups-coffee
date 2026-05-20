'use client'

import React, { useState } from 'react'
import { CheckCircle2, ChevronRight } from 'lucide-react'

const ROADMAP = [
  {
    num: 1,
    topic: 'Legal y Finanzas',
    done: true,
    speaker: 'Abogado corporativo + CFO experto en estructuración offshore.',
    description: 'Cómo constituir tu empresa correctamente desde el principio, elegir la estructura legal adecuada, proteger tu propiedad intelectual y entender los aspectos fiscales que todo founder debe conocer antes de levantar capital.',
  },
  {
    num: 2,
    topic: 'Marketing y Go-to-Market',
    done: false,
    speaker: 'Especialista en marketing de crecimiento y estrategia de lanzamiento para startups latinoamericanas.',
    description: 'Aprende a construir tu estrategia de salida al mercado, definir canales de adquisición, posicionar tu marca, crear mensajes que conectan con tu cliente ideal y ejecutar campañas publicitarias con presupuesto limitado pero alto impacto.',
  },
  {
    num: 3,
    topic: 'Validación y PMF',
    done: false,
    speaker: 'Founder venezolano ex-Y Combinator con tracción regional.',
    description: 'Técnicas probadas para validar hipótesis de negocio rápido y sin gastar de más. Aprenderás a identificar el Product-Market Fit, hablar con tus primeros clientes, iterar y saber cuándo ya encontraste el encaje perfecto.',
  },
  {
    num: 4,
    topic: 'Construcción de MVP',
    done: false,
    speaker: 'CTO de escala regional especialista en arquitecturas lean.',
    description: 'Cómo construir la primera versión de tu producto con el mínimo esfuerzo posible, priorizando las funcionalidades que generan valor real. Desde la elección del stack tecnológico hasta el deployment, sin sobreingeniería.',
  },
  {
    num: 5,
    topic: 'Ventas B2B',
    done: false,
    speaker: 'SVP de Ventas Corporativas con +$10M en facturación B2B.',
    description: 'Estrategias de ventas consultivas para cerrar contratos con empresas. Aprenderás a construir un pipeline, manejar objeciones, estructurar propuestas y negociar con tomadores de decisión en organizaciones grandes.',
  },
  {
    num: 6,
    topic: 'Growth Hacking',
    done: false,
    speaker: 'Growth Lead experto en adquisición de usuarios orgánicos.',
    description: 'Metodologías para crecer de manera acelerada y sostenible sin depender de publicidad pagada. Incluye SEO, viralidad, referidos, email marketing y experimentos de crecimiento que cualquier startup puede aplicar.',
  },
  {
    num: 7,
    topic: 'Levantamiento de Capital',
    done: false,
    speaker: 'Venture Capital Partner enfocado en etapas pre-seed.',
    description: 'Todo lo que necesitas saber para levantar tu primera ronda de financiamiento: cómo construir tu deck, qué buscan los inversores, cómo valorar tu empresa en etapas tempranas y dónde encontrar el capital adecuado para tu startup.',
  },
  {
    num: 8,
    topic: 'Operaciones y Finanzas',
    done: false,
    speaker: 'COO experto en logística y operaciones transfronterizas.',
    description: 'Cómo construir procesos internos que escalen, gestionar el flujo de caja, crear dashboards financieros básicos y tomar decisiones operativas basadas en datos reales sin necesitar un equipo de finanzas grande.',
  },
  {
    num: 9,
    topic: 'Talento y Cultura Tech',
    done: false,
    speaker: 'Head of People de una de las startups más grandes de Venezuela.',
    description: 'Cómo atraer, retener y motivar talento en startups con recursos limitados. Aprenderás a construir cultura organizacional desde cero, diseñar estructuras de compensación creativas y liderar equipos remotos de alto desempeño.',
  },
  {
    num: 10,
    topic: 'Expansión Internacional',
    done: false,
    speaker: 'Founder venezolano que internacionalizó su software a 5 países.',
    description: 'Los pasos concretos para llevar tu startup al mercado internacional: desde la adaptación de producto hasta el compliance legal en otros países, estrategias de localización y cómo encontrar tus primeros clientes fuera de Venezuela.',
  },
  {
    num: 11,
    topic: 'Product Management',
    done: false,
    speaker: 'Product Manager principal de Fintech en Silicon Valley.',
    description: 'Metodologías modernas de gestión de producto: cómo priorizar features, trabajar con equipos de ingeniería, medir el éxito de cada lanzamiento y construir roadmaps que alineen al equipo completo con la visión del negocio.',
  },
  {
    num: 12,
    topic: 'Inteligencia Artificial',
    done: false,
    speaker: 'Investigador de IA y Founder de automatización empresarial.',
    description: 'Cómo integrar herramientas y modelos de IA en tu startup para automatizar procesos, mejorar la experiencia del cliente, construir productos más inteligentes y competir en mercados donde la IA ya es una ventaja competitiva real.',
  },
]

const DONE_COUNT = ROADMAP.filter(m => m.done).length
const PROGRESS = Math.round((DONE_COUNT / ROADMAP.length) * 100)

export function RoadmapTimeline() {
  const [active, setActive] = useState<number>(2)

  const selected = ROADMAP.find(m => m.num === active)!

  return (
    <section className="py-24 bg-ink select-none font-body overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-3">
              Programa Anual 2026
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white uppercase tracking-tight leading-none">
              Un año de<br />
              <span className="text-blue">conocimiento</span>
            </h2>
            <p className="text-white/50 text-xs sm:text-sm font-body max-w-sm mt-4 leading-relaxed">
              12 meses · 12 temáticas · Founders venezolanos de clase mundial como ponentes.
            </p>
          </div>

          {/* SVG Progress ring */}
          <div className="flex items-center gap-5 shrink-0 self-start lg:self-auto">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="rotate-[-90deg] w-full h-full">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - PROGRESS / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-display font-black text-sm leading-none">{PROGRESS}%</span>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-xs uppercase tracking-wider leading-none mb-1">
                Progreso del año
              </p>
              <p className="text-white/40 text-[10px]">
                {DONE_COUNT} de {ROADMAP.length} encuentros completados
              </p>
            </div>
          </div>
        </div>

        {/* Grid of month pills */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-10">
          {ROADMAP.map((m) => {
            const isActive = active === m.num
            return (
              <button
                key={m.num}
                onClick={() => setActive(m.num)}
                className={`group flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl border transition-all duration-200 cursor-pointer
                  ${m.done
                    ? 'bg-blue border-blue text-white'
                    : isActive
                    ? 'bg-white/10 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/25 hover:text-white/70'
                  }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all
                  ${m.done ? 'bg-white/20' : isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}
                >
                  {m.done ? <CheckCircle2 size={14} className="text-white" /> : m.num}
                </div>
                <span className="text-[7px] font-bold uppercase tracking-wider leading-tight text-center line-clamp-2 px-0.5">
                  {m.topic}
                </span>
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-8 transition-all duration-300">
          {/* Month number */}
          <div className="shrink-0 w-20 h-20 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center">
            <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-none">Mes</span>
            <span className="text-3xl font-black text-white font-display leading-none mt-0.5">
              {String(selected.num).padStart(2, '0')}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                selected.done
                  ? 'bg-blue text-white'
                  : selected.num === 2
                  ? 'bg-amber-400/20 text-amber-300'
                  : 'bg-white/10 text-white/60'
              }`}>
                {selected.done ? '✓ Completado' : selected.num === 2 ? '→ Próximo evento' : 'Planificado'}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wide leading-none mb-3">
              {selected.topic}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-xs sm:text-sm font-body leading-relaxed max-w-2xl mb-4">
              {selected.description}
            </p>

            {/* Speaker */}
            <p className="text-white/35 text-[10px] font-body leading-relaxed border-l-2 border-blue/40 pl-3 max-w-xl">
              <span className="text-white/50 font-semibold uppercase tracking-wider text-[9px]">Ponente invitado: </span>
              {selected.speaker}
            </p>
          </div>

          <div className="shrink-0 hidden sm:flex items-center gap-1 text-white/20 text-[10px] font-body self-center">
            Selecciona un mes <ChevronRight size={13} />
          </div>
        </div>

      </div>
    </section>
  )
}
