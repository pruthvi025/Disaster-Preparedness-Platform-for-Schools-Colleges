'use client'

import { motion } from 'framer-motion'
import { Crown, Medal, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface Student {
  id: number
  name: string
  school: string
  xp: number
  badges: string[]
  rank: number
}

interface BadgeData {
  [key: string]: {
    name: string
    icon: string
    color: string
  }
}

interface LeaderboardRowProps {
  student: Student
  index: number
  badgeData: BadgeData
  onBadgeHover: (badge: string | null) => void
}

export function LeaderboardRow({ student, index, badgeData, onBadgeHover }: LeaderboardRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500'
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400'
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-600'
      default:
        return index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className={`${getRankStyle(student.rank)} hover:shadow-md transition-all duration-200`}
    >
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-12 gap-4 items-center p-6">
        {/* Rank */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center gap-2">
            {getRankIcon(student.rank)}
            <span className="text-2xl font-bold text-gray-800">
              {student.rank}
            </span>
          </div>
        </div>

        {/* Student Name */}
        <div className="col-span-3">
          <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.school}</p>
        </div>

        {/* School */}
        <div className="col-span-4">
          <p className="text-gray-700">{student.school}</p>
        </div>

        {/* XP */}
        <div className="col-span-2 text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {student.xp.toLocaleString()} XP
          </div>
        </div>

        {/* Badges */}
        <div className="col-span-2 text-center">
          <div className="flex justify-center gap-1 flex-wrap">
            {student.badges.slice(0, 3).map((badge) => (
              <div
                key={badge}
                className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                onMouseEnter={() => onBadgeHover(badge)}
                onMouseLeave={() => onBadgeHover(null)}
              >
                {badgeData[badge]?.icon}
              </div>
            ))}
            {student.badges.length > 3 && (
              <div className="text-sm text-gray-500 font-medium">
                +{student.badges.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {getRankIcon(student.rank)}
              <span className="text-xl font-bold text-gray-800">
                {student.rank}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{student.name}</h3>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold inline-block">
                {student.xp.toLocaleString()} XP
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Expanded Mobile View */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 font-medium">School</p>
                <p className="text-gray-800">{student.school}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">Badges</p>
                <div className="flex gap-2 flex-wrap">
                  {student.badges.map((badge) => (
                    <div
                      key={badge}
                      className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                      onMouseEnter={() => onBadgeHover(badge)}
                      onMouseLeave={() => onBadgeHover(null)}
                    >
                      {badgeData[badge]?.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
































