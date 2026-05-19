import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Return a mock object during builds/prerendering when env variables aren't injected.
    // This allows static page compilation (like next build) to finish without throwing.
    return {
      auth: {
        signInWithPassword: async () => ({ data: {}, error: null }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => ({ data: null, error: null }),
          }),
        }),
        update: () => ({
          eq: () => ({ data: null, error: null }),
        }),
      }),
    } as any;
  }

  return createBrowserClient<Database>(url, anonKey);
}
