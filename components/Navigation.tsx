'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoginModal from '@/components/LoginModal'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/student/dashboard')
  const bgClass = isDashboard
    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400'
    : pathname === '/' || pathname === '/home'
      ? 'bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 border-b border-white/10'
      : 'bg-gray-900'
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-login', handler as EventListener)
    return () => window.removeEventListener('open-login', handler as EventListener)
  }, [])
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full relative text-white transition-colors duration-500 ease-in-out`}
    >
      <div className={`absolute inset-0 -z-10 ${bgClass}`} />
      {/* Scrolling motivational ticker behind navbar items */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" style={{ ['--duration' as any]: '36s' }}>
        <div className="w-full h-full relative">
          {/* semi-transparent strip for readability */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="animate-navTicker absolute inset-0 font-semibold text-white [text-shadow:0_0_6px_rgba(255,255,255,0.8)] opacity-85" style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
            <div className="ticker-inner">
              <div className="ticker-track">
              <span className="mx-8">Be prepared today, to save lives tomorrow.</span>
              <span className="mx-8">Every student is a hero when prepared.</span>
              <span className="mx-8">Disaster readiness starts with knowledge.</span>
              <span className="mx-8">Learn. Prepare. Respond. Survive.</span>
              <span className="mx-8">Your safety is your power!</span>
              <span className="mx-8">Your training today is someone’s hope tomorrow.</span>
              <span className="mx-8">Prepared minds build resilient communities.</span>
              <span className="mx-8">Small steps in preparedness create big impacts in safety.</span>
              <span className="mx-8">Safety is not luck — it’s preparation.</span>
              <span className="mx-8">In disasters, knowledge is your strongest shield.</span>
              <span className="mx-8">Be the leader who stays calm when it matters most.</span>
              </div>
              <div className="ticker-track" aria-hidden="true">
                <span className="mx-8">Be prepared today, to save lives tomorrow.</span>
                <span className="mx-8">Every student is a hero when prepared.</span>
                <span className="mx-8">Disaster readiness starts with knowledge.</span>
                <span className="mx-8">Learn. Prepare. Respond. Survive.</span>
                <span className="mx-8">Your safety is your power!</span>
                <span className="mx-8">Your training today is someone’s hope tomorrow.</span>
                <span className="mx-8">Prepared minds build resilient communities.</span>
                <span className="mx-8">Small steps in preparedness create big impacts in safety.</span>
                <span className="mx-8">Safety is not luck — it’s preparation.</span>
                <span className="mx-8">In disasters, knowledge is your strongest shield.</span>
                <span className="mx-8">Be the leader who stays calm when it matters most.</span>
          </div>
        </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16 relative">
          {/* Right side - Navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-full text-white font-medium shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition transform hover:scale-105 ring-1 ring-white/15">
                Home
              </motion.span>
            </Link>
            <Link href="/student/dashboard">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-full text-white font-medium shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition transform hover:scale-105 ring-1 ring-white/15">
                Dashboard
              </motion.span>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open Login"
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-full text-white font-medium shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition transform hover:scale-105 ring-1 ring-white/15"
            >
              Login
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-end w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(true)}
              aria-label="Open Login"
              className="px-4 py-2 rounded-full text-white font-medium shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition transform hover:scale-105 ring-1 ring-white/15"
            >
              Menu
            </motion.button>
          </div>
        </div>
      </div>
      <LoginModal open={open} onClose={() => setOpen(false)} />

      <style jsx>{`
        .animate-navTicker {
          position: absolute;
          top: 56%;
          left: 0;
          transform: translateY(-50%);
          font-size: 14px;
          width: 100%;
        }
        .ticker-inner { display: flex; width: max-content; animation: tickerScroll var(--duration) linear infinite; will-change: transform; }
        .ticker-track { display: inline-flex; white-space: nowrap; }
        @keyframes tickerScroll { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        @media (min-width: 768px) {
          .animate-navTicker { font-size: 16px; }
          :global(.animate-navTicker) { --duration: 32s; }
        }
        @media (min-width: 1024px) {
          .animate-navTicker { font-size: 18px; }
          :global(.animate-navTicker) { --duration: 36s; }
        }
        /* On small screens, place ticker below navbar */
        @media (max-width: 767px) {
          .animate-navTicker { top: 115%; }
        }
      `}</style>
    </motion.nav>
  )
}
