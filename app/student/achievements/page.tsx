'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Medal, 
  Star, 
  Shield, 
  Zap, 
  Heart, 
  MapPin, 
  Flame, 
  BookOpen, 
  Award,
  Target,
  Users,
  Clock,
  Lock,
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import { GovernmentHeader, GovernmentFooter } from '@/components/branding'
import { BackButton } from '@/components/ui'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: 'unlocked' | 'locked'
  category: 'safety' | 'knowledge' | 'leadership' | 'emergency' | 'special'
  xpRequired?: number
  currentProgress?: number
  maxProgress?: number
  rarity: 'bronze' | 'silver' | 'gold' | 'diamond'
  unlockedAt?: string
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const formatDate = (iso: string) => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const d = new Date(iso)
    return formatter.format(d)
  }

  const achievements: Achievement[] = [
    // Unlocked Achievements
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your first learning module',
      icon: <BookOpen className="w-8 h-8" />,
      status: 'unlocked',
      category: 'knowledge',
      xpRequired: 100,
      rarity: 'bronze',
      unlockedAt: '2024-01-15'
    },
    {
      id: 'fire-safety-expert',
      title: 'Fire Safety Expert',
      description: 'Master all fire safety protocols and procedures',
      icon: <Flame className="w-8 h-8" />,
      status: 'unlocked',
      category: 'safety',
      xpRequired: 500,
      rarity: 'silver',
      unlockedAt: '2024-01-20'
    },
    {
      id: 'quick-evacuator',
      title: 'Quick Evacuator',
      description: 'Complete evacuation drill in under 3 minutes',
      icon: <Zap className="w-8 h-8" />,
      status: 'unlocked',
      category: 'emergency',
      xpRequired: 300,
      rarity: 'bronze',
      unlockedAt: '2024-01-18'
    },
    {
      id: 'first-aid-hero',
      title: 'First Aid Hero',
      description: 'Successfully complete first aid training course',
      icon: <Heart className="w-8 h-8" />,
      status: 'unlocked',
      category: 'emergency',
      xpRequired: 400,
      rarity: 'silver',
      unlockedAt: '2024-01-22'
    },
    {
      id: 'knowledge-seeker',
      title: 'Knowledge Seeker',
      description: 'Complete 10 learning modules across different categories',
      icon: <BookOpen className="w-8 h-8" />,
      status: 'unlocked',
      category: 'knowledge',
      xpRequired: 1000,
      currentProgress: 10,
      maxProgress: 10,
      rarity: 'gold',
      unlockedAt: '2024-01-25'
    },
    {
      id: 'safety-scout',
      title: 'Safety Scout',
      description: 'Identify and report 25 safety hazards in your environment',
      icon: <Shield className="w-8 h-8" />,
      status: 'unlocked',
      category: 'safety',
      xpRequired: 750,
      currentProgress: 25,
      maxProgress: 25,
      rarity: 'gold',
      unlockedAt: '2024-01-28'
    },

    // Locked Achievements
    {
      id: 'earthquake-survivor',
      title: 'Earthquake Survivor',
      description: 'Complete earthquake preparedness training and simulation',
      icon: <Shield className="w-8 h-8" />,
      status: 'locked',
      category: 'emergency',
      xpRequired: 800,
      currentProgress: 3,
      maxProgress: 10,
      rarity: 'silver'
    },
    {
      id: 'team-leader',
      title: 'Team Leader',
      description: 'Lead a group during emergency evacuation drill',
      icon: <Users className="w-8 h-8" />,
      status: 'locked',
      category: 'leadership',
      xpRequired: 1200,
      currentProgress: 0,
      maxProgress: 1,
      rarity: 'gold'
    },
    {
      id: 'route-master',
      title: 'Route Master',
      description: 'Navigate all evacuation routes in your school',
      icon: <MapPin className="w-8 h-8" />,
      status: 'locked',
      category: 'safety',
      xpRequired: 1500,
      currentProgress: 2,
      maxProgress: 5,
      rarity: 'gold'
    },
    {
      id: 'time-master',
      title: 'Time Master',
      description: 'Complete evacuation drill in record time',
      icon: <Clock className="w-8 h-8" />,
      status: 'locked',
      category: 'emergency',
      xpRequired: 1000,
      currentProgress: 0,
      maxProgress: 1,
      rarity: 'silver'
    },
    {
      id: 'emergency-expert',
      title: 'Emergency Expert',
      description: 'Master all emergency protocols and procedures',
      icon: <Award className="w-8 h-8" />,
      status: 'locked',
      category: 'special',
      xpRequired: 3000,
      currentProgress: 450,
      maxProgress: 3000,
      rarity: 'diamond'
    },
    {
      id: 'disaster-champion',
      title: 'Disaster Champion',
      description: 'Achieve mastery in all disaster preparedness categories',
      icon: <Trophy className="w-8 h-8" />,
      status: 'locked',
      category: 'special',
      xpRequired: 5000,
      currentProgress: 1250,
      maxProgress: 5000,
      rarity: 'diamond'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'safety', name: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'knowledge', name: 'Knowledge', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'leadership', name: 'Leadership', icon: <Users className="w-4 h-4" /> },
    { id: 'emergency', name: 'Emergency', icon: <Zap className="w-4 h-4" /> },
    { id: 'special', name: 'Special', icon: <Star className="w-4 h-4" /> }
  ]

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory)

  const unlockedCount = achievements.filter(a => a.status === 'unlocked').length
  const totalCount = achievements.length

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case 'bronze':
        return 'from-amber-400 to-amber-600 border-amber-300 shadow-amber-300/50'
      case 'silver':
        return 'from-gray-300 to-gray-500 border-gray-200 shadow-gray-300/50'
      case 'gold':
        return 'from-yellow-400 to-yellow-600 border-yellow-300 shadow-yellow-300/50'
      case 'diamond':
        return 'from-cyan-300 via-blue-400 to-purple-500 border-cyan-200 shadow-purple-300/50'
      default:
        return 'from-indigo-400 to-indigo-600 border-indigo-300 shadow-indigo-300/50'
    }
  }

  const getRarityEmoji = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return '🥉'
      case 'silver': return '🥈'
      case 'gold': return '🥇'
      case 'diamond': return '💎'
      default: return '🏆'
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackButton href="/student/dashboard" label="Back to Dashboard" />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🏆 Achievements
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress and unlock new achievements as you master disaster preparedness skills!
          </p>
          
          {/* Progress Overview */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-lg font-semibold text-gray-900">Progress</span>
              </div>
              <span className="text-2xl font-bold text-indigo-600">
                {unlockedCount}/{totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {Math.round((unlockedCount / totalCount) * 100)}% Complete
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${
                achievement.status === 'unlocked' 
                  ? 'border-transparent hover:shadow-xl' 
                  : 'border-gray-200 opacity-75'
              }`}
            >
              {/* Achievement Card */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    achievement.status === 'unlocked'
                      ? `bg-gradient-to-br ${getRarityStyle(achievement.rarity)}`
                      : 'bg-gray-200'
                  }`}>
                    <div className={`${
                      achievement.status === 'unlocked' ? 'text-white' : 'text-gray-400'
                    }`}>
                      {achievement.icon}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {achievement.status === 'unlocked' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="text-2xl">
                      {achievement.status === 'unlocked' 
                        ? getRarityEmoji(achievement.rarity)
                        : '🔒'
                      }
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${
                    achievement.status === 'unlocked' ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.status === 'unlocked' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>

                {/* Progress Bar (if applicable) */}
                {achievement.currentProgress !== undefined && achievement.maxProgress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.currentProgress}/{achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.currentProgress / achievement.maxProgress) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {/* XP Required */}
                {achievement.xpRequired && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    <span>{achievement.xpRequired} XP Required</span>
                  </div>
                )}

                {/* Unlocked Date */}
                {achievement.unlockedAt && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Unlocked on {formatDate(achievement.unlockedAt)}
                    </p>
                  </div>
                )}
              </div>

              {/* Shine Effect for Unlocked Achievements */}
              {achievement.status === 'unlocked' && (
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
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Achievements Found</h3>
            <p className="text-gray-400">Try selecting a different category.</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
