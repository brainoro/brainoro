import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const cleanSupabaseUrl = rawUrl
  .replace(/\/rest\/v1\/?/, '')
  .replace(/\/+$/, '');
export const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    cleanSupabaseUrl &&
    cleanSupabaseKey &&
    !cleanSupabaseUrl.includes('placeholder') &&
    cleanSupabaseUrl.startsWith('https://')
  );
};

// Singleton Supabase client instance with dynamic cache invalidation
export const supabase = createClient(
  cleanSupabaseUrl || 'https://placeholder.supabase.co',
  cleanSupabaseKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    },
  }
);
