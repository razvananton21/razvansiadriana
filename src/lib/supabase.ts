import { createClient } from '@supabase/supabase-js';

// These will be set in your .env.local file
const supabaseUrl = 'https://czdxtjupkhyoosodiqsa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6ZHh0anVwa2h5b29zb2RpcXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjM3MjQsImV4cCI6MjA1NjkzOTcyNH0.CfsxHVIH9F6e97WdzFSZC08kMn4RjeIXK7jEgxzmI6M';

// Log the Supabase URL and key (without showing the full key for security)
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key available:', supabaseAnonKey ? 'Yes (starts with ' + supabaseAnonKey.substring(0, 5) + '...)' : 'No');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please check your .env.local file.');
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 