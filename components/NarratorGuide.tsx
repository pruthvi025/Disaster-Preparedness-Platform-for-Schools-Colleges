"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { Send } from 'lucide-react'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function useInitialHint(pathname: string | null): string {
  if (!pathname) return '👋 Welcome back!'
  if (pathname === '/' || pathname.startsWith('/app') || pathname.includes('login')) {
    return '🌍 Today’s mission is Disaster Survival Basics.'
  }
  if (pathname.includes('/student/dashboard')) {
    return '🔥 Keep building streaks to unlock badges.'
  }
  if (pathname.includes('/training') || pathname.includes('/quiz') || pathname.includes('/story-missions')) {
    return '💡 Hint: Remember your evacuation steps.'
  }
  if (pathname.includes('/leaderboard')) {
    return '🏆 You’re climbing the ranks, keep it up!'
  }
  return '👋 Welcome back!'
}

export default function NarratorGuide() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sessionId, setSessionId] = useState<string>('')

  const hint = useInitialHint(pathname)

  // Initialize with a system greeting once
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length > 0) return prev
      return [
        { id: 'welcome', role: 'assistant', content: `Sarthi AI: ${hint}` },
      ]
    })
  }, [hint])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  // Ensure we have a persistent session id for n8n
  useEffect(() => {
    try {
      const key = 'narrator_session_id'
      let sid = localStorage.getItem(key) || ''
      if (!sid) {
        sid = crypto.randomUUID()
        localStorage.setItem(key, sid)
      }
      setSessionId(sid)
    } catch {}
  }, [])

  const quickActions = useMemo(
    () => [
      { label: '📘 Learn', action: () => router.push('/student/learning-path') },
      { label: '🎮 Start Challenge', action: () => router.push('/student/training-arena') },
      { label: '🛡 Safety Tips', action: () => setInput('Give me top 5 campus safety tips') },
    ], [router]
  )

  async function sendMessage(prompt?: string) {
    const text = (prompt ?? input).trim()
    if (!text) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setIsLoading(true)
    try {
      const payload = {
        messages: [
          { role: 'system', content: 'You are Sarthi AI, a friendly, concise tutor and game master for disaster preparedness. Be encouraging, actionable, and contextual to school students.' },
          ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: text },
        ],
        sessionId,
        query: text,
      }

      const res = await fetch('/api/narrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const detail = await res.text().catch(() => '')
        throw new Error(detail || 'Request failed')
      }
      const data = await res.json()
      const content: string = data?.content ?? 'Sorry, I could not generate a response.'
      const aiMsg: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content }
      setMessages((m) => [...m, aiMsg])
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'I ran into an issue reaching the AI service.'
      const aiMsg: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: msg }
      setMessages((m) => [...m, aiMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Tooltip bubble when closed */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-2 max-w-[220px] rounded-xl bg-white/90 px-3 py-2 text-sm shadow-lg ring-1 ring-black/5 backdrop-blur"
          >
            {hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="relative h-14 w-14 rounded-full shadow-xl ring-1 ring-white/20 focus:outline-none"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
        <span className="absolute inset-0 rounded-full shadow-[0_0_30px_8px_rgba(236,72,153,0.35)]" />
        <span className="absolute inset-0 animate-pulse rounded-full bg-white/0" />
      </motion.button>

      {/* Full-height side panel + backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="fixed z-50 top-0 right-0 h-screen w-full sm:w-[400px] rounded-none sm:rounded-l-xl bg-white shadow-2xl ring-1 ring-black/10 flex flex-col overflow-hidden"
            >
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <div className="h-8 w-8 rounded-full bg-white/20 ring-1 ring-white/30" />
              <div className="flex-1">
                <div className="text-sm font-semibold">Sarthi AI</div>
                <div className="text-xs opacity-90">Here to help you navigate</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-xs bg-white/20 hover:bg-white/30"
              >
                Close
              </button>
            </div>

            {/* History */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow ${
                      m.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-xs text-gray-500 px-1">AI is thinking…</div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 px-3 pb-2 flex-wrap">
              {quickActions.map((qa) => (
                <button
                  key={qa.label}
                  onClick={qa.action}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs shadow hover:bg-gray-50"
                >
                  {qa.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void sendMessage()
              }}
              className="flex items-center gap-2 p-3 border-t border-gray-200"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-purple-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


