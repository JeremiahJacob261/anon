import { createClient } from '@supabase/supabase-js'
const options = {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: { 'x-my-custom-header': 'my-app-name' },
    },
  }
const supabaseUrl = 'https://idopdrtglpbbmtnxcgsr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlkb3BkcnRnbHBiYm10bnhjZ3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1MDkzMzksImV4cCI6MjAwMDA4NTMzOX0.JQ4LLVicVFV_ijpPwou9KWXufpyyZe9j35otmosP9iU';
export const supabase = createClient(supabaseUrl, supabaseKey,{auth:{persistSession: false}})