'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowLeft, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

import StudentNavbar from '@/components/dashboard/StudentNavbar'
import GamePlayEngine from '@/components/GamePlayEngine'
import { BackButton } from '@/components/ui'
import { getMissionById } from '@/data/training/story-missions'

/**
 * Earthquake Mission Page - Interactive story mission for earthquake preparedness
 * Features: Mission briefing, gameplay engine, completion tracking
 */
export default function EarthquakeMissionPage() {
  const router = useRouter()
  const [gameStarted, setGameStarted] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  
  const mission = getMissionById('earthquake-1')

  if (!mission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mission Not Found</h1>
          <button
            onClick={() => router.push('/student/training-arena/story-missions')}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Back to Missions
          </button>
        </div>
      </div>
    )
  }

  const handleStartMission = () => {
    setGameStarted(true)
  }

  const handleMissionComplete = (points: number) => {
    setTotalPoints(points)
    // Here you would typically save progress to backend
    console.log(`Mission completed with ${points} points`)
  }

  const handleExitMission = () => {
    router.push('/student/training-arena/story-missions')
  }

  if (gameStarted) {
    return (
      <GamePlayEngine
        mission={mission}
        onComplete={handleMissionComplete}
        onExit={handleExitMission}
      />
    )
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackButton href="/student/training-arena/story-missions" label="Back to Missions" />
        
        {/* Mission Briefing */}
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
            className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-5xl">🌍</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            {mission.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {mission.intro}
          </p>
        </motion.div>

        {/* Mission Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mission Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Difficulty</h4>
                    <p className="text-sm text-gray-600">{mission.difficulty}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Steps</h4>
                    <p className="text-sm text-gray-600">{mission.steps.length} decision points</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Reward</h4>
                    <p className="text-sm text-gray-600">Up to {mission.xpReward} Survival Points</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {mission.description}
              </p>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Proper earthquake response techniques</li>
                  <li>• Safe evacuation procedures</li>
                  <li>• Emergency communication protocols</li>
                  <li>• Post-earthquake safety measures</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartMission}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold text-lg transition-all shadow-lg"
          >
            <Play className="w-6 h-6" />
            Begin Mission
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExitMission}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-all shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Missions
          </motion.button>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-blue-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Pro Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>• Read each scenario carefully before making decisions</div>
            <div>• Think about real-world safety principles</div>
            <div>• Learn from incorrect choices - they provide valuable feedback</div>
            <div>• Take your time - there's no rush in emergency preparedness</div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}













