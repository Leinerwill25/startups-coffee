import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Startup } from '@/lib/supabase/types';
import StatsCards from '@/components/admin/stats-cards';
import { ArrowRight, Calendar, ArrowUpRight, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let startups: Startup[] = [];
  let errorMsg = '';


  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching dashboard stats:', error);
      errorMsg = 'Error al consultar las estadísticas en Supabase.';
    } else {
      startups = data || [];
    }
  } catch (err) {
    console.error('Dashboard stats exception:', err);
    errorMsg = 'No se pudo conectar a la base de datos.';
  }

  // Compute counters
  const total = startups.length;
  const pending = startups.filter((s) => s.status === 'pending').length;
  const approved = startups.filter((s) => s.status === 'approved').length;
  const rejected = startups.filter((s) => s.status === 'rejected').length;

  // Top 5 recent applications
  const recentStartups = startups.slice(0, 5);

  const statusBadges: Record<string, { label: string; class: string }> = {
    pending: {
      label: 'Pendiente',
      class: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    approved: {
      label: 'Aprobada',
      class: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    rejected: {
      label: 'Rechazada',
      class: 'bg-rose-100 text-rose-800 border-rose-200',
    },
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8 select-none font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">
            Resumen General
          </h1>
          <p className="text-muted text-sm mt-0.5">
            Monitorea el ingreso de nuevas startups y actualiza sus estados de visibilidad.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center text-xs font-bold text-blue hover:text-blue-dark transition-colors gap-1 self-start sm:self-center"
        >
          Ver web pública
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {errorMsg ? (
        <div className="flex items-start rounded-2xl bg-rose-50 border border-rose-200 p-6 text-rose-800 gap-4">
          <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm">Error de conexión</h3>
            <p className="text-xs text-rose-700/90 leading-relaxed mt-1">
              {errorMsg}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <StatsCards
            total={total}
            pending={pending}
            approved={approved}
            rejected={rejected}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Table: Recent Registrations */}
            <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-2xs">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-lg font-extrabold text-ink">
                  Registros Recientes
                </h3>
                <span className="text-xs text-muted font-semibold">
                  Últimos 5 ingresos
                </span>
              </div>

              {recentStartups.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-border text-muted font-bold uppercase tracking-wider">
                        <th className="pb-3 pr-4 font-semibold">Startup</th>
                        <th className="pb-3 px-4 font-semibold">Founder</th>
                        <th className="pb-3 px-4 font-semibold">Industria</th>
                        <th className="pb-3 px-4 font-semibold">Ingreso</th>
                        <th className="pb-3 pl-4 font-semibold text-right">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {recentStartups.map((s) => (
                        <tr key={s.id} className="hover:bg-bg-subtle/40 transition-colors">
                          <td className="py-3.5 pr-4 font-semibold text-ink">
                            {s.name}
                          </td>
                          <td className="py-3.5 px-4 text-muted font-medium">
                            {s.founders}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center rounded-md bg-surface px-2 py-0.5 text-[10px] font-semibold text-blue">
                              {s.industry}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-muted font-medium">
                            {formatDate(s.created_at)}
                          </td>
                          <td className="py-3.5 pl-4 text-right">
                            <span
                              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${
                                statusBadges[s.status]?.class
                              }`}
                            >
                              {statusBadges[s.status]?.label || s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted text-xs">Aún no se han recibido registros.</p>
                </div>
              )}

              {/* View all button */}
              <div className="mt-6 pt-4 border-t border-border/60">
                <Link
                  href="/admin/startups"
                  className="inline-flex items-center text-xs font-bold text-blue hover:text-blue-dark transition-colors gap-1"
                >
                  Gestionar todos los registros
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs">
                <h3 className="font-display text-lg font-extrabold text-ink mb-4">
                  Acceso Rápido
                </h3>
                <div className="space-y-3 font-semibold">
                  <a
                    href="/register"
                    target="_blank"
                    className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-blue hover:bg-surface/10 transition-all text-xs"
                  >
                    <span>Abrir Formulario Registro</span>
                    <ArrowRight className="h-4 w-4 text-blue" />
                  </a>
                  <a
                    href="/startups"
                    target="_blank"
                    className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-blue hover:bg-surface/10 transition-all text-xs"
                  >
                    <span>Explorar Directorio Público</span>
                    <ArrowRight className="h-4 w-4 text-blue" />
                  </a>
                </div>
              </div>

              <div className="bg-surface/50 border border-blue/20 rounded-2xl p-6">
                <h4 className="text-xs font-semibold text-blue uppercase tracking-wider mb-2">
                  Nota del Sistema
                </h4>
                <p className="text-muted text-xs leading-relaxed">
                  Las startups registradas entran en estado <span className="font-semibold text-ink">Pendiente</span> por defecto. Para que aparezcan públicamente en el directorio, debes ingresar a la sección de Startups y pulsar el botón <span className="font-semibold text-emerald-700">Aprobar</span>.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
