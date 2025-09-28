'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react'
import Button from '@/components/ui/Button'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  categoryTitle: string
  questions: QuizQuestion[]
  onComplete: (score: number, totalQuestions: number) => void
}

/**
 * QuizModal Component - Interactive quiz interface
 * Features: Question display, answer selection, feedback, progress tracking
 */
export default function QuizModal({
  isOpen,
  onClose,
  categoryTitle,
  questions,
  onComplete
}: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    setShowFeedback(true)
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setIsQuizComplete(true)
      onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), questions.length)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setIsQuizComplete(false)
  }

  const getAnswerButtonClass = (answerIndex: number) => {
    if (!showFeedback) {
      return selectedAnswer === answerIndex
        ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
    }

    if (answerIndex === currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700'
    }
    
    if (answerIndex === selectedAnswer && answerIndex !== currentQuestion.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700'
    }

    return 'bg-gray-100 border-gray-300 text-gray-500'
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{categoryTitle} Quiz</h2>
                <p className="text-indigo-100">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-full h-2"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isQuizComplete ? (
              <>
                {/* Question */}
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {currentQuestion.question}
                  </h3>
                </motion.div>

                {/* Answer Options */}
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                      whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className={`
                        w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                        ${getAnswerButtonClass(index)}
                        ${!showFeedback ? 'cursor-pointer' : 'cursor-default'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold
                          ${selectedAnswer === index 
                            ? 'border-current bg-current text-white' 
                            : 'border-gray-300'
                          }
                        `}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium">{option}</span>
                        {showFeedback && index === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                        {showFeedback && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Feedback */}
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-gray-50 border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === currentQuestion.correctAnswer ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-green-700">Correct!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-red-700">Try again!</span>
                        </>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!showFeedback ? (
                    <Button
                      variant="primary"
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="flex-1"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleNextQuestion}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      {currentQuestionIndex < questions.length - 1 ? (
                        <>
                          Next Question
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        'Finish Quiz'
                      )}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* Quiz Complete */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
                <p className="text-gray-600 mb-4">
                  You scored {score} out of {questions.length} questions
                </p>
                
                <div className="text-3xl font-bold text-indigo-600 mb-6">
                  {Math.round((score / questions.length) * 100)}%
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleRestart}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake Quiz
                  </Button>
                  <Button
                    variant="primary"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
