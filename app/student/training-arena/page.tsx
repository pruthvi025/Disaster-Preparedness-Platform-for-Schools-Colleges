'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

import StudentNavbar from '@/components/dashboard/StudentNavbar'
import SubModuleCard from '@/components/SubModuleCard'
import { BackButton } from '@/components/ui'
import { trainingSubmodules } from '@/data/training/training-submodules'

/**
 * Training Arena Page - Story-Driven Missions Interface
 * Features: Interactive story missions for disaster preparedness training
 */
export default function TrainingArena() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-full">
      {/* Navigation */}
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />

      {/* Main Content */}
      <main className="w-full pt-20 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <BackButton href="/student/dashboard" label="Back to Dashboard" />
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto"
          >
            <span className="text-4xl">🎮</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mt-4 mb-2">
            🎮 Training Arena
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master disaster preparedness through interactive games
          </p>
        </motion.div>

        {/* Sub-Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {trainingSubmodules.map((mod, idx) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
            >
              <SubModuleCard
                title={mod.title}
                description={mod.description}
                status={mod.status}
                icon={mod.icon}
                progress={0}
                href={mod.href}
              />
            </motion.div>
          ))}
        </motion.div>
        </div>
      </main>
    </div>
  )
}