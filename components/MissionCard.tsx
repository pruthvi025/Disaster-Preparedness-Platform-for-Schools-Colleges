'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Lock, CheckCircle } from 'lucide-react'

interface MissionCardProps {
  id: string
  title: string
  description: string
  difficulty: string
  status: 'available' | 'locked' | 'completed'
  progress?: number
  href: string
  className?: string
}

/**
 * MissionCard Component - Card for individual story missions
 * Features: Status-based styling, progress tracking, difficulty indicators
 */
export default function MissionCard({
  id,
  title,
  description,
  difficulty,
  status,
  progress = 0,
  href,
  className = ""
}: MissionCardProps) {
  const isAvailable = status === 'available'
  const isCompleted = status === 'completed'
  const isLocked = status === 'locked'

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'level 1':
        return 'bg-green-100 text-green-800'
      case 'level 2':
        return 'bg-yellow-100 text-yellow-800'
      case 'level 3':
        return 'bg-orange-100 text-orange-800'
      case 'level 4':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
        isAvailable 
          ? 'bg-white border-2 border-indigo-200 hover:border-indigo-300' 
          : isCompleted
          ? 'bg-white border-2 border-green-200 hover:border-green-300'
          : 'bg-gray-100 border-2 border-gray-200'
      } ${className}`}
    >
      <Link href={isAvailable || isCompleted ? href : '#'} className="block p-6">
        {/* Status Icon */}
        <div className="absolute top-4 right-4">
          {isCompleted && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
          {isLocked && (
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isCompleted && progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Mission Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isAvailable 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
              : isCompleted
              ? 'bg-gradient-to-br from-green-500 to-green-600'
              : 'bg-gradient-to-br from-gray-400 to-gray-500'
          }`}>
            <span className="text-2xl">
              {title.includes('Earthquake') ? '🌍' : 
               title.includes('Fire') ? '🔥' : 
               title.includes('Flood') ? '🌊' : '📖'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className={`text-xl font-bold mb-2 ${
            isLocked ? 'text-gray-500' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          
          <p className={`text-sm mb-4 ${
            isLocked ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>

          {/* Difficulty Badge */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            getDifficultyColor(difficulty)
          }`}>
            {difficulty}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isAvailable
                ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                : isCompleted
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            aria-label={
              isAvailable ? `Start ${title}` : 
              isCompleted ? `Replay ${title}` : 
              `${title} is locked`
            }
          >
            {isCompleted ? (
              <>
                <Play className="w-4 h-4" />
                Replay Mission
              </>
            ) : isAvailable ? (
              <>
                <Play className="w-4 h-4" />
                Start Mission
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Locked
              </>
            )}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}













