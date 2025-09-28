'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, Home, Zap } from 'lucide-react'
import { Mission, MissionStep, MissionChoice } from '@/data/training/story-missions'

interface GamePlayEngineProps {
  mission: Mission
  onComplete: (totalPoints: number) => void
  onExit: () => void
}

/**
 * GamePlayEngine Component - Handles interactive story mission gameplay
 * Features: Step-by-step progression, choice feedback, point tracking, animations
 */
export default function GamePlayEngine({ mission, onComplete, onExit }: GamePlayEngineProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<MissionChoice | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const currentMissionStep = mission.steps[currentStep]
  const progress = ((currentStep + 1) / mission.steps.length) * 100

  const handleChoiceSelect = (choice: MissionChoice) => {
    setSelectedChoice(choice)
    setShowFeedback(true)
    
    if (choice.correct) {
      setTotalPoints(prev => prev + 10)
    }
  }

  const handleNextStep = () => {
    setShowFeedback(false)
    setSelectedChoice(null)
    
    if (currentStep < mission.steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Mission completed
      setIsCompleted(true)
      setShowConfetti(true)
      setTimeout(() => {
        onComplete(totalPoints + (selectedChoice?.correct ? 10 : 0))
      }, 2000)
    }
  }

  const handleRetry = () => {
    setShowFeedback(false)
    setSelectedChoice(null)
  }

  const handlePlayAgain = () => {
    setCurrentStep(0)
    setTotalPoints(0)
    setSelectedChoice(null)
    setShowFeedback(false)
    setIsCompleted(false)
    setShowConfetti(false)
  }

  // Confetti animation
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          {/* Confetti */}
          <AnimatePresence>
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * window.innerWidth,
                      y: -10,
                      rotate: 0,
                      scale: 1
                    }}
                    animate={{ 
                      y: window.innerHeight + 10,
                      rotate: 360,
                      scale: 0
                    }}
                    transition={{ 
                      duration: 3,
                      delay: Math.random() * 0.5
                    }}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Mission Complete!
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">
            You survived the {mission.title}!
          </p>

          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-6">
            <div className="text-2xl font-bold text-green-600 mb-1">
              +{totalPoints} Survival Points
            </div>
            <div className="text-sm text-gray-600">
              Total XP Earned
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayAgain}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Missions
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Mission Progress</h3>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {mission.steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Mission Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          {/* Mission Icon */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🌍</span>
            </div>
          </div>

          {/* Narrative */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {mission.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentMissionStep.narrative}
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-4">
            {currentMissionStep.choices.map((choice, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !showFeedback && handleChoiceSelect(choice)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  showFeedback
                    ? choice.correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{choice.text}</span>
                  {showFeedback && selectedChoice === choice && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        choice.correct ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {choice.correct ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && selectedChoice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rounded-xl p-6 mb-6 ${
                selectedChoice.correct 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: selectedChoice.correct ? [0, 5, -5, 0] : [0, -5, 5, 0]
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedChoice.correct ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {selectedChoice.correct ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                </motion.div>
                
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 ${
                    selectedChoice.correct ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedChoice.correct ? 'Correct!' : 'Not quite right...'}
                  </h3>
                  <p className={`text-sm ${
                    selectedChoice.correct ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {selectedChoice.feedback}
                  </p>
                  
                  {selectedChoice.correct && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full"
                    >
                      <Zap className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        +10 Survival Points
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {showFeedback && (
          <div className="flex gap-4 justify-center">
            {!selectedChoice?.correct && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
            >
              {currentStep < mission.steps.length - 1 ? 'Next Step' : 'Complete Mission'}
            </motion.button>
          </div>
        )}

        {/* Points Display */}
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-900">{totalPoints}</span>
            <span className="text-sm text-gray-600">Survival Points</span>
          </div>
        </div>
      </div>
    </div>
  )
}
