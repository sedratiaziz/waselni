import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl) {
  console.warn('EXPO_PUBLIC_SUPABASE_URL is not set. Please add it to your .env file.');
}

if (!supabaseAnonKey) {
  console.warn('EXPO_PUBLIC_SUPABASE_ANON_KEY is not set. Please add it to your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});