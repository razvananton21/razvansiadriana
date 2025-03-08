import { createClient } from '@supabase/supabase-js';

// These will be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log the Supabase URL and key (without showing the full key for security)
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key available:', supabaseAnonKey ? 'Yes (starts with ' + supabaseAnonKey.substring(0, 5) + '...)' : 'No');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please check your .env.local file.');
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 