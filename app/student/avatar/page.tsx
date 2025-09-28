'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sparkles, User, ArrowRight } from 'lucide-react'

import StudentNavbar from '@/components/dashboard/StudentNavbar'
import AvatarPreview from '@/components/avatar/AvatarPreview'
import AvatarControls from '@/components/avatar/AvatarControls'

/**
 * Avatar Creator Page - Playful character customization for students
 * Features: Live preview, customization controls, gamified UI
 */
export default function AvatarCreator() {
  const router = useRouter()
  
  // Avatar state
  const [avatar, setAvatar] = useState({
    bodyType: 'athletic',
    hairStyle: 'medium',
    hairColor: 'brown',
    outfit: 'uniform',
    outfitColor: 'blue',
    accessory: 'helmet'
  })

  const [isSaving, setIsSaving] = useState(false)

  // Update handlers
  const updateAvatar = (key: string, value: string) => {
    setAvatar(prev => ({ ...prev, [key]: value }))
  }

  const randomizeAvatar = () => {
    const bodyTypes = ['athletic', 'average', 'tall']
    const hairStyles = ['short', 'medium', 'long']
    const hairColors = ['black', 'brown', 'blonde', 'red', 'blue', 'purple', 'green', 'pink']
    const outfits = ['casual', 'uniform', 'sporty']
    const outfitColors = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'gray']
    const accessories = ['none', 'helmet', 'flashlight', 'first-aid', 'map']

    setAvatar({
      bodyType: bodyTypes[Math.floor(Math.random() * bodyTypes.length)],
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
      outfit: outfits[Math.floor(Math.random() * outfits.length)],
      outfitColor: outfitColors[Math.floor(Math.random() * outfitColors.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)]
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    // Navigate to dashboard
    router.push('/student/dashboard')
  }

  const handleBack = () => {
    router.push('/onboarding/profile-setup')
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Avatar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your character before starting missions. Make it unique and represent your disaster preparedness journey!
          </p>
        </motion.div>

        {/* Avatar Creator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Avatar Preview - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <AvatarPreview
              bodyType={avatar.bodyType}
              hairStyle={avatar.hairStyle}
              hairColor={avatar.hairColor}
              outfit={avatar.outfit}
              outfitColor={avatar.outfitColor}
              accessory={avatar.accessory}
            />
          </motion.div>

          {/* Customization Controls - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <AvatarControls
              bodyType={avatar.bodyType}
              hairStyle={avatar.hairStyle}
              hairColor={avatar.hairColor}
              outfit={avatar.outfit}
              outfitColor={avatar.outfitColor}
              accessory={avatar.accessory}
              onBodyTypeChange={(type) => updateAvatar('bodyType', type)}
              onHairStyleChange={(style) => updateAvatar('hairStyle', style)}
              onHairColorChange={(color) => updateAvatar('hairColor', color)}
              onOutfitChange={(outfit) => updateAvatar('outfit', outfit)}
              onOutfitColorChange={(color) => updateAvatar('outfitColor', color)}
              onAccessoryChange={(accessory) => updateAvatar('accessory', accessory)}
              onRandomize={randomizeAvatar}
              onSave={handleSave}
              onBack={handleBack}
            />
          </motion.div>
        </div>

        {/* Fun Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>Make it unique!</span>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, -3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full"
            >
              <ArrowRight className="w-4 h-4 text-indigo-500" />
              <span>Ready for missions!</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Overlay */}
        {isSaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white rounded-2xl p-8 text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Saving Avatar...</h3>
              <p className="text-gray-600">Creating your unique character!</p>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
