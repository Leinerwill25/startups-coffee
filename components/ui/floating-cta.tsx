'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link
      href="/register"
      className={`hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50
                  bg-blue hover:bg-blue-dark text-white text-[10px] font-body font-bold uppercase tracking-widest
                  pl-3.5 pr-4 py-5 rounded-l-2xl border border-r-0 border-blue-dark shadow-xl items-center gap-2
                  transition-all duration-300 transform select-none cursor-pointer
                  ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      style={{ writingMode: 'vertical-lr' }}
    >
      <span className="rotate-180 flex items-center gap-1.5">
        Registra tu startup <ArrowUpRight size={13} className="shrink-0 rotate-90" />
      </span>
    </Link>
  )
}
