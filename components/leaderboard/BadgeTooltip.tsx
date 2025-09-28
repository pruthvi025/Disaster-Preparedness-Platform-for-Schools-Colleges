'use client'

import { motion } from 'framer-motion'

interface Badge {
  name: string
  icon: string
  color: string
}

interface BadgeTooltipProps {
  badge: Badge
  onClose: () => void
}

export function BadgeTooltip({ badge, onClose }: BadgeTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50 max-w-xs"
      onMouseLeave={onClose}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{badge.icon}</div>
        <div>
          <h4 className="font-semibold text-gray-900">{badge.name}</h4>
          <p className="text-sm text-gray-600 mt-1">
            Earned for demonstrating expertise in this area of disaster preparedness.
          </p>
        </div>
      </div>
      
      {/* Arrow pointing up */}
      <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
    </motion.div>
  )
}
































