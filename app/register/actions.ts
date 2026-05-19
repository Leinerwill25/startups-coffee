'use server';

import { createClient } from '@/lib/supabase/server';
import { startupSchema } from '@/lib/validations/startup';

export async function registerStartup(data: unknown) {
  // 1. Server-side validation
  const result = startupSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: 'Formulario inválido. Por favor revisa los campos.',
    };
  }

  try {
    // 2. Initialize Supabase server client
    const supabase = await createClient();

    // 3. Database INSERT
    const { error } = await supabase.from('startups').insert({
      name: result.data.name,
      founders: result.data.founders,
      industry: result.data.industry,
      stage: result.data.stage,
      city: result.data.city || 'Caracas',
      website_or_ig: result.data.website_or_ig || null,
      description: result.data.description,
      attended_event: result.data.attended_event,
      status: 'pending', // Always defaults to pending on creation
    });

    if (error) {
      console.error('Supabase DB Insert Error:', error);
      return {
        success: false,
        error: `Error al registrar: ${error.message}`,
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Action Exception:', err);
    return {
      success: false,
      error: 'Ocurrió un error inesperado en el servidor.',
    };
  }
}
