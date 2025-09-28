'use client'

import { motion } from 'framer-motion'

interface ColorPickerProps {
  label: string
  selectedColor: string
  onColorChange: (color: string) => void
  colors: Array<{
    name: string
    value: string
    bgClass: string
    textClass: string
  }>
}

/**
 * ColorPicker Component - Interactive color selection with Tailwind color palette
 * Features: Color chips, selection feedback, smooth animations
 */
export default function ColorPicker({ 
  label, 
  selectedColor, 
  onColorChange, 
  colors 
}: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <motion.button
            key={color.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onColorChange(color.value)}
            className={`
              w-10 h-10 rounded-full border-2 transition-all duration-200
              ${color.bgClass}
              ${selectedColor === color.value 
                ? 'border-gray-800 shadow-lg ring-2 ring-indigo-500 ring-offset-2' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            title={color.name}
          >
            {selectedColor === color.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
