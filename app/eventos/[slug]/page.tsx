import React from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { EventSummary } from '@/lib/supabase/types'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { ArrowLeft, BookOpen, Calendar, MapPin, Award } from 'lucide-react'

// Set layout to force-dynamic to bypass build-time prerendering if using DB
export const dynamic = 'force-dynamic'

const MOCK_SUMMARIES: Record<string, EventSummary> = {
  'pmf-y-validacion': {
    id: 'e1',
    slug: 'pmf-y-validacion',
    month_num: 1,
    title: 'Validación de Idea y Product-Market Fit (PMF)',
    date: '15 de Mayo, 2026',
    speaker_1: 'Carlos Rodríguez (CEO @ Rematte)',
    topic_1: 'Metodologías Lean para validar tu propuesta de valor sin presupuesto.',
    takeaways_1: [
      'Habla con al menos 30 clientes potenciales antes de escribir la primera línea de código.',
      'Define tu métrica estrella (North Star Metric) desde el día uno.',
      'El PMF no es un evento único; es un proceso iterativo continuo.',
    ],
    speaker_2: 'Luis Gómez (CTO @ Smartgib)',
    topic_2: 'Diseño de MVP tecnológico con foco en feedback rápido.',
    takeaways_2: [
      'Evita la sobreingeniería: usa herramientas No-Code para tu primera versión si es posible.',
      'Mide la retención de usuarios semanales, no solo los registros totales.',
      'Prioriza la velocidad de despliegue sobre la perfección visual.',
    ],
    photos: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    ],
    published: true,
    created_at: '',
  },
}

export default async function EventoRecapPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let summary: EventSummary | null = MOCK_SUMMARIES[slug] || null

  try {
    const supabase = await createClient()
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { data, error } = await supabase
        .from('event_summaries')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()

      if (!error && data) {
        summary = data as EventSummary
      }
    }
  } catch (err) {
    console.warn("Using local summaries fallback due to DB connection skip.")
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-bg-subtle flex flex-col justify-between select-none font-body">
        <Navbar />
        <main className="max-w-md mx-auto py-24 px-6 text-center">
          <h2 className="font-display font-black text-3xl text-ink mb-4">Resumen no encontrado</h2>
          <p className="text-muted text-xs mb-8">El evento especificado no cuenta con un reporte publicado todavía.</p>
          <Link href="/">
            <span className="bg-blue hover:bg-blue-dark text-white font-bold text-xs px-5 py-3 rounded-2xl transition-colors cursor-pointer inline-flex items-center gap-1.5">
              <ArrowLeft size={14} /> Volver al inicio
            </span>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-subtle select-none font-body flex flex-col justify-between">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-16 px-6 flex-1 w-full text-left">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-blue transition-colors mb-8 font-semibold">
          <ArrowLeft size={14} /> Volver al inicio
        </Link>

        {/* Title Block */}
        <div className="border-b border-border pb-8 mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[9px] font-bold text-blue uppercase tracking-wider mb-4">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            Resumen Post-Evento (Mes {summary.month_num})
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-ink uppercase tracking-tight leading-tight mb-4">
            {summary.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-muted font-medium">
            <span className="flex items-center gap-1"><Calendar size={14} /> {summary.date}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> HUB BDV INNOVA, Caracas</span>
          </div>
        </div>

        {/* Takeaways Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Speaker 1 */}
          <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-blue">
              <Award size={18} />
              <h3 className="font-display font-extrabold text-sm uppercase tracking-wide">
                Clase 1: {summary.speaker_1}
              </h3>
            </div>
            <p className="text-xs font-semibold text-ink/80 mb-5 leading-relaxed font-body">
              Tema: {summary.topic_1}
            </p>
            <ul className="flex flex-col gap-3">
              {summary.takeaways_1.map((item, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs text-muted leading-relaxed font-body select-text">
                  <span className="w-5 h-5 rounded-full bg-surface text-blue flex items-center justify-center shrink-0 text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Speaker 2 */}
          {summary.speaker_2 && (
            <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4 text-blue">
                <Award size={18} />
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wide">
                  Clase 2: {summary.speaker_2}
                </h3>
              </div>
              <p className="text-xs font-semibold text-ink/80 mb-5 leading-relaxed font-body">
                Tema: {summary.topic_2}
              </p>
              <ul className="flex flex-col gap-3">
                {summary.takeaways_2?.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-muted leading-relaxed font-body select-text">
                    <span className="w-5 h-5 rounded-full bg-surface text-blue flex items-center justify-center shrink-0 text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Photos Grid */}
        {summary.photos && summary.photos.length > 0 && (
          <div>
            <h3 className="font-display font-extrabold text-base text-ink uppercase tracking-wide mb-6">
              Capturas de la sesión
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summary.photos.map((photo, idx) => (
                <div key={idx} className="aspect-video rounded-2xl overflow-hidden border border-border shadow-xs">
                  <img
                    src={photo}
                    alt={`Foto del evento ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
