'use client'

import Link from 'next/link'
import { Bell, User, Wand2, LifeBuoy, Rocket, Sparkles } from 'lucide-react'
import PunjabEmblem from '@/components/branding/PunjabEmblem'
import { useAuth } from '@/context/AuthContext'

export default function DashboardHeader() {
  const { user } = useAuth()

  return (
    <header className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Left: Government branding */}
          <div className="col-span-12 md:col-span-5 flex items-center gap-3">
            <PunjabEmblem size="md" />
            <div className="leading-tight">
              <p className="text-sm sm:text-base font-semibold">Government of Punjab</p>
              <p className="text-xs sm:text-sm opacity-90">Department of Higher Education</p>
            </div>
          </div>

          {/* Right: Title */}
          <div className="col-span-12 md:col-span-7 flex md:justify-end">
            <div className="text-right">
              <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-purple-100" style={{ textShadow: '0 0 12px rgba(255,255,255,0.45)' }}>
                Surakshya Sarthi
              </h1>
              <p className="text-xs sm:text-sm opacity-95">Disaster Preparedness Platform</p>
            </div>
          </div>
        </div>

        {/* Actions row */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-2">
            <Link href="/student/emergency" className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-sm font-medium">
              <LifeBuoy className="h-4 w-4" /> Emergency Contacts
            </Link>
            <Link href="/student/training" className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-sm font-medium">
              <Sparkles className="h-4 w-4" /> Training Arena
            </Link>
            <Link href="/student/innovation-hub" className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-sm font-medium">
              <Rocket className="h-4 w-4" /> Innovation Hub
            </Link>
            <Link href="/student/avatar" className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-sm font-medium">
              <Wand2 className="h-4 w-4" /> Customize Avatar
            </Link>
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <button aria-label="Notifications" className="rounded-full bg-white/15 hover:bg-white/25 p-2">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5">
              <div className="h-7 w-7 grid place-items-center rounded-full bg-white/30">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{user?.name || 'Student'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}



