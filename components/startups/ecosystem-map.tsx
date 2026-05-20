'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const EcosystemMapClient = dynamic(() => import('./ecosystem-map-client'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-2xl bg-bg-subtle border border-border flex items-center justify-center select-none font-body">
      <span className="text-xs text-muted font-semibold animate-pulse">
        Cargando mapa de startups...
      </span>
    </div>
  ),
})

export function EcosystemMap() {
  return <EcosystemMapClient />
}
