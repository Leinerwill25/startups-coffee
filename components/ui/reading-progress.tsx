'use client'
import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calc = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', calc, { passive: true })
    calc() // run initial check
    return () => window.removeEventListener('scroll', calc)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-blue z-[9999] transition-all duration-75"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
    />
  )
}
