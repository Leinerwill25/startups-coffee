'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Por favor rellena todos los campos.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Humanize common auth errors
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setErrorMsg('Credenciales inválidas. Revisa tu correo y contraseña.');
        } else {
          setErrorMsg(error.message);
        }
        setIsSubmitting(false);
      } else {
        // Successful login
        router.refresh();
        router.push('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login exception:', err);
      setErrorMsg('Error al conectar con el servidor.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 select-none font-body">
      <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">☕</span>
          <h1 className="font-display text-2xl font-extrabold text-ink mb-1">
            Startups Coffee
          </h1>
          <p className="text-xs font-semibold text-blue uppercase tracking-widest">
            Panel de Administración
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="flex items-start rounded-xl bg-red-50 border border-red-200 p-4 text-red-800 gap-3 mb-6 animate-in fade-in slide-in-from-top-2 duration-150">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-tight">{errorMsg}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@startupscoffee.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center rounded-xl bg-blue py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-dark active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Iniciando Sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs font-semibold text-muted hover:text-blue transition-colors"
          >
            ← Volver a la página pública
          </a>
        </div>
      </div>
    </div>
  );
}
