'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const STAGE_DATA = [
  { name: 'Idea', count: 12 },
  { name: 'MVP', count: 8 },
  { name: 'Tracción', count: 5 },
  { name: 'Escala', count: 2 },
]

const INDUSTRY_DATA = [
  { name: 'Fintech', value: 7 },
  { name: 'E-commerce', value: 6 },
  { name: 'SaaS', value: 5 },
  { name: 'Edtech', value: 4 },
  { name: 'Otros', value: 5 },
]

const COLORS = ['#1D4ED8', '#1E3A8A', '#3B82F6', '#93C5FD', '#E5E7EB']

export function CommunityStats() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-80 bg-bg-subtle border border-border rounded-2xl animate-pulse" />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none font-body">
      {/* Chart 1: Stages BarChart */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between h-80">
        <div>
          <span className="text-[9px] font-bold text-blue uppercase tracking-widest leading-none mb-1 block">
            Métricas de Crecimiento
          </span>
          <h4 className="font-display font-extrabold text-sm text-ink uppercase tracking-wide">
            Startups por Etapa
          </h4>
        </div>
        
        <div className="h-48 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={STAGE_DATA}>
              <XAxis dataKey="name" stroke="#6B7280" fontSize={10} tickLine={false} />
              <YAxis stroke="#6B7280" fontSize={10} tickLine={false} />
              <Tooltip cursor={{ fill: '#F4F6FB' }} />
              <Bar dataKey="count" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Industry PieChart */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between h-80">
        <div>
          <span className="text-[9px] font-bold text-blue uppercase tracking-widest leading-none mb-1 block">
            Métricas de Distribución
          </span>
          <h4 className="font-display font-extrabold text-sm text-ink uppercase tracking-wide">
            Startups por Sector
          </h4>
        </div>
        
        <div className="h-48 w-full mt-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={INDUSTRY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {INDUSTRY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {/* Custom legend */}
          <div className="flex flex-col gap-1.5 ml-4 shrink-0 text-left">
            {INDUSTRY_DATA.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5 text-[9px] font-semibold text-ink/80 uppercase">
                <span
                  className="w-2.5 h-2.5 rounded-xs shrink-0"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
