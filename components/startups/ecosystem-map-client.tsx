'use client'

import React, { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'

// Venezuela Center
const CENTER: [number, number] = [9.082, -69.258]

const STARTUPS_LOCATIONS = [
  { name: 'Rematte', city: 'Caracas', stage: 'mvp', coords: [10.4806, -66.9036] as [number, number] },
  { name: 'Syncwave', city: 'Caracas', stage: 'traccion', coords: [10.505, -66.915] as [number, number] },
  { name: 'Smartgib', city: 'Barquisimeto', stage: 'mvp', coords: [10.0739, -69.3228] as [number, number] },
  { name: 'Ashira', city: 'Valencia', stage: 'idea', coords: [10.1620, -68.0077] as [number, number] },
  { name: 'CafeTech', city: 'Maracaibo', stage: 'escala', coords: [10.6427, -71.6125] as [number, number] },
]

export default function EcosystemMapClient() {
  useEffect(() => {
    // Leaflet configuration fix for SSR default marker icons (though we use circleMarker)
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    })
  }, [])

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-border select-none shadow-xs relative z-10 font-body">
      <MapContainer
        center={CENTER}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {STARTUPS_LOCATIONS.map((startup, idx) => (
          <CircleMarker
            key={idx}
            center={startup.coords}
            radius={9}
            fillColor="#1D4ED8"
            color="#FFFFFF"
            weight={2}
            fillOpacity={0.85}
          >
            <Popup>
              <div className="text-left p-1 select-text">
                <span className="block font-display font-black text-sm uppercase tracking-wide text-ink leading-tight">
                  {startup.name}
                </span>
                <span className="block text-[10px] text-muted font-body mt-0.5 leading-none">
                  Sede: {startup.city} · Etapa: {startup.stage.toUpperCase()}
                </span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
