'use client'
import { useState, useEffect } from 'react'
import { X, Calendar } from 'lucide-react'

const NEXT_EVENT = {
  date: '15 de Junio, 2026',
  topic: 'Marketing y Go-to-Market para Startups',
  link: '#proximo-evento',
}

export function EventBanner() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDismissed = localStorage.getItem('sc_event_banner_dismissed')
    if (isDismissed) {
      setVisible(false)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('sc_event_banner_dismissed', '1')
    window.dispatchEvent(new Event('event_banner_change'))
  }

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] bg-blue-dark text-white shadow-md select-none font-body">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 max-w-7xl mx-auto">
        <span className="flex items-center gap-1.5 font-medium text-xs min-w-0">
          <Calendar size={13} className="text-surface shrink-0" />
          <span className="truncate">
            ☕{' '}
            <strong className="font-semibold">{NEXT_EVENT.date}</strong>
            <span className="hidden sm:inline"> — {NEXT_EVENT.topic}</span>
          </span>
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={NEXT_EVENT.link}
            className="bg-white hover:bg-surface text-blue font-semibold text-[10px] px-3 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            Reservar →
          </a>
          <button
            onClick={dismiss}
            className="hover:text-surface transition-colors cursor-pointer p-0.5"
            aria-label="Cerrar banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
