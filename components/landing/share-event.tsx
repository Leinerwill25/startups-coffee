'use client'

import React, { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'

const EVENT_TEXT = encodeURIComponent(
  '🚀 Hay un evento para founders venezolanos este mes en Caracas — Startups Coffee. Masterclasses y networking en el HUB BDV INNOVA. ¡Únete!'
)
const EVENT_URL = encodeURIComponent('https://startupscoffee.vercel.app')

const shares = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/?text=${EVENT_TEXT}%20${EVENT_URL}`,
    color: 'bg-[#25D366] hover:bg-[#20ba5a]',
  },
  {
    label: 'Twitter/X',
    href: `https://twitter.com/intent/tweet?text=${EVENT_TEXT}&url=${EVENT_URL}`,
    color: 'bg-ink hover:bg-ink/80',
  },
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${EVENT_URL}`,
    color: 'bg-[#0077B5] hover:bg-[#006396]',
  },
]

export function ShareEvent() {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText('https://startupscoffee.vercel.app')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="font-body select-none">
      <span className="text-[10px] uppercase tracking-widest font-bold text-muted flex items-center gap-1 mb-3">
        <Share2 size={12} /> Compartir:
      </span>
      {/* 2-col grid on mobile → auto-fit on sm+ */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {shares.map(({ label, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-full transition-all duration-200 shadow-xs hover:scale-105 cursor-pointer text-center`}
          >
            {label}
          </a>
        ))}
        <button
          onClick={copyLink}
          className="col-span-2 sm:col-span-1 text-[10px] font-bold uppercase tracking-wider border border-border bg-white text-ink px-3 py-2 rounded-full hover:border-blue hover:text-blue hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={11} className="text-green-600" /> Copiado
            </>
          ) : (
            <>
              <Copy size={11} /> Copiar link
            </>
          )}
        </button>
      </div>
    </div>
  )
}
