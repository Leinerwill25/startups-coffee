'use client'

import React, { useState } from 'react'
import { registerAttendance } from '@/app/actions/attendance'
import { CalendarCheck, Loader2 } from 'lucide-react'

export function AttendanceForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [startup, setStartup] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    const result = await registerAttendance({
      name,
      email,
      startup,
    })

    setLoading(false)
    if (result.success) {
      setSent(true)
    } else {
      setErrorMsg(result.error || 'Hubo un problema al procesar tu solicitud. Intenta de nuevo.')
    }
  }

  return (
    <div className="w-full max-w-md select-none font-body">
      {sent ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center gap-3">
          <CalendarCheck className="h-5 w-5 text-green-600 shrink-0" />
          <div className="text-left">
            <p className="font-bold text-xs uppercase tracking-wider leading-none mb-1">
              ¡Registro exitoso!
            </p>
            <p className="text-[11px] leading-tight text-green-700">
              Tu cupo está reservado. Te enviaremos la confirmación al correo.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tu nombre"
              className="flex-1 border border-border bg-white rounded-xl px-4 py-2.5 text-xs text-ink font-body focus:outline-hidden focus:border-blue transition-colors"
            />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Tu correo"
              className="flex-1 border border-border bg-white rounded-xl px-4 py-2.5 text-xs text-ink font-body focus:outline-hidden focus:border-blue transition-colors"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={startup}
              onChange={e => setStartup(e.target.value)}
              placeholder="Startup (opcional)"
              className="flex-1 border border-border bg-white rounded-xl px-4 py-2.5 text-xs text-ink font-body focus:outline-hidden focus:border-blue transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue hover:bg-blue-dark disabled:bg-blue/50 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Procesando...
                </>
              ) : (
                'Reservar cupo'
              )}
            </button>
          </div>
          {errorMsg && (
            <p className="text-[10px] text-red-600 font-semibold text-center mt-1">
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
