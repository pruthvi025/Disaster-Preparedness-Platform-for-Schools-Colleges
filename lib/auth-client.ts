import { supabase } from '@/lib/supabase'

export async function signUpWithEmail(params: { 
  email: string; 
  password: string; 
  fullName?: string;
  role?: string;
  mobile?: string;
  age?: string;
  district?: string;
  udiseCode?: string;
  schoolName?: string;
  schoolCategory?: string;
  zone?: string;
}) {
  const { email, password, fullName, role, mobile, age, district, udiseCode, schoolName, schoolCategory, zone } = params
  
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: fullName,
        role: role || 'student',
        mobile,
        age,
        district,
        udise_code: udiseCode,
        school_name: schoolName,
        school_category: schoolCategory,
        zone
      }
    }
  })
  
  if (error) throw error

  const userId = data.user?.id
  if (userId) {
    // Ensure a profile row exists with role information
    await supabase.from('profiles').upsert(
      [{ 
        user_id: userId, 
        full_name: fullName || null,
        role: role || 'student',
        mobile: mobile || null,
        age: age || null,
        district: district || null,
        udise_code: udiseCode || null,
        school_name: schoolName || null,
        school_category: schoolCategory || null,
        zone: zone || null
      }],
      { onConflict: 'user_id' },
    )
  }
  return data
}

export async function signInWithEmail(params: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword(params)
  if (error) throw error
  return data
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}