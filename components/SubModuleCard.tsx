'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface SubModuleCardProps {
  title: string
  description: string
  status: 'Active' | 'Coming Soon'
  icon: ReactNode
  progress?: number
  href: string
  className?: string
}

/**
 * SubModuleCard Component - Reusable card for training sub-modules
 * Features: Status-based styling, progress tracking, smooth animations
 */
export default function SubModuleCard({
  title,
  description,
  status,
  icon,
  progress = 0,
  href,
  className = ""
}: SubModuleCardProps) {
  const isActive = status === 'Active'
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
          : 'bg-gradient-to-br from-gray-400 to-gray-500'
      } ${className}`}
    >
      <Link href={isActive ? href : '#'} className="block p-6">
        {/* Progress Ring */}
        {isActive && progress > 0 && (
          <div className="absolute top-4 right-4">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${progress}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isActive ? 'bg-white/20' : 'bg-white/10'
          }`}>
            <div className={`w-8 h-8 ${isActive ? 'text-white' : 'text-white/60'}`}>
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className={`text-xl font-bold mb-2 ${
            isActive ? 'text-white' : 'text-white/80'
          }`}>
            {title}
          </h3>
          <p className={`text-sm mb-4 ${
            isActive ? 'text-white/90' : 'text-white/60'
          }`}>
            {description}
          </p>

          {/* Status Badge */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isActive 
              ? 'bg-white/20 text-white' 
              : 'bg-yellow-300/20 text-yellow-100'
          }`}>
            {isActive ? 'Active' : 'Coming Soon'}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-4 inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
              isActive
                ? 'bg-white text-indigo-600 hover:bg-white/90'
                : 'bg-white/20 text-white/60 cursor-not-allowed'
            }`}
            aria-label={isActive ? `Open ${title}` : `${title} is locked`}
          >
            {isActive ? 'Open' : 'Coming Soon'}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

