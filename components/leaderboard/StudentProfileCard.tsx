'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Target } from 'lucide-react'

interface Student {
  id: number
  name: string
  school: string
  xp: number
  badges: string[]
  rank: number
}

interface StudentProfileCardProps {
  student: Student
}

export function StudentProfileCard({ student }: StudentProfileCardProps) {
  const nextRankXP = Math.ceil(student.xp / 1000) * 1000
  const currentRankXP = Math.floor(student.xp / 1000) * 1000
  const progress = ((student.xp - currentRankXP) / (nextRankXP - currentRankXP)) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{student.name}</h3>
            <p className="text-indigo-100">{student.school}</p>
          </div>
        </div>

        {/* Rank and XP */}
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Your Position</span>
            </div>
            <div className="text-3xl font-bold text-yellow-300">
              #{student.rank}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">Total XP</span>
            </div>
            <div className="text-3xl font-bold text-green-300">
              {student.xp.toLocaleString()}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-medium">Badges Earned</span>
            </div>
            <div className="text-3xl font-bold text-blue-300">
              {student.badges.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress to next rank</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-indigo-200">
          <span>{currentRankXP.toLocaleString()} XP</span>
          <span>{nextRankXP.toLocaleString()} XP</span>
        </div>
      </div>
    </motion.div>
  )
}

