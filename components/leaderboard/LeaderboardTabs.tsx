'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TabItem {
  id: string
  label: string
}

interface LeaderboardTabsProps {
  tabs?: TabItem[]
  activeId?: string
  onChange?: (id: string) => void
  className?: string
}

const defaultTabs: TabItem[] = [
  { id: 'overall', label: 'Overall' },
  { id: 'campus', label: 'Your Campus' },
  { id: 'friends', label: 'Friends' }
]

export function LeaderboardTabs({
  tabs = defaultTabs,
  activeId,
  onChange,
  className = ''
}: LeaderboardTabsProps) {
  const [current, setCurrent] = useState<string>(activeId || tabs[0]?.id)

  useEffect(() => {
    if (activeId && activeId !== current) setCurrent(activeId)
  }, [activeId])

  const handleSelect = (id: string) => {
    setCurrent(id)
    onChange?.(id)
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="inline-flex bg-white rounded-xl shadow-md p-1">
        {tabs.map((t) => {
          const isActive = current === t.id
          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive ? 'text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="lb-tab-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}












