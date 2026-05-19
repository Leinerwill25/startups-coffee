import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Startup } from '@/lib/supabase/types';
import StartupsTable from '@/components/admin/startups-table';
import { ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminStartupsPage() {
  let startups: Startup[] = [];
  let errorMsg = '';


  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('startups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admin startups:', error);
      errorMsg = 'Error al cargar los registros desde Supabase.';
    } else {
      startups = data || [];
    }
  } catch (err) {
    console.error('Admin startups query exception:', err);
    errorMsg = 'Ocurrió un error al establecer la comunicación con el servidor.';
  }

  return (
    <div className="space-y-8 font-body">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink select-none">
          Gestión de Startups
        </h1>
        <p className="text-muted text-sm mt-0.5 select-none">
          Aprueba registros para el directorio público, rechaza solicitudes e ingresa anotaciones administrativas.
        </p>
      </div>

      {/* Main Content */}
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
        <StartupsTable initialStartups={startups} />
      )}
    </div>
  );
}
