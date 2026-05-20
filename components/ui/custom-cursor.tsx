'use client'
import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (window.matchMedia('(hover: none)').matches) return // skip en touch

    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }

    const grow = () => cursorRef.current?.classList.add('scale-[2.5]', 'opacity-60')
    const shrink = () => cursorRef.current?.classList.remove('scale-[2.5]', 'opacity-60')

    window.addEventListener('mousemove', move)
    
    // Add hover behavior dynamically
    const updateListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }

    updateListeners()

    // Periodically update listeners in case new DOM elements mount
    const timer = setInterval(updateListeners, 1500)

    return () => {
      window.removeEventListener('mousemove', move)
      clearInterval(timer)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={cursorRef}
      className="fixed w-5 h-5 bg-blue rounded-full pointer-events-none z-[9999]
                 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150
                 mix-blend-difference hidden md:block"
    />
  )
}
