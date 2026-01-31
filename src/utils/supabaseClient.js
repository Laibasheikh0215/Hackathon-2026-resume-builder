import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xjuxtcwdlhmrrgtkmujz.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdXh0Y3dkbGhtcnJndGttdWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDAzMDQsImV4cCI6MjA4NTM3NjMwNH0.nWYsT_GjPxxS6qGu-XsNTYzXKWaCy6bc_258jCReu7Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})