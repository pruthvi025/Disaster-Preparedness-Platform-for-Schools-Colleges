'use client'

import { motion } from 'framer-motion'
import { BookOpen, Target, Zap } from 'lucide-react'

import StudentNavbar from '@/components/dashboard/StudentNavbar'
import { BackButton } from '@/components/ui'
import Link from 'next/link'
import { missions } from '@/data/training/story-missions'

/**
 * Story Missions Page - Landing page for story-driven training missions
 * Features: Mission selection, progress tracking, difficulty indicators
 */
export default function StoryMissionsPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackButton href="/student/training-arena" label="Back to Training Arena" />
        
        {/* Hero Banner */}
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
            className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📖 Story-Driven Missions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose wisely. Your survival depends on it!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{missions.length}</h3>
            <p className="text-sm text-gray-600">Available Missions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-sm text-gray-600">Survival Points</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">0%</h3>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
        </motion.div>

        {/* Missions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Available Missions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-indigo-200 hover:border-indigo-300 transition-all"
              >
                <Link href={mission.href} className="block p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-2xl">
                        {mission.title.includes('Earthquake') ? '🌍' :
                         mission.title.includes('Fire') ? '🔥' :
                         mission.title.includes('Flood') ? '🌊' :
                         mission.title.includes('Cyclone') ? '🌀' : '📖'}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{mission.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{mission.description}</p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        mission.difficulty.toLowerCase() === 'level 1' ? 'bg-green-100 text-green-800' :
                        mission.difficulty.toLowerCase() === 'level 2' ? 'bg-yellow-100 text-yellow-800' :
                        mission.difficulty.toLowerCase() === 'level 3' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {mission.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        +{mission.xpReward} XP
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      Start Mission
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">How Story Missions Work</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Read the Scenario</h4>
              <p className="text-sm text-gray-600">Experience realistic emergency situations through immersive storytelling.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Make Choices</h4>
              <p className="text-sm text-gray-600">Decide how to respond to each situation. Your choices matter!</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Earn Points</h4>
              <p className="text-sm text-gray-600">Get Survival Points for correct decisions and learn from mistakes.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

