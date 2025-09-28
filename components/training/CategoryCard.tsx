'use client'

import { motion } from 'framer-motion'
import { Play, Lock, CheckCircle } from 'lucide-react'
import ProgressRing from './ProgressRing'
import Button from '@/components/ui/Button'

interface CategoryCardProps {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  progress: number
  isLocked: boolean
  isCompleted: boolean
  onStartQuiz: (categoryId: string) => void
}

/**
 * CategoryCard Component - Training category display with progress
 * Features: Progress ring, lock states, completion status, start quiz action
 */
export default function CategoryCard({
  id,
  title,
  description,
  icon,
  progress,
  isLocked,
  isCompleted,
  onStartQuiz
}: CategoryCardProps) {
  const getProgressColor = () => {
    if (isLocked) return 'gray'
    if (isCompleted) return 'green'
    if (progress > 0) return 'yellow'
    return 'blue'
  }

  const getStatusIcon = () => {
    if (isLocked) return <Lock className="w-5 h-5 text-gray-400" />
    if (isCompleted) return <CheckCircle className="w-5 h-5 text-green-500" />
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: isLocked ? 1 : 1.02,
        y: isLocked ? 0 : -5
      }}
      transition={{ duration: 0.3 }}
      className={`
        relative bg-white rounded-2xl shadow-lg border-2 p-6 transition-all duration-300
        ${isLocked 
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
          : 'border-transparent hover:border-indigo-200 hover:shadow-xl'
        }
      `}
    >
      {/* Status Icon */}
      {getStatusIcon() && (
        <div className="absolute top-4 right-4">
          {getStatusIcon()}
        </div>
      )}

      {/* Icon */}
      <motion.div
        animate={{ 
          rotate: isLocked ? 0 : [0, 5, -5, 0],
          scale: isLocked ? 1 : [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: isLocked ? 0 : Infinity,
          ease: "easeInOut"
        }}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto
          ${isLocked 
            ? 'bg-gray-200' 
            : isCompleted 
              ? 'bg-green-100' 
              : 'bg-indigo-100'
          }
        `}
      >
        <div className={`
          ${isLocked ? 'text-gray-400' : isCompleted ? 'text-green-600' : 'text-indigo-600'}
        `}>
          {icon}
        </div>
      </motion.div>

      {/* Content */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-6">
        <ProgressRing
          progress={progress}
          size="md"
          color={getProgressColor()}
          showPercentage={!isLocked}
        />
      </div>

      {/* Status Text */}
      <div className="text-center mb-4">
        {isLocked ? (
          <p className="text-sm text-gray-500">Complete previous levels to unlock</p>
        ) : isCompleted ? (
          <p className="text-sm text-green-600 font-medium">✓ Completed!</p>
        ) : progress > 0 ? (
          <p className="text-sm text-yellow-600 font-medium">In Progress</p>
        ) : (
          <p className="text-sm text-blue-600 font-medium">Ready to Start</p>
        )}
      </div>

      {/* Start Quiz Button */}
      <Button
        variant={isLocked ? "secondary" : "primary"}
        size="lg"
        onClick={() => !isLocked && onStartQuiz(id)}
        disabled={isLocked}
        className={`
          w-full flex items-center justify-center gap-2
          ${isLocked 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : isCompleted
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-indigo-500 hover:bg-indigo-600'
          }
        `}
      >
        {isLocked ? (
          <>
            <Lock className="w-4 h-4" />
            Locked
          </>
        ) : isCompleted ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Review Quiz
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Start Quiz
          </>
        )}
      </Button>
    </motion.div>
  )
}
