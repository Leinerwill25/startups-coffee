import React from 'react';
import { ArrowUpRight, Award, Flame, Users, Landmark } from 'lucide-react';

export default function StatsRow() {
  const stats = [
    {
      value: '1 +',
      label: 'Evento Realizado',
      description: 'El inicio de un gran movimiento',
      isAccent: true,
      icon: Flame,
    },
    {
      value: '2',
      label: 'Ponentes por evento',
      description: 'Founders venezolanos exitosos',
      isAccent: false,
      icon: Award,
    },
    {
      value: '20 +',
      label: 'Asistentes y creciendo',
      description: 'Founders en etapas tempranas',
      isAccent: false,
      icon: Users,
    },
    {
      value: 'Caracas VE',
      label: 'HUB BDV INNOVA',
      description: 'Banco de Venezuela',
      isAccent: false,
      icon: Landmark,
    },
  ];

  return (
    <section className="bg-bg-subtle/50 py-16 border-t border-border border-b border-border select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-200 hover:scale-[1.01] ${
                  stat.isAccent
                    ? 'bg-blue border-transparent text-white shadow-xs'
                    : 'bg-white border-border text-ink'
                }`}
              >
                {/* Arrow highlight in accent card */}
                {stat.isAccent && (
                  <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-white/70 animate-pulse" />
                )}

                <div className="flex flex-col justify-between h-28">
                  {/* Icon */}
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center border shrink-0 ${
                      stat.isAccent
                        ? 'bg-white/15 border-white/10'
                        : 'bg-surface border-blue/15 text-blue'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    {/* Metric */}
                    <span className="block font-display text-4xl font-black leading-none mb-1.5">
                      {stat.value}
                    </span>

                    {/* Label */}
                    <h4 className={`text-[11px] font-body font-semibold uppercase tracking-wider leading-tight ${
                      stat.isAccent ? 'text-white/90' : 'text-ink/80'
                    }`}>
                      {stat.label}
                    </h4>
                    <span className={`text-[9px] font-body block font-medium mt-0.5 ${
                      stat.isAccent ? 'text-white/50' : 'text-muted'
                    }`}>
                      {stat.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
