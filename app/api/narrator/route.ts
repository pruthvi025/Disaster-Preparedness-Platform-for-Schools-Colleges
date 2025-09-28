import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase-server'

// Direct OpenAI proxy with Supabase logging
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = Array.isArray(body?.messages) ? body.messages : []
    const sessionId: string | undefined = body?.sessionId
    const explicitQuery: string | undefined = body?.query
    const lastUser = [...messages].reverse().find((m: any) => m?.role === 'user')
    const query = (explicitQuery ?? lastUser?.content ?? '').toString()

    if (!query && messages.length === 0) {
      return NextResponse.json({ error: 'Invalid payload: query or messages[] required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Server not configured: missing OPENAI_API_KEY' }, { status: 500 })
    }

    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
    const model = body?.model || 'gpt-4o-mini'

    // Ensure we always send a valid messages array
    const chatMessages = messages.length > 0
      ? messages
      : [
          { role: 'system', content: 'You are the Surakshya Sarthi AI Guide.' },
          { role: 'user', content: query },
        ]

    const resp = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages: chatMessages, temperature: 0.7, stream: false }),
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      return NextResponse.json({ error: 'OpenAI request failed', detail: text || resp.statusText }, { status: 502 })
    }

    const data = await resp.json()
    const aiText: string = data?.choices?.[0]?.message?.content || ''

    // Best-effort logging
    try {
      const supabase = getServerSupabase()
      const q = query || (lastUser?.content ?? '')
      await supabase.from('student_queries').insert({ query: q, response: aiText, session_id: sessionId || '' })
    } catch {}

    return NextResponse.json({ content: aiText })
  } catch (err: any) {
    return NextResponse.json({ error: 'Unexpected error', detail: String(err?.message || err) }, { status: 500 })
  }
}


