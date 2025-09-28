'use client'

import { motion } from 'framer-motion'
import { User, Shield, Zap, Heart, MapPin } from 'lucide-react'

interface AvatarPreviewProps {
  bodyType: string
  hairStyle: string
  hairColor: string
  outfit: string
  outfitColor: string
  accessory: string
}

/**
 * AvatarPreview Component - Live preview of the student's avatar
 * Features: Animated preview, accessory display, character customization
 */
export default function AvatarPreview({ 
  bodyType, 
  hairStyle, 
  hairColor, 
  outfit, 
  outfitColor, 
  accessory 
}: AvatarPreviewProps) {
  const getAccessoryIcon = (accessory: string) => {
    switch (accessory) {
      case 'helmet':
        return <Shield className="w-8 h-8" />
      case 'flashlight':
        return <Zap className="w-8 h-8" />
      case 'first-aid':
        return <Heart className="w-8 h-8" />
      case 'map':
        return <MapPin className="w-8 h-8" />
      default:
        return null
    }
  }

  const getAccessoryColor = (accessory: string) => {
    switch (accessory) {
      case 'helmet':
        return 'text-yellow-500'
      case 'flashlight':
        return 'text-yellow-400'
      case 'first-aid':
        return 'text-red-500'
      case 'map':
        return 'text-blue-500'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 h-full"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Avatar</h3>
        <p className="text-sm text-gray-600">Preview your character</p>
      </div>

      {/* Avatar Display */}
      <div className="flex justify-center mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-48 h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-indigo-200"
        >
          {/* Character Base */}
          <div className="relative">
            {/* Head */}
            <motion.div
              animate={{ 
                y: [0, -2, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 bg-pink-200 rounded-full mb-2 relative"
            >
              {/* Hair */}
              <div 
                className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-8 rounded-full ${hairColor}`}
                style={{
                  clipPath: hairStyle === 'short' 
                    ? 'polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)'
                    : hairStyle === 'long'
                    ? 'polygon(10% 0%, 90% 0%, 85% 100%, 15% 100%)'
                    : 'polygon(30% 0%, 70% 0%, 60% 100%, 40% 100%)'
                }}
              />
              
              {/* Eyes */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
              
              {/* Smile */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-gray-800 rounded-full"></div>
            </motion.div>

            {/* Body */}
            <motion.div
              animate={{ 
                y: [0, 1, 0],
                rotate: [0, 0.5, -0.5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className={`w-12 h-16 rounded-lg ${outfitColor} relative`}
            >
              {/* Outfit Pattern */}
              <div className="absolute inset-2 border border-white/30 rounded"></div>
            </motion.div>

            {/* Accessory */}
            {accessory && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                className={`absolute -top-4 -right-2 ${getAccessoryColor(accessory)}`}
              >
                {getAccessoryIcon(accessory)}
              </motion.div>
            )}
          </div>

          {/* Floating particles for fun */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -top-4 right-0 w-1.5 h-1.5 bg-indigo-400 rounded-full"
          />
        </motion.div>
      </div>

      {/* Character Info */}
      <div className="text-center">
        <h4 className="font-semibold text-gray-900 mb-2">Disaster Prep Hero</h4>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
            {bodyType}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
            {hairStyle} hair
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
            {outfit}
          </span>
          {accessory && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
              {accessory}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
