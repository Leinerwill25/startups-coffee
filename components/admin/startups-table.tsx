'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Startup, StartupStatus } from '@/lib/supabase/types';
import {
  Search,
  Check,
  X,
  Eye,
  FileText,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from 'lucide-react';

interface StartupsTableProps {
  initialStartups: Startup[];
}

export default function StartupsTable({ initialStartups }: StartupsTableProps) {
  const router = useRouter();
  const supabase = createClient();

  // Local copy of startups for immediate feedback before router refresh
  const [startups, setStartups] = useState<Startup[]>(initialStartups);

  // Search and Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal State
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync state if initialStartups changes (e.g. on server reload)
  React.useEffect(() => {
    setStartups(initialStartups);
  }, [initialStartups]);

  // Operations
  const handleUpdateStatus = async (
    id: string,
    newStatus: StartupStatus,
    customNotes?: string
  ) => {
    setIsUpdating(true);
    const notesToSave = customNotes !== undefined ? customNotes : adminNotes;

    try {
      const { error } = await supabase
        .from('startups')
        .update({
          status: newStatus,
          admin_notes: notesToSave || null,
        })
        .eq('id', id);

      if (error) {
        showToast(`Error al actualizar: ${error.message}`, 'error');
      } else {
        // Update local state instantly
        setStartups((prev) =>
          prev.map((s) =>
            s.id === id
              ? { ...s, status: newStatus, admin_notes: notesToSave || null }
              : s
          )
        );

        // Update active modal copy
        if (selectedStartup && selectedStartup.id === id) {
          setSelectedStartup((prev) =>
            prev
              ? { ...prev, status: newStatus, admin_notes: notesToSave || null }
              : null
          );
        }

        // Trigger Success messages
        if (newStatus === 'approved') {
          showToast('Startup aprobada — ya aparece en el directorio', 'success');
        } else if (newStatus === 'rejected') {
          showToast('Startup rechazada con éxito', 'info');
        } else {
          showToast('Estado revertido a pendiente', 'info');
        }

        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      showToast('Ocurrió un error inesperado al actualizar.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotesOnly = async () => {
    if (!selectedStartup) return;
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('startups')
        .update({
          admin_notes: adminNotes || null,
        })
        .eq('id', selectedStartup.id);

      if (error) {
        showToast(`Error al guardar notas: ${error.message}`, 'error');
      } else {
        setStartups((prev) =>
          prev.map((s) =>
            s.id === selectedStartup.id
              ? { ...s, admin_notes: adminNotes || null }
              : s
          )
        );
        setSelectedStartup((prev) =>
          prev ? { ...prev, admin_notes: adminNotes || null } : null
        );
        showToast('Notas administrativas guardadas', 'success');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      showToast('Error al conectar con la base de datos.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenDetailModal = (startup: Startup) => {
    setSelectedStartup(startup);
    setAdminNotes(startup.admin_notes || '');
  };

  const handleCloseModal = () => {
    setSelectedStartup(null);
    setAdminNotes('');
  };

  // Filters Calculation
  const filteredList = useMemo(() => {
    return startups.filter((s) => {
      // Search match
      if (search) {
        const q = search.toLowerCase();
        const matchesName = s.name?.toLowerCase().includes(q);
        const matchesFounder = s.founders?.toLowerCase().includes(q);
        if (!matchesName && !matchesFounder) return false;
      }

      // Status match
      if (statusFilter !== 'all' && s.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [startups, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      all: startups.length,
      pending: startups.filter((s) => s.status === 'pending').length,
      approved: startups.filter((s) => s.status === 'approved').length,
      rejected: startups.filter((s) => s.status === 'rejected').length,
    };
  }, [startups]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Status badge config
  const statusConfig: Record<string, { label: string; class: string }> = {
    pending: {
      label: 'Pendiente',
      class: 'bg-amber-50 border-amber-200 text-amber-700',
    },
    approved: {
      label: 'Aprobada',
      class: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
    rejected: {
      label: 'Rechazada',
      class: 'bg-rose-50 border-rose-200 text-rose-700',
    },
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : 'bg-indigo-50 border-indigo-200 text-indigo-950'
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          )}
          {toast.type === 'error' && (
            <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
          )}
          {toast.type === 'info' && (
            <FileText className="h-5 w-5 text-indigo-600 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border shadow-3xs">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'Todos', count: stats.all },
            { id: 'pending', label: 'Pendientes', count: stats.pending, isAlert: stats.pending > 0 },
            { id: 'approved', label: 'Aprobadas', count: stats.approved },
            { id: 'rejected', label: 'Rechazadas', count: stats.rejected },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-blue text-white shadow-2xs'
                  : 'text-muted hover:bg-bg-subtle hover:text-ink'
              }`}
            >
              {tab.label}
              <span
                className={`inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                  statusFilter === tab.id
                    ? 'bg-white/20 text-white'
                    : tab.isAlert
                    ? 'bg-amber-100 text-amber-800 animate-pulse'
                    : 'bg-surface text-blue'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4.5 w-4.5 text-muted" />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre o founder..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-border rounded-xl text-xs text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-2xs">
        {filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-bg-subtle/50 text-muted font-bold uppercase tracking-wider select-none">
                  <th className="py-4 px-6 font-semibold">Startup</th>
                  <th className="py-4 px-6 font-semibold">Founders</th>
                  <th className="py-4 px-6 font-semibold">Industria</th>
                  <th className="py-4 px-6 font-semibold">Etapa</th>
                  <th className="py-4 px-6 font-semibold">Ciudad</th>
                  <th className="py-4 px-6 font-semibold">Fecha Registro</th>
                  <th className="py-4 px-6 font-semibold">Estado</th>
                  <th className="py-4 px-6 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredList.map((startup) => (
                  <tr
                    key={startup.id}
                    className="hover:bg-bg-subtle/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-extrabold font-body text-ink">
                      {startup.name}
                    </td>
                    <td className="py-4 px-6 text-muted font-semibold">
                      {startup.founders}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center rounded-md bg-surface px-2 py-0.5 text-[10px] font-semibold text-blue">
                        {startup.industry}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted font-semibold capitalize">
                      {startup.stage}
                    </td>
                    <td className="py-4 px-6 text-muted font-semibold">
                      {startup.city}
                    </td>
                    <td className="py-4 px-6 text-muted font-semibold">
                      {formatDate(startup.created_at)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                          statusConfig[startup.status]?.class
                        }`}
                      >
                        {statusConfig[startup.status]?.label || startup.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenDetailModal(startup)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-muted hover:text-blue hover:border-blue transition-all"
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {startup.status !== 'approved' && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(startup.id, 'approved', startup.admin_notes || undefined)
                          }
                          disabled={isUpdating}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-transparent transition-all"
                          title="Aprobar"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}

                      {startup.status !== 'rejected' && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(startup.id, 'rejected', startup.admin_notes || undefined)
                          }
                          disabled={isUpdating}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-600 hover:text-white hover:border-transparent transition-all"
                          title="Rechazar"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-3xl block mb-2">🔍</span>
            <h3 className="text-sm font-semibold text-ink mb-1">
              No hay registros
            </h3>
            <p className="text-muted text-xs">
              No se encontraron startups que coincidan con la búsqueda actual.
            </p>
          </div>
        )}
      </div>

      {/* Details Dialog Modal */}
      {selectedStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-border shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-border bg-bg-subtle/40 flex justify-between items-center">
              <div>
                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-surface text-blue border-blue/20 mb-1.5 select-none">
                  Ficha de Registro
                </span>
                <h3 className="font-display text-xl font-extrabold text-ink leading-tight">
                  {selectedStartup.name}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-bg-subtle transition-all text-muted hover:text-ink cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow text-xs leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Column 1 info */}
                <div className="space-y-3.5">
                  <div>
                    <span className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                      Founders
                    </span>
                    <p className="text-ink font-semibold">{selectedStartup.founders}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                      Industria / Etapa
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded bg-surface px-2 py-0.5 font-semibold text-blue">
                        {selectedStartup.industry}
                      </span>
                      <span className="inline-flex items-center rounded bg-bg-subtle border px-2 py-0.5 font-semibold text-muted uppercase">
                        {selectedStartup.stage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted select-none">
                    <MapPin className="h-4 w-4 text-muted/80 shrink-0" />
                    <span className="font-semibold text-ink">{selectedStartup.city}</span>
                  </div>
                </div>

                {/* Column 2 info */}
                <div className="space-y-3.5">
                  <div>
                    <span className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                      Fecha Registro
                    </span>
                    <div className="flex items-center gap-1 text-muted">
                      <Calendar className="h-4 w-4 text-muted/80 shrink-0" />
                      <span className="font-semibold">{formatDate(selectedStartup.created_at)}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                      Sitio Web / Instagram
                    </span>
                    {selectedStartup.website_or_ig ? (
                      <a
                        href={
                          selectedStartup.website_or_ig.trim().startsWith('@')
                            ? `https://instagram.com/${selectedStartup.website_or_ig.trim().slice(1)}`
                            : selectedStartup.website_or_ig.trim().startsWith('http')
                            ? selectedStartup.website_or_ig.trim()
                            : `https://${selectedStartup.website_or_ig.trim()}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue font-semibold hover:underline gap-1"
                      >
                        {selectedStartup.website_or_ig}
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    ) : (
                      <p className="text-muted font-semibold italic">No especificado</p>
                    )}
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                      Asistencia Presencial
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 font-semibold border ${
                        selectedStartup.attended_event
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-muted/10 border-border text-muted'
                      }`}
                    >
                      {selectedStartup.attended_event ? 'Sí, ha asistido' : 'No ha asistido'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-bg-subtle p-4 rounded-xl border border-border">
                <span className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">
                  Descripción corta
                </span>
                <p className="text-ink leading-relaxed font-semibold">
                  {selectedStartup.description}
                </p>
              </div>

              {/* Admin Notes Box */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="notes"
                    className="block text-[10px] font-semibold text-muted uppercase tracking-wider"
                  >
                    Notas Administrativas (Notas internas del equipo)
                  </label>
                  <button
                    type="button"
                    onClick={handleSaveNotesOnly}
                    disabled={isUpdating}
                    className="inline-flex items-center justify-center rounded-lg bg-surface px-3 py-1 text-[10px] font-semibold text-blue hover:bg-blue hover:text-white transition-all cursor-pointer"
                  >
                    Guardar Notas
                  </button>
                </div>
                <textarea
                  id="notes"
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Escribe comentarios internos sobre esta startup aquí..."
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-xs text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            {/* Modal Footer (Actions) */}
            <div className="p-6 border-t border-border bg-bg-subtle/40 flex flex-wrap gap-3 items-center justify-between select-none">
              {/* Active status indicator */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted">Estado actual:</span>
                <span
                  className={`font-semibold border px-2 py-0.5 rounded ${
                    statusConfig[selectedStartup.status]?.class
                  }`}
                >
                  {statusConfig[selectedStartup.status]?.label || selectedStartup.status}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                {selectedStartup.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateStatus(selectedStartup.id, 'approved')
                    }
                    disabled={isUpdating}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 font-semibold transition-all text-xs cursor-pointer shadow-xs gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    Aprobar Startup
                  </button>
                )}

                {selectedStartup.status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateStatus(selectedStartup.id, 'rejected')
                    }
                    disabled={isUpdating}
                    className="inline-flex items-center justify-center rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 font-semibold transition-all text-xs cursor-pointer shadow-xs gap-1.5"
                  >
                    <X className="h-4 w-4" />
                    Rechazar Startup
                  </button>
                )}

                {(selectedStartup.status === 'approved' ||
                  selectedStartup.status === 'rejected') && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateStatus(selectedStartup.id, 'pending')
                    }
                    disabled={isUpdating}
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-white text-muted hover:text-ink px-4 py-2.5 font-semibold transition-all text-xs cursor-pointer gap-1.5"
                  >
                    Revertir a Pendiente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
