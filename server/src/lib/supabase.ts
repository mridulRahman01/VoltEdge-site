import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://sndkoybfkfytzvrgnzzu.supabase.co';

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZGtveWJma2Z5dHp2cmduenp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MDE1MjQsImV4cCI6MjEwMDI3NzUyNH0.H8Cf0c3Wk70nu_4G6iZvMrfrYf4nLqxprv21r4KMA38';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
