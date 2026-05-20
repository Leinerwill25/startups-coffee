'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Permanently suppressed after explicit dismiss or subscription
    if (localStorage.getItem('sc_newsletter_dismissed')) return

    // Only show once per page load/reload (sessionStorage resets on each load)
    if (sessionStorage.getItem('sc_newsletter_shown')) return

    let fired = false

    const show = () => {
      if (fired) return
      fired = true
      // Mark as shown for this session so it won't re-trigger
      sessionStorage.setItem('sc_newsletter_shown', '1')
      cleanup()
      setVisible(true)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }

    // Show after 30s idle OR on exit intent — whichever comes first
    const timer = setTimeout(show, 30000)
    document.addEventListener('mouseleave', handleMouseLeave)

    function cleanup() {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }

    return cleanup
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('sc_newsletter_dismissed', '1')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated newsletter signup
    setSent(true)
    setTimeout(dismiss, 2500)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={dismiss}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8 relative border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
        
        {sent ? (
          <div className="text-center py-6">
            <p className="font-display text-3xl text-blue mb-2">¡Listo! ☕</p>
            <p className="text-muted text-sm font-body">Te enviaremos los detalles del próximo evento directamente a tu correo.</p>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-body font-bold text-blue uppercase tracking-widest mb-1.5">
              Boletín Startups Coffee
            </p>
            <h3 className="font-display text-2xl text-ink mb-2">
              Entérate antes que todos
            </h3>
            <p className="text-muted text-sm font-body mb-6 leading-relaxed">
              Recibe las fechas, ponentes y resúmenes de cada evento directo en tu bandeja de entrada.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 border border-border bg-bg-subtle rounded-xl px-4 py-2.5 text-sm font-body focus:outline-hidden focus:border-blue transition-colors text-ink"
              />
              <button
                type="submit"
                className="bg-blue hover:bg-blue-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-colors cursor-pointer shrink-0"
              >
                Suscribir
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
