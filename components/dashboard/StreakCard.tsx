'use client'

import { motion } from 'framer-motion'
import { Flame, Calendar, Target } from 'lucide-react'

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
  weeklyGoal: number
  weeklyProgress: number
}

/**
 * StreakCard Component - Shows daily learning streak and weekly progress
 * Features: Animated flame icon, streak counter, weekly goal progress
 */
export default function StreakCard({ 
  currentStreak, 
  longestStreak, 
  weeklyGoal, 
  weeklyProgress 
}: StreakCardProps) {
  const weeklyPercentage = (weeklyProgress / weeklyGoal) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Daily Streak</h3>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-orange-500"
        >
          <Flame className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Current Streak */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-4xl font-bold text-orange-600 mb-2"
        >
          {currentStreak}
        </motion.div>
        <p className="text-sm text-gray-600">Days in a row</p>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="w-4 h-4" />
            <span>Best Streak</span>
          </div>
          <span className="font-medium text-gray-900">{longestStreak} days</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>This Week</span>
          </div>
          <span className="font-medium text-gray-900">{weeklyProgress}/{weeklyGoal}</span>
        </div>

        {/* Weekly Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weeklyPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-gray-500">
          {currentStreak >= 7 
            ? "🔥 You're on fire! Keep it up!" 
            : currentStreak >= 3 
            ? "Great progress! You're building momentum!"
            : "Start your learning streak today!"
          }
        </p>
      </motion.div>
    </motion.div>
  )
}
