import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-16 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12">
          {/* Columna 1: Brand & Info (6 columns) */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-xl">☕</span>
              <span className="font-display font-black text-xl tracking-wide text-white group-hover:text-blue transition-colors">
                Startups Coffee
              </span>
            </Link>
            <p className="font-body text-white/50 text-xs leading-relaxed max-w-sm">
              El semillero de founders venezolanos en Caracas. Un encuentro mensual
              para compartir experiencias de negocio reales, potenciar alianzas y
              acelerar ideas en etapas tempranas.
            </p>
          </div>

          {/* Columna 2: Navigation Links (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80 border-l-2 border-blue pl-2 leading-none">
              Navegación
            </h4>
            <nav className="flex flex-col space-y-2 text-xs font-medium text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/startups" className="hover:text-white transition-colors">
                Startups
              </Link>
              <Link href="/podcast" className="hover:text-white transition-colors">
                Podcast
              </Link>
              <Link href="/#proximo-evento" className="hover:text-white transition-colors">
                Próximo Evento
              </Link>
            </nav>
          </div>

          {/* Columna 3: Community & Actions (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80 border-l-2 border-blue pl-2 leading-none">
              Comunidad
            </h4>
            <nav className="flex flex-col space-y-2 text-xs font-medium text-white/50">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram ↗
              </a>
              <Link href="/register" className="hover:text-white transition-colors">
                Registra tu startup
              </Link>
              <Link href="/admin" className="hover:text-white transition-colors">
                Acceso Admin
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom copyright info */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-body text-[10px] text-white/40 leading-none">
            © {new Date().getFullYear()} Startups Coffee. Todos los derechos reservados.
          </p>
          <p className="font-body text-[10px] text-white/40 leading-none">
            Co-organizado por{' '}
            <span className="text-white/60 font-semibold">Smartgit</span>,{' '}
            <span className="text-white/60 font-semibold">Rematte</span>,{' '}
            <span className="text-white/60 font-semibold">Ashira</span>,{' '}
            <span className="text-white/60 font-semibold">Syncwave</span> y el equipo fundador.
          </p>
          <p className="font-body text-[10px] text-white/40 leading-none">
            Sede oficial:{' '}
            <span className="text-blue font-semibold">HUB BDV INNOVA</span>, Caracas
          </p>
        </div>
      </div>
    </footer>
  );
}
