'use client'

import { motion } from 'framer-motion'
import { Bell, User, Settings, Lightbulb, Zap, Play, Phone } from 'lucide-react'

interface StudentNavbarProps {
  studentName: string
  avatar?: string
}

/**
 * StudentNavbar Component - Top navigation for student dashboard
 * Features: Site branding, notifications, profile access
 */
export default function StudentNavbar({ studentName, avatar }: StudentNavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-16 left-0 right-0 w-full bg-white border-b border-gray-200 z-40"
    >
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Site title */}
          <div className="flex-shrink-0">
            <motion.a 
              href="/student/dashboard"
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Surakshya Sarthi
            </motion.a>
          </div>
          
          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">

            {/* Emergency Contacts Link */}
            <motion.a
              href="/student/emergency-contacts"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-red-500 hover:to-pink-600 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Emergency Contacts</span>
            </motion.a>

            {/* Training Arena Link */}
            <motion.a
              href="/student/training-arena"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg text-sm font-medium hover:from-orange-500 hover:to-red-600 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Training Arena</span>
            </motion.a>

            {/* Innovation Hub Link */}
            <motion.a
              href="/student/innovation-hub"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-yellow-500 hover:to-orange-600 transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Innovation Hub</span>
            </motion.a>


            {/* Avatar Creator Link */}
            <motion.a
              href="/student/avatar"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Customize Avatar</span>
            </motion.a>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                {avatar ? (
                  <img src={avatar} alt={studentName} className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-4 h-4 text-indigo-600" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {studentName}
              </span>
            </motion.div>

            {/* Settings */}
            <motion.a
              href="/settings"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
