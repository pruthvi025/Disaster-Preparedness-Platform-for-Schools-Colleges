'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import StudentNavbar from '@/components/dashboard/StudentNavbar'
import { BackButton } from '@/components/ui'

export default function StormMissionPlaceholder() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/student/training-arena/story-missions" label="Back to Story Missions" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🌀</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Cyclone Warning</h1>
          <p className="text-gray-600 mb-6">Placeholder mission page. The interactive scenario will be added here soon.</p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Level 2</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">+60 XP</span>
          </div>

          <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            Begin – Placeholder
          </Link>
        </motion.div>
      </main>
    </div>
  )
}


