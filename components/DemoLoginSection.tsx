'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function DemoLoginSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Demo Login 🔑</h2>
        <p className="text-gray-600">Use demo credentials to explore the platform as a Student or Teacher.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Student Login</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div>
                <div className="text-xs opacity-90">Username</div>
                <div className="px-3 py-2 rounded bg-white/15 border border-white/20 text-sm select-all">student@demo.com</div>
              </div>
              <div>
                <div className="text-xs opacity-90">Password</div>
                <div className="px-3 py-2 rounded bg-white/15 border border-white/20 text-sm select-all">password123</div>
              </div>
            </div>
            <Link href="/student/dashboard" className="inline-block px-4 py-2 rounded-lg bg-white text-indigo-700 font-semibold hover:shadow-md">
              Login as Student
            </Link>
          </div>
        </motion.div>

        {/* Teacher Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 bg-gradient-to-br from-orange-500 to-amber-600 text-white"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Teacher Login</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div>
                <div className="text-xs opacity-90">Username</div>
                <div className="px-3 py-2 rounded bg-white/15 border border-white/20 text-sm select-all">teacher@demo.com</div>
              </div>
              <div>
                <div className="text-xs opacity-90">Password</div>
                <div className="px-3 py-2 rounded bg-white/15 border border-white/20 text-sm select-all">password123</div>
              </div>
            </div>
            <Link href="/teacher/dashboard" className="inline-block px-4 py-2 rounded-lg bg-white text-orange-700 font-semibold hover:shadow-md">
              Login as Teacher
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}












