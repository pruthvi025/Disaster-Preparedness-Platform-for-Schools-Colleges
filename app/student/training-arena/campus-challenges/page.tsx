'use client'

import { motion } from 'framer-motion'
import { Users, Trophy, Flag, Search } from 'lucide-react'
import StudentNavbar from '@/components/dashboard/StudentNavbar'
import { BackButton } from '@/components/ui'

const features = [
  { icon: <Flag className="w-5 h-5" />, title: 'Evacuation Race', desc: 'Teams compete to evacuate fastest with correct protocols.' },
  { icon: <Search className="w-5 h-5" />, title: 'Find Fire Extinguishers', desc: 'Locate and mark extinguishers across campus zones.' },
  { icon: <Users className="w-5 h-5" />, title: 'Direct Challenges Between Friends', desc: 'Issue head-to-head challenges to other teams.' }
]

const leaderboard = [
  { rank: 1, team: 'Alpha Responders', points: 4200 },
  { rank: 2, team: 'Safety Squad', points: 3975 },
  { rank: 3, team: 'Rapid Evacuators', points: 3610 },
  { rank: 4, team: 'Shield Force', points: 3480 },
  { rank: 5, team: 'Team Cyclone', points: 3320 }
]

export default function CampusChallengesPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/student/training-arena" label="Back to Training Arena" />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Users className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Team-Based Campus Challenges
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Form teams, compete in AR/VR disaster drills, and climb your campus leaderboard.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {features.map((f, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 text-indigo-700">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Campus Leaderboard</h2>
          </div>
          <div className="divide-y">
            {leaderboard.map((row) => (
              <div key={row.rank} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    row.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    row.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    row.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-indigo-50 text-indigo-700'
                  }`}>
                    {row.rank}
                  </span>
                  <span className="font-medium text-gray-900">{row.team}</span>
                </div>
                <span className="text-sm font-semibold text-indigo-700">{row.points} pts</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}













