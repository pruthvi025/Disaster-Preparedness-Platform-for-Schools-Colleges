'use client'

import { motion } from 'framer-motion'
import { Star, Trophy, Zap } from 'lucide-react'

interface XPCardProps {
  currentXP: number
  level: number
  xpToNextLevel: number
  totalXP: number
  className?: string
}

/**
 * XPCard Component - XP progress and level display
 * Features: Level indicator, XP progress bar, achievement badges
 */
export default function XPCard({ 
  currentXP, 
  level, 
  xpToNextLevel, 
  totalXP,
  className = ''
}: XPCardProps) {
  const progressPercentage = (currentXP / xpToNextLevel) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="w-6 h-6" />
          </motion.div>
          <h3 className="text-lg font-bold">XP Progress</h3>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold">Level {level}</div>
          <div className="text-sm opacity-90">{totalXP} total XP</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Current: {currentXP} XP</span>
          <span>Next Level: {xpToNextLevel} XP</span>
        </div>
        
        <div className="bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white rounded-full h-3 relative"
          >
            <motion.div
              animate={{ 
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* XP to Next Level */}
      <div className="text-center">
        <div className="text-sm opacity-90 mb-2">
          {xpToNextLevel - currentXP} XP to next level
        </div>
        
        {/* Achievement Badges */}
        <div className="flex justify-center gap-2">
          {level >= 5 && (
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <Trophy className="w-4 h-4" />
            </motion.div>
          )}
          
          {level >= 10 && (
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <Zap className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
