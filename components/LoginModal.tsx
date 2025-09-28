'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import RoleSelector from '@/components/auth/RoleSelector'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import DemoCredentials from '@/components/DemoCredentials'
import { useState } from 'react'

export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [role, setRole] = useState<'Student' | 'Teacher' | 'Admin'>('Student')
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Lock background scroll while modal is open
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [open])

  // Focus trap & autofocus first input
  useEffect(() => {
    if (!open) return
    const container = modalRef.current
    if (!container) return
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ))
    ;(focusable[0] || container).focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey) {
        if (active === first) { e.preventDefault(); last.focus() }
      } else {
        if (active === last) { e.preventDefault(); first.focus() }
      }
    }
    container.addEventListener('keydown', handleTab as any)
    return () => container.removeEventListener('keydown', handleTab as any)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="w-full max-w-lg md:max-w-xl rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-fuchsia-600 p-6 shadow-[0_20px_60px_rgba(88,28,135,0.45)] ring-1 ring-white/20 text-white max-h-[90vh] overflow-y-auto focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Authentication"
            onClick={(e)=>e.stopPropagation()}
            ref={modalRef}
          >
            <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-white/20 hover:bg-white/30">✕</button>

            <div className="flex items-center justify-between mb-4 pr-10">
              <div className="flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Welcome back</h2>
              </div>
              <div className="inline-flex rounded-lg bg-white/20 p-1">
                <button
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition ${tab==='login'?'bg-white text-indigo-700 shadow':'text-white/90 hover:text-white'}`}
                  onClick={()=>setTab('login')}
                >Login</button>
                <button
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition ${tab==='signup'?'bg-white text-indigo-700 shadow':'text-white/90 hover:text-white'}`}
                  onClick={()=>setTab('signup')}
                >Sign up</button>
              </div>
            </div>

            <RoleSelector role={role} onChange={setRole} />

            {/* Demo Credentials - only show for login */}
            {tab === 'login' && <DemoCredentials />}

            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {tab === 'login' ? (
                <LoginForm role={role === 'Admin' ? 'Teacher' : role} />
              ) : (
                <SignupForm role={role === 'Admin' ? 'Teacher' : role} />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}