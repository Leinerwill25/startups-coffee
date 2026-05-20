'use client'
import { useEffect, useState } from 'react'

const NEXT_EVENT_DATE = new Date('2026-06-15T18:00:00-04:00') // UTC-4 Venezuela (Set to June 2026)

function getTimeLeft() {
  const diff = NEXT_EVENT_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export function EventCountdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null)

  useEffect(() => {
    setTime(getTimeLeft())
    const interval = setInterval(() => {
      setTime(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) {
    return (
      <div className="text-center py-2">
        <p className="text-blue font-display font-extrabold uppercase tracking-wider animate-pulse">
          ¡El evento es hoy! ☕
        </p>
      </div>
    )
  }

  const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0')

  return (
    <div className="flex gap-4 items-center justify-center select-none font-body py-4 bg-surface/50 border border-blue/10 rounded-2xl max-w-sm mx-auto">
      {[
        { value: time.days,    label: 'días' },
        { value: time.hours,   label: 'horas' },
        { value: time.minutes, label: 'min' },
        { value: time.seconds, label: 'seg' },
      ].map(({ value, label }) => (
        <div key={label} className="text-center min-w-[60px]">
          <div className="font-display text-3xl font-black text-blue leading-none mb-1">
            {pad(value)}
          </div>
          <div className="font-body text-[9px] font-bold text-muted uppercase tracking-widest leading-none">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
