'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

/**
 * Reusable Button component with consistent styling and animations
 * Features: Multiple variants, sizes, loading states, hover effects
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    className = '', 
    children, 
    disabled,
    ...props 
  }, ref) => {
    // Filter out conflicting props between React and Framer Motion
    const { onAnimationStart, onAnimationEnd, onDragStart, onDragEnd, onDrag, ...motionProps } = props
    const baseClasses = `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `
    
    const variantClasses = {
      primary: `
        bg-indigo-600 text-white hover:bg-indigo-700 
        focus:ring-indigo-500 shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-gray-100 text-gray-700 hover:bg-gray-200 
        focus:ring-gray-500 shadow-sm hover:shadow-md
      `,
      outline: `
        border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
        focus:ring-indigo-500 shadow-sm hover:shadow-md
      `
    }
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    
    return (
      <motion.button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...motionProps}
      >
        {loading && (
          <motion.svg
            className="w-5 h-5 mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
