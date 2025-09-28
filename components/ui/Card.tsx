'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

/**
 * Reusable Card component with consistent styling and animations
 * Features: Soft shadow, rounded corners, fade-in animation
 */
const Card = ({ children, className = '', animate = true }: CardProps) => {
  const cardContent = (
    <div className={`
      bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto
      ${className}
    `}>
      {children}
    </div>
  )

  if (!animate) return cardContent

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {cardContent}
    </motion.div>
  )
}

export default Card
