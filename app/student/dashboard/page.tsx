'use client'

import { motion } from 'framer-motion'
import { 
  Flame, 
  Shield, 
  MapPin, 
  Heart, 
  Zap, 
  BookOpen,
  Star,
  Award,
  Target,
  Users,
  Clock,
  Trophy
} from 'lucide-react'

import StudentNavbar from '@/components/dashboard/StudentNavbar'
import ProgressCard, { Badge } from '@/components/dashboard/ProgressCard'
import MissionCard from '@/components/dashboard/MissionCard'
import StreakCard from '@/components/dashboard/StreakCard'
import StreakHeatmap from '@/components/dashboard/StreakHeatmap'

/**
 * Student Dashboard Page - Main learning hub for students
 * Features: Progress tracking, mission management, streak system
 */
export default function StudentDashboard() {
  // Static data for demonstration
  const studentData = {
    name: "Mr.Rahul A. Jadhav",
    level: 3,
    xp: 1250,
    maxXp: 2000,
    currentStreak: 5,
    longestStreak: 12,
    weeklyGoal: 7,
    weeklyProgress: 5
  }

  // Sample activity data for the heatmap
  const activityLogs = [
    { date: "2025-09-01", active: true },
    { date: "2025-09-02", active: true },
    { date: "2025-09-03", active: false },
    { date: "2025-09-04", active: true },
    { date: "2025-09-05", active: true },
    { date: "2025-09-06", active: true },
    { date: "2025-09-07", active: false },
    { date: "2025-09-08", active: true },
    { date: "2025-09-09", active: true },
    { date: "2025-09-10", active: true },
    { date: "2025-09-11", active: true },
    { date: "2025-09-12", active: true },
    { date: "2025-09-13", active: false },
    { date: "2025-09-14", active: true },
    { date: "2025-09-15", active: true },
    { date: "2025-09-16", active: true },
    { date: "2025-09-17", active: true },
    { date: "2025-09-18", active: true },
    { date: "2025-09-19", active: true },
    { date: "2025-09-20", active: true },
    { date: "2025-09-21", active: true }
  ]

  const badges: Badge[] = [
    {
      id: 'quick-evacuator',
      name: 'Quick Evacuator',
      icon: <Zap className="w-6 h-6" />,
      earned: true,
      rarity: 'bronze' as const,
      xpRequired: 500,
      description: 'Complete your first evacuation drill'
    },
    {
      id: 'first-aid-pro',
      name: 'First Aid Pro',
      icon: <Heart className="w-6 h-6" />,
      earned: true,
      rarity: 'silver' as const,
      xpRequired: 1000,
      description: 'Master basic first aid techniques'
    },
    {
      id: 'safety-scout',
      name: 'Safety Scout',
      icon: <Shield className="w-6 h-6" />,
      earned: false,
      rarity: 'gold' as const,
      xpRequired: 2000,
      description: 'Identify 10 safety hazards'
    },
    {
      id: 'knowledge-seeker',
      name: 'Knowledge Seeker',
      icon: <BookOpen className="w-6 h-6" />,
      earned: true,
      rarity: 'bronze' as const,
      xpRequired: 300,
      description: 'Complete 5 learning modules'
    },
    {
      id: 'emergency-expert',
      name: 'Emergency Expert',
      icon: <Award className="w-6 h-6" />,
      earned: false,
      rarity: 'diamond' as const,
      xpRequired: 5000,
      description: 'Master all emergency protocols'
    },
    {
      id: 'route-master',
      name: 'Route Master',
      icon: <MapPin className="w-6 h-6" />,
      earned: false,
      rarity: 'gold' as const,
      xpRequired: 3000,
      description: 'Navigate all evacuation routes'
    },
    {
      id: 'team-leader',
      name: 'Team Leader',
      icon: <Users className="w-6 h-6" />,
      earned: false,
      rarity: 'silver' as const,
      xpRequired: 1500,
      description: 'Lead a group during evacuation'
    },
    {
      id: 'time-master',
      name: 'Time Master',
      icon: <Clock className="w-6 h-6" />,
      earned: false,
      rarity: 'bronze' as const,
      xpRequired: 800,
      description: 'Complete evacuation in record time'
    }
  ]

  const missions = [
    {
      id: 'fire-drill',
      title: 'Complete Fire Drill',
      description: 'Practice evacuation procedures and learn fire safety basics',
      status: 'completed' as const,
      xpReward: 150,
      estimatedTime: '15 min',
      icon: <Flame className="w-6 h-6" />
    },
    {
      id: 'exit-routes',
      title: 'Find Exit Routes',
      description: 'Identify and map emergency exit routes in your school',
      status: 'available' as const,
      xpReward: 200,
      estimatedTime: '20 min',
      icon: <MapPin className="w-6 h-6" />
    },
    {
      id: 'first-aid-basics',
      title: 'First Aid Basics',
      description: 'Learn essential first aid techniques and emergency response',
      status: 'locked' as const,
      xpReward: 300,
      estimatedTime: '30 min',
      icon: <Heart className="w-6 h-6" />
    }
  ]

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <StudentNavbar studentName={studentData.name} />

      {/* Main Content */}
      <div className="w-full pt-20 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {studentData.name}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Your disaster preparedness journey starts here
            </p>
          </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Card - Takes up 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <ProgressCard
              xp={studentData.xp}
              maxXp={studentData.maxXp}
              level={studentData.level}
              badges={badges}
            />
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StreakCard
              currentStreak={studentData.currentStreak}
              longestStreak={studentData.longestStreak}
              weeklyGoal={studentData.weeklyGoal}
              weeklyProgress={studentData.weeklyProgress}
            />
          </motion.div>

        </div>

        {/* Streak Heatmap Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <StreakHeatmap activityLogs={activityLogs} />
        </motion.div>

        {/* Missions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Missions</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>Complete missions to earn XP and unlock new challenges</span>
            </div>
          </div>

          {/* Mission Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <MissionCard
                  id={mission.id}
                  title={mission.title}
                  description={mission.description}
                  status={mission.status}
                  xpReward={mission.xpReward}
                  estimatedTime={mission.estimatedTime}
                  icon={mission.icon}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="/student/learning-path"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              View Learning Path
            </motion.a>
            <motion.a
              href="/student/achievements"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(107, 114, 128, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-md hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg"
            >
              <Award className="w-4 h-4" />
              View Achievements
            </motion.a>
            <motion.a
              href="/student/leaderboard"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </motion.a>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
