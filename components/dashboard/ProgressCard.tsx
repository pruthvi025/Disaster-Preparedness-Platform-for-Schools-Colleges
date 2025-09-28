'use client'

import { motion } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Award, 
  Zap, 
  Heart, 
  MapPin, 
  Flame, 
  Shield, 
  BookOpen, 
  Lock,
  Target,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'

export interface Badge {
  id: string
  name: string
  icon: React.ReactNode
  earned: boolean
  rarity: 'bronze' | 'silver' | 'gold' | 'diamond'
  xpRequired: number
  description: string
}

interface ProgressCardProps {
  xp: number
  maxXp: number
  level: number
  badges: Badge[]
}

/**
 * ProgressCard Component - Shows student's XP progress and earned badges
 * Features: Animated XP bar, badge collection, level display
 */
export default function ProgressCard({ xp, maxXp, level, badges }: ProgressCardProps) {
  const progressPercentage = (xp / maxXp) * 100

  // Get next badge to unlock
  const nextBadge = badges
    .filter(badge => !badge.earned)
    .sort((a, b) => a.xpRequired - b.xpRequired)[0]

  // Badge styling based on rarity
  const getBadgeStyle = (badge: Badge) => {
    const baseStyle = "w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
    
    if (!badge.earned) {
      return `${baseStyle} bg-gray-200 border-2 border-gray-300 opacity-60`
    }

    switch (badge.rarity) {
      case 'bronze':
        return `${baseStyle} bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-2 border-amber-300 shadow-lg shadow-amber-300/50`
      case 'silver':
        return `${baseStyle} bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 border-2 border-gray-200 shadow-lg shadow-gray-300/50`
      case 'gold':
        return `${baseStyle} bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-2 border-yellow-300 shadow-lg shadow-yellow-300/50`
      case 'diamond':
        return `${baseStyle} bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 border-2 border-cyan-200 shadow-lg shadow-purple-300/50`
      default:
        return `${baseStyle} bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-indigo-300 shadow-lg shadow-indigo-300/50`
    }
  }

  const getIconStyle = (badge: Badge) => {
    if (!badge.earned) {
      return "w-8 h-8 text-gray-500"
    }
    return "w-8 h-8 text-white drop-shadow-sm"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
        <div className="flex items-center gap-2 text-indigo-600">
          <Trophy className="w-5 h-5" />
          <span className="font-medium">Level {level}</span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Experience Points</span>
          <span>{xp} / {maxXp} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full relative"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white opacity-30 rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Next Badge Progress */}
      {nextBadge && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-800">Next Badge Unlocks at</span>
            <span className="text-sm font-bold text-purple-900">{nextBadge.xpRequired} XP</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((xp / nextBadge.xpRequired) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          </div>
          <p className="text-xs text-purple-700 mt-1">{nextBadge.name}</p>
        </div>
      )}

      {/* Badges Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Badge Collection
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ 
                scale: badge.earned ? 1.05 : 1,
                y: badge.earned ? -2 : 0
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Badge Container */}
              <div className="relative mb-3">
                <motion.div
                  className={getBadgeStyle(badge)}
                  whileHover={badge.earned ? { 
                    boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)" 
                  } : {}}
                >
                  {/* Shine effect for earned badges */}
                  {badge.earned && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{ x: [-100, 100] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Lock icon for locked badges */}
                  {!badge.earned && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  {/* Badge Icon */}
                  <div className={getIconStyle(badge)}>
                    {badge.icon}
                  </div>
                </motion.div>
                
                {/* Rarity indicator */}
                {badge.earned && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
                    {badge.rarity === 'bronze' && '🥉'}
                    {badge.rarity === 'silver' && '🥈'}
                    {badge.rarity === 'gold' && '🥇'}
                    {badge.rarity === 'diamond' && '💎'}
                  </div>
                )}
              </div>
              
              {/* Badge Name */}
              <span className={`
                text-xs text-center font-medium max-w-20
                ${badge.earned 
                  ? 'text-gray-900 group-hover:text-purple-700' 
                  : 'text-gray-500'
                }
              `}>
                {badge.name}
              </span>
              
              {/* XP Required */}
              <span className="text-xs text-gray-400 mt-1">
                {badge.xpRequired} XP
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
