'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Lock, Play, Clock } from 'lucide-react'

type MissionStatus = 'locked' | 'available' | 'completed'

interface MissionCardProps {
  id: string
  title: string
  description: string
  status: MissionStatus
  xpReward: number
  estimatedTime: string
  icon: React.ReactNode
}

/**
 * MissionCard Component - Displays individual mission with status and rewards
 * Features: Status indicators, XP rewards, time estimates, interactive states
 */
export default function MissionCard({ 
  id, 
  title, 
  description, 
  status, 
  xpReward, 
  estimatedTime, 
  icon 
}: MissionCardProps) {
  const statusConfig = {
    locked: {
      icon: Lock,
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      buttonText: 'Locked',
      buttonClass: 'bg-gray-100 text-gray-400 cursor-not-allowed'
    },
    available: {
      icon: Play,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      buttonText: 'Start Mission',
      buttonClass: 'bg-indigo-600 text-white hover:bg-indigo-700'
    },
    completed: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      buttonText: 'Completed',
      buttonClass: 'bg-green-100 text-green-600 cursor-default'
    }
  }

  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2 }}
      className={`
        bg-white rounded-2xl shadow-sm border ${config.borderColor} p-6
        transition-all duration-200 hover:shadow-md
        ${status === 'locked' ? 'opacity-75' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`
            w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center
          `}>
            <div className={config.color}>
              {icon}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <StatusIcon className={`w-6 h-6 ${config.color}`} />
      </div>

      {/* Mission Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={status === 'available' ? { scale: 1.02 } : {}}
        whileTap={status === 'available' ? { scale: 0.98 } : {}}
        disabled={status !== 'available'}
        className={`
          w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
          ${config.buttonClass}
        `}
      >
        {config.buttonText}
      </motion.button>
    </motion.div>
  )
}

// Import Star icon for XP display
import { Star } from 'lucide-react'
