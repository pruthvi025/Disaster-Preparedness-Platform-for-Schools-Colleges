'use client'

import { motion } from 'framer-motion'

interface ProgressRingProps {
  progress: number // 0-100
  size?: 'sm' | 'md' | 'lg'
  color?: 'green' | 'yellow' | 'gray' | 'blue'
  showPercentage?: boolean
  className?: string
}

/**
 * ProgressRing Component - Circular progress indicator
 * Features: Animated progress, color-coded states, customizable sizes
 */
export default function ProgressRing({ 
  progress, 
  size = 'md', 
  color = 'green', 
  showPercentage = true,
  className = ''
}: ProgressRingProps) {
  const sizeConfig = {
    sm: { size: 60, strokeWidth: 4, fontSize: 'text-xs' },
    md: { size: 80, strokeWidth: 6, fontSize: 'text-sm' },
    lg: { size: 120, strokeWidth: 8, fontSize: 'text-lg' }
  }

  const colorConfig = {
    green: 'stroke-green-500',
    yellow: 'stroke-yellow-500',
    gray: 'stroke-gray-400',
    blue: 'stroke-blue-500'
  }

  const config = sizeConfig[size]
  const radius = (config.size - config.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={config.size}
        height={config.size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          fill="transparent"
          className={colorConfig[color]}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Percentage text */}
      {showPercentage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`absolute inset-0 flex items-center justify-center font-bold ${config.fontSize} text-gray-700`}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  )
}
