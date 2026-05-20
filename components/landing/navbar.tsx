'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerActive, setBannerActive] = useState(false);

  useEffect(() => {
    const checkBanner = () => {
      const isDismissed = localStorage.getItem('sc_event_banner_dismissed');
      setBannerActive(!isDismissed);
    };
    checkBanner();
    window.addEventListener('event_banner_change', checkBanner);
    return () => window.removeEventListener('event_banner_change', checkBanner);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Startups', href: '/startups' },
    { label: 'Podcast', href: '/podcast' },
    { label: 'Próximo Evento', href: '/#proximo-evento' },
  ];

  return (
    <header className={`sticky ${bannerActive ? 'top-[42px] sm:top-[44px]' : 'top-0'} z-50 w-full bg-white/80 backdrop-blur-md border-b border-border select-none transition-all duration-200`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl">☕</span>
          <span className="font-display font-black text-xl tracking-wide text-ink group-hover:text-blue transition-colors">
            Startups Coffee
          </span>
        </Link>

        {/* Links Center (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-muted uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-blue transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue after:transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Right (Desktop) */}
        <div className="hidden md:block">
          <Link href="/register">
            <Button pill size="sm">
              Registra tu Startup
            </Button>
          </Link>
        </div>

        {/* Hamburger Trigger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 rounded-lg hover:bg-bg-subtle transition-all cursor-pointer text-ink"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 w-full bg-white/95 backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col p-6 space-y-6 border-t border-border">
            <nav className="flex flex-col space-y-4 text-sm font-bold text-ink uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue transition-colors py-1.5 border-b border-border/40"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4">
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button pill className="w-full">
                  Registra tu Startup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
