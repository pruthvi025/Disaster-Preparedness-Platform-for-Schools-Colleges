'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FilterDropdownProps {
  filter: 'week' | 'month' | 'all'
  onFilterChange: (filter: 'week' | 'month' | 'all') => void
}

export function FilterDropdown({ filter, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const filterOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ] as const

  const currentFilter = filterOptions.find(option => option.value === filter)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
      >
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-gray-700">{currentFilter?.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="py-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onFilterChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    filter === option.value
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
































