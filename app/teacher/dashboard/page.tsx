'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Award, 
  Calendar,
  BarChart3,
  Settings,
  Bell,
  User,
  Plus,
  FileText,
  Clock,
  TrendingUp,
  ChevronRight,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Teacher Dashboard Page - Main hub for teachers
 * Features: Class management, student progress, assignments, etc.
 */
export default function TeacherDashboard() {
  const { user, role } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Redirect if not a teacher
  useEffect(() => {
    if (role && role !== 'teacher') {
      router.push('/')
    }
  }, [role, router])

  // Show loading if auth is not ready
  if (!user || role !== 'teacher') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Mock data for demonstration
  const stats = {
    totalStudents: 156,
    activeClasses: 8,
    assignments: 24,
    avgProgress: 87
  }

  const recentActivities = [
    {
      id: 1,
      type: 'assignment',
      title: 'New assignment submitted',
      description: 'Disaster Preparedness Quiz - Class 10A',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'progress',
      title: 'Student progress updated',
      description: 'Mr.Rahul A. Jadhav completed Module 3',
      time: '4 hours ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'enrollment',
      title: 'New student enrolled',
      description: 'Sarah Wilson joined Class 10A',
      time: '1 day ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'assignment',
      title: 'Assignment deadline approaching',
      description: 'Fire Safety Project due tomorrow',
      time: '2 days ago',
      status: 'warning'
    }
  ]

  const quickActions = [
    {
      id: 'create-assignment',
      title: 'Create Assignment',
      description: 'Create new assignments and quizzes',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      href: '/teacher/assignments/create'
    },
    {
      id: 'manage-classes',
      title: 'Manage Classes',
      description: 'View and manage your classes',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      href: '/teacher/classes'
    },
    {
      id: 'view-reports',
      title: 'View Reports',
      description: 'Analytics and performance reports',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      href: '/teacher/reports'
    },
    {
      id: 'schedule-class',
      title: 'Schedule Class',
      description: 'Schedule new classes and sessions',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      href: '/teacher/schedule'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Account and preference settings',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600',
      hoverColor: 'hover:from-gray-600 hover:to-gray-700',
      href: '/teacher/settings'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'info':
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-lg text-gray-600">
            Manage your classes and track student progress
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Classes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeClasses}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.assignments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 p-4 text-left rounded-lg bg-gradient-to-r ${action.color} ${action.hoverColor} text-white transition-all duration-200 shadow-md hover:shadow-lg`}
                    onClick={() => {
                      router.push(action.href)
                    }}
                  >
                    <div className="flex-shrink-0">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{action.title}</p>
                      <p className="text-xs opacity-90">{action.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Teacher Dashboard - Enhanced Features Coming Soon!</h3>
              <p className="text-indigo-100">
                We're working on expanding the teacher dashboard with advanced features like detailed class management, 
                student progress tracking, assignment creation tools, and comprehensive analytics.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}