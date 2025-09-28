import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase-server'

// Connectivity probe that doesn't require any pre-existing tables.
// We intentionally query a non-existent table: a 42P01 error indicates
// the request reached PostgREST with valid credentials (good sign).
// 401/403 indicate invalid keys or URL.
export async function GET() {
  try {
    const supabase = getServerSupabase()
    const { data, error, status } = await supabase
      .from('___health_probe_table___')
      .select('id')
      .limit(1)

    if (status === 401 || status === 403) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized: check NEXT_PUBLIC_SUPABASE_URL and keys' },
        { status: 500 },
      )
    }

    // Postgres error code 42P01 = undefined_table
    // If we see that (or any 406), it means auth and network worked.
    // supabase-js exposes error details as string; we just check presence.
    if (error) {
      const msg = String(error.message || error)
      // Treat common PostgREST messages for missing table as successful connectivity.
      if (
        msg.includes('42P01') ||
        status === 406 ||
        status === 404 ||
        msg.toLowerCase().includes('schema cache') ||
        msg.toLowerCase().includes('could not find the table')
      ) {
        return NextResponse.json({ ok: true, detail: 'Connected (probe passed)' }, { status: 200 })
      }
      return NextResponse.json({ ok: false, error: msg }, { status: 500 })
    }

    // If no error, connection is obviously fine.
    return NextResponse.json({ ok: true, sample: data }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}


