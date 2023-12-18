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
const supabaseUrl = 'https://hnefhmxnthlskxmggirm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZWZobXhudGhsc2t4bWdnaXJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjgzMzkwMiwiZXhwIjoyMDE4NDA5OTAyfQ.kY_PoT1S6Yr8S3IbFnFfiw-M-v4fA9zy4rJaFJejskg';
export const supabase = createClient(supabaseUrl, supabaseKey,{auth:{persistSession: true}})
