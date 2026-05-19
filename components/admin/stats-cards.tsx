import React from 'react';
import { Layers, HelpCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatsCardsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export default function StatsCards({
  total,
  pending,
  approved,
  rejected,
}: StatsCardsProps) {
  const stats = [
    {
      name: 'Total Registros',
      value: total,
      icon: Layers,
      colorClass: 'text-ink bg-bg-subtle border-border',
    },
    {
      name: 'Pendientes',
      value: pending,
      icon: HelpCircle,
      colorClass: 'text-amber-700 bg-amber-50 border-amber-200',
      badge: pending > 0 ? `${pending} nuevo${pending > 1 ? 's' : ''}` : null,
    },
    {
      name: 'Aprobadas',
      value: approved,
      icon: CheckCircle,
      colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      name: 'Rechazadas',
      value: rejected,
      icon: XCircle,
      colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 select-none">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.name}
            className={`relative overflow-hidden rounded-2xl border p-6 flex items-center justify-between ${
              stat.name === 'Pendientes' && pending > 0
                ? 'ring-1 ring-amber-300 shadow-xs'
                : 'bg-white shadow-2xs'
            }`}
          >
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                {stat.name}
              </p>
              <div className="flex items-baseline mt-1.5 gap-2">
                <span className="font-display text-3xl font-semibold text-ink">
                  {stat.value}
                </span>
                {stat.badge && (
                  <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 animate-pulse">
                    {stat.badge}
                  </span>
                )}
              </div>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl border ${stat.colorClass}`}
            >
              <Icon className="h-6 w-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
