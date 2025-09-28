import { createClient } from '@supabase/supabase-js'

// Client for browser-side usage (anon key only). Do NOT expose service_role here.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Surface clear error in development; in production this will simply fail where used
  console.warn('Supabase env missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (error) {
      console.error('Supabase connection error:', error)
      return { success: false, error: error.message }
    }
    
    return { success: true, tables: data || [] }
  } catch (err) {
    console.error('Connection test failed:', err)
    return { success: false, error: err.message }
  }
}
