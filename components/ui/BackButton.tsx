'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BackButtonProps {
  href: string
  label: string
  className?: string
}

/**
 * BackButton Component - Reusable back navigation button
 * Features: Smooth animations, responsive design, government theme
 */
export default function BackButton({ href, label, className = '' }: BackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`mb-6 ${className}`}
    >
      <Link href={href}>
        <motion.button
          whileHover={{ 
            scale: 1.05,
            backgroundColor: '#e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-gray-700 hover:text-gray-900 font-medium w-full sm:w-auto justify-center sm:justify-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{label}</span>
        </motion.button>
      </Link>
    </motion.div>
  )
}













