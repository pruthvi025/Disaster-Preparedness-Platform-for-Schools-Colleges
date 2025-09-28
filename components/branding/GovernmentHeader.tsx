'use client'

import PunjabEmblem from './PunjabEmblem'

export default function GovernmentHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 text-gray-900">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200" />
      <div className="w-full px-6 py-2">
        <div className="flex justify-between items-center gap-3">
          {/* Left: Punjab logo inside soft container */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/80 shadow-sm px-3 py-1 flex items-center">
              <PunjabEmblem size="md" />
            </div>
            <div className="leading-tight">
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Government of Punjab</h1>
              <p className="text-xs sm:text-sm text-gray-700">Department of Higher Education</p>
            </div>
          </div>

          {/* Right: Product title */}
          <div className="text-right">
            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 font-extrabold text-base sm:text-lg md:text-xl drop-shadow-[0_0_6px_rgba(139,92,246,0.35)]">Surakshya Sarthi</h2>
            <p className="text-[11px] sm:text-xs text-gray-800/80">Disaster Preparedness Platform</p>
          </div>
        </div>
      </div>
    </header>
  )
}
