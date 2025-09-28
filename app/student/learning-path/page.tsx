'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Shield, 
  Zap, 
  Heart, 
  MapPin, 
  Flame, 
  Award,
  Target,
  Users,
  Clock,
  Lock,
  CheckCircle,
  Play,
  ArrowRight,
  TrendingUp,
  Star
} from 'lucide-react'
import { GovernmentHeader, GovernmentFooter } from '@/components/branding'
import { BackButton } from '@/components/ui'

interface LearningStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: 'not-started' | 'in-progress' | 'completed' | 'locked'
  xpEarned: number
  totalXp: number
  estimatedTime: string
  category: 'foundation' | 'safety' | 'emergency' | 'advanced' | 'mastery'
  prerequisites?: string[]
  nextAction?: {
    label: string
    href: string
  }
}

export default function LearningPathPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const learningSteps: LearningStep[] = [
    {
      id: 'introduction',
      title: 'Introduction to Disaster Preparedness',
      description: 'Learn the fundamentals of disaster preparedness, understanding different types of disasters and basic safety principles.',
      icon: <BookOpen className="w-8 h-8" />,
      status: 'completed',
      xpEarned: 100,
      totalXp: 100,
      estimatedTime: '15 min',
      category: 'foundation',
      nextAction: {
        label: 'Review Module',
        href: '/student/training-arena'
      }
    },
    {
      id: 'earthquake-basics',
      title: 'Earthquake Survival Basics',
      description: 'Master essential earthquake survival techniques including drop, cover, and hold procedures.',
      icon: <Shield className="w-8 h-8" />,
      status: 'completed',
      xpEarned: 150,
      totalXp: 150,
      estimatedTime: '20 min',
      category: 'safety',
      nextAction: {
        label: 'Review Module',
        href: '/student/training-arena'
      }
    },
    {
      id: 'fire-safety',
      title: 'Fire Safety Essentials',
      description: 'Learn fire prevention, detection, and evacuation procedures for different fire scenarios.',
      icon: <Flame className="w-8 h-8" />,
      status: 'in-progress',
      xpEarned: 75,
      totalXp: 200,
      estimatedTime: '25 min',
      category: 'safety',
      nextAction: {
        label: 'Continue Learning',
        href: '/student/training-arena'
      }
    },
    {
      id: 'flood-evacuation',
      title: 'Flood Evacuation Training',
      description: 'Understand flood risks, evacuation routes, and safety measures during flood emergencies.',
      icon: <MapPin className="w-8 h-8" />,
      status: 'not-started',
      xpEarned: 0,
      totalXp: 180,
      estimatedTime: '30 min',
      category: 'emergency',
      prerequisites: ['fire-safety'],
      nextAction: {
        label: 'Start Learning',
        href: '/student/training-arena'
      }
    },
    {
      id: 'first-aid-contacts',
      title: 'First Aid & Emergency Contacts',
      description: 'Master basic first aid techniques and learn how to access emergency services effectively.',
      icon: <Heart className="w-8 h-8" />,
      status: 'not-started',
      xpEarned: 0,
      totalXp: 250,
      estimatedTime: '35 min',
      category: 'emergency',
      prerequisites: ['flood-evacuation'],
      nextAction: {
        label: 'Start Learning',
        href: '/student/training-arena'
      }
    },
    {
      id: 'advanced-simulation',
      title: 'Advanced Disaster Simulation',
      description: 'Participate in comprehensive disaster simulation scenarios to test your preparedness skills.',
      icon: <Award className="w-8 h-8" />,
      status: 'locked',
      xpEarned: 0,
      totalXp: 300,
      estimatedTime: '45 min',
      category: 'advanced',
      prerequisites: ['first-aid-contacts'],
      nextAction: {
        label: 'Unlock Prerequisites',
        href: '/student/training-arena'
      }
    },
    {
      id: 'team-leadership',
      title: 'Emergency Team Leadership',
      description: 'Learn to lead and coordinate groups during emergency situations and evacuation procedures.',
      icon: <Users className="w-8 h-8" />,
      status: 'locked',
      xpEarned: 0,
      totalXp: 400,
      estimatedTime: '50 min',
      category: 'mastery',
      prerequisites: ['advanced-simulation'],
      nextAction: {
        label: 'Unlock Prerequisites',
        href: '/student/training-arena'
      }
    },
    {
      id: 'disaster-champion',
      title: 'Disaster Preparedness Champion',
      description: 'Achieve mastery in all disaster preparedness categories and become a certified safety champion.',
      icon: <Star className="w-8 h-8" />,
      status: 'locked',
      xpEarned: 0,
      totalXp: 500,
      estimatedTime: '60 min',
      category: 'mastery',
      prerequisites: ['team-leadership'],
      nextAction: {
        label: 'Unlock Prerequisites',
        href: '/student/training-arena'
      }
    }
  ]

  const categories = [
    { id: 'all', name: 'All Steps', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'foundation', name: 'Foundation', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'safety', name: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'emergency', name: 'Emergency', icon: <Zap className="w-4 h-4" /> },
    { id: 'advanced', name: 'Advanced', icon: <Award className="w-4 h-4" /> },
    { id: 'mastery', name: 'Mastery', icon: <Star className="w-4 h-4" /> }
  ]

  const filteredSteps = selectedCategory === 'all' 
    ? learningSteps 
    : learningSteps.filter(step => step.category === selectedCategory)

  // Calculate progress
  const completedSteps = learningSteps.filter(step => step.status === 'completed').length
  const inProgressSteps = learningSteps.filter(step => step.status === 'in-progress').length
  const totalSteps = learningSteps.length
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100)

  const totalXpEarned = learningSteps.reduce((sum, step) => sum + step.xpEarned, 0)
  const totalXpPossible = learningSteps.reduce((sum, step) => sum + step.totalXp, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white'
      case 'in-progress':
        return 'bg-blue-500 text-white'
      case 'not-started':
        return 'bg-gray-100 text-gray-700'
      case 'locked':
        return 'bg-gray-200 text-gray-500'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6" />
      case 'in-progress':
        return <Play className="w-6 h-6" />
      case 'not-started':
        return <ArrowRight className="w-6 h-6" />
      case 'locked':
        return <Lock className="w-6 h-6" />
      default:
        return <ArrowRight className="w-6 h-6" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation':
        return 'from-blue-400 to-blue-600'
      case 'safety':
        return 'from-red-400 to-red-600'
      case 'emergency':
        return 'from-orange-400 to-orange-600'
      case 'advanced':
        return 'from-purple-400 to-purple-600'
      case 'mastery':
        return 'from-yellow-400 to-yellow-600'
      default:
        return 'from-indigo-400 to-indigo-600'
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackButton href="/student/dashboard" label="Back to Dashboard" />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📚 Learning Path
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow your personalized journey to master disaster preparedness skills step by step!
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Progress */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              </div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {progressPercentage}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {completedSteps} of {totalSteps} steps completed
              </p>
            </div>

            {/* XP Progress */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-600">XP Earned</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalXpEarned.toLocaleString()}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalXpEarned / totalXpPossible) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                of {totalXpPossible.toLocaleString()} total XP
              </p>
            </div>

            {/* Current Status */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">Current Status</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {inProgressSteps > 0 ? 'In Progress' : completedSteps === totalSteps ? 'Completed!' : 'Ready to Start'}
              </div>
              <p className="text-xs text-gray-500">
                {inProgressSteps > 0 
                  ? `${inProgressSteps} step${inProgressSteps > 1 ? 's' : ''} in progress`
                  : completedSteps === totalSteps 
                    ? 'All steps completed!'
                    : 'Ready to begin your journey'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Learning Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 hidden md:block"></div>

          <div className="space-y-8">
            {filteredSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-white border-4 border-indigo-500 rounded-full z-10 hidden md:block"></div>

                {/* Step Card */}
                <div className={`ml-0 md:ml-16 bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${
                  step.status === 'in-progress' 
                    ? 'border-blue-500 shadow-blue-200' 
                    : step.status === 'completed'
                      ? 'border-green-500 shadow-green-200'
                      : step.status === 'locked'
                        ? 'border-gray-200 opacity-75'
                        : 'border-gray-200'
                }`}>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          step.status === 'locked' 
                            ? 'bg-gray-200' 
                            : `bg-gradient-to-br ${getCategoryColor(step.category)}`
                        }`}>
                          <div className={`${
                            step.status === 'locked' ? 'text-gray-400' : 'text-white'
                          }`}>
                            {step.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${
                            step.status === 'locked' ? 'text-gray-500' : 'text-gray-900'
                          }`}>
                            {step.title}
                          </h3>
                          <p className={`text-sm ${
                            step.status === 'locked' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(step.status)}`}>
                          {step.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div className="text-2xl">
                          {getStatusIcon(step.status)}
                        </div>
                      </div>
                    </div>

                    {/* Progress and Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">XP Progress</div>
                        <div className="text-lg font-bold text-indigo-600">
                          {step.xpEarned}/{step.totalXp}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step.xpEarned / step.totalXp) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">Estimated Time</div>
                        <div className="text-lg font-bold text-blue-600">
                          {step.estimatedTime}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">Category</div>
                        <div className="text-lg font-bold text-purple-600 capitalize">
                          {step.category}
                        </div>
                      </div>
                    </div>

                    {/* Prerequisites */}
                    {step.prerequisites && step.prerequisites.length > 0 && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-yellow-800">
                          <Lock className="w-4 h-4" />
                          <span className="font-medium">Prerequisites:</span>
                          <span>{step.prerequisites.length} step{step.prerequisites.length > 1 ? 's' : ''} must be completed first</span>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    {step.nextAction && (
                      <div className="flex justify-end">
                        <motion.a
                          href={step.nextAction.href}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                            step.status === 'locked'
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : step.status === 'completed'
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : step.status === 'in-progress'
                                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                          }`}
                        >
                          {step.nextAction.label}
                        </motion.a>
                      </div>
                    )}
                  </div>

                  {/* Shine Effect for Completed Steps */}
                  {step.status === 'completed' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{ x: [-100, 100] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredSteps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Steps Found</h3>
            <p className="text-gray-400">Try selecting a different category.</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
