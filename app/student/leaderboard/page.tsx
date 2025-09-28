'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Trophy, Crown, Medal, Award } from 'lucide-react'
import { LeaderboardTabs } from '@/components/leaderboard/LeaderboardTabs'
import { StudentProfileCard } from '@/components/leaderboard/StudentProfileCard'
import { LeaderboardRow } from '@/components/leaderboard/LeaderboardRow'
import { FilterDropdown } from '@/components/leaderboard/FilterDropdown'
import { BadgeTooltip } from '@/components/leaderboard/BadgeTooltip'
import { BackButton } from '@/components/ui'

// Mock data for demonstration
const mockStudents = [
  {
    id: 1,
    name: 'Arjun Singh',
    school: 'Government Model School, Chandigarh',
    xp: 2450,
    badges: ['fire-safety', 'earthquake-ready', 'first-aid', 'evacuation-expert'],
    rank: 1
  },
  {
    id: 2,
    name: 'Priya Sharma',
    school: 'Punjab Public School, Ludhiana',
    xp: 2380,
    badges: ['fire-safety', 'earthquake-ready', 'first-aid'],
    rank: 2
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    school: 'Delhi Public School, Amritsar',
    xp: 2250,
    badges: ['fire-safety', 'earthquake-ready'],
    rank: 3
  },
  {
    id: 4,
    name: 'Sneha Patel',
    school: 'Kendriya Vidyalaya, Jalandhar',
    xp: 2100,
    badges: ['fire-safety', 'first-aid'],
    rank: 4
  },
  {
    id: 5,
    name: 'Vikram Singh',
    school: 'Government Model School, Patiala',
    xp: 1950,
    badges: ['fire-safety'],
    rank: 5
  },
  {
    id: 6,
    name: 'Anita Kaur',
    school: 'Sacred Heart School, Bathinda',
    xp: 1800,
    badges: ['earthquake-ready', 'first-aid'],
    rank: 6
  },
  {
    id: 7,
    name: 'Rohit Verma',
    school: 'St. Joseph School, Mohali',
    xp: 1650,
    badges: ['fire-safety', 'evacuation-expert'],
    rank: 7
  },
  {
    id: 8,
    name: 'Kavita Singh',
    school: 'Government Model School, Chandigarh',
    xp: 1500,
    badges: ['first-aid'],
    rank: 8
  },
  {
    id: 9,
    name: 'Amit Kumar',
    school: 'Punjab Public School, Ludhiana',
    xp: 1350,
    badges: ['fire-safety', 'earthquake-ready'],
    rank: 9
  },
  {
    id: 10,
    name: 'Sunita Devi',
    school: 'Delhi Public School, Amritsar',
    xp: 1200,
    badges: ['fire-safety'],
    rank: 10
  },
  {
    id: 11,
    name: 'Deepak Sharma',
    school: 'Kendriya Vidyalaya, Jalandhar',
    xp: 1050,
    badges: ['earthquake-ready'],
    rank: 11
  },
  {
    id: 12,
    name: 'Meera Singh', // Current student
    school: 'Government Model School, Chandigarh',
    xp: 950,
    badges: ['fire-safety'],
    rank: 12
  }
]

const badgeData = {
  'fire-safety': { name: 'Fire Safety Expert', icon: '🔥', color: 'text-red-500' },
  'earthquake-ready': { name: 'Earthquake Ready', icon: '🌍', color: 'text-orange-500' },
  'first-aid': { name: 'First Aid Hero', icon: '🏥', color: 'text-green-500' },
  'evacuation-expert': { name: 'Evacuation Expert', icon: '🚨', color: 'text-blue-500' }
}

type TabType = 'global' | 'school' | 'friends'
type FilterType = 'week' | 'month' | 'all'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('global')
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)

  // Filter and search logic
  const filteredStudents = useMemo(() => {
    let filtered = mockStudents

    // Apply tab filter
    if (activeTab === 'school') {
      filtered = filtered.filter(student => 
        student.school.includes('Government Model School, Chandigarh')
      )
    } else if (activeTab === 'friends') {
      // Mock friends data - in real app, this would come from API
      const friendIds = [1, 3, 5, 7, 9]
      filtered = filtered.filter(student => friendIds.includes(student.id))
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.school.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered.sort((a, b) => a.rank - b.rank)
  }, [activeTab, searchQuery])

  const currentStudent = mockStudents.find(student => student.id === 12) || mockStudents[11]

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
            🏆 Leaderboard – Disaster Readiness Heroes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compete with students across Punjab and become a disaster preparedness champion!
          </p>
        </motion.div>

        {/* Current Student Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <StudentProfileCard student={currentStudent} />
        </motion.div>

        {/* Tabs and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {(() => {
              const tabs = [
                { id: 'overall', label: 'Overall' },
                { id: 'campus', label: 'Your Campus' },
                { id: 'friends', label: 'Friends' }
              ]
              const toUiId: Record<TabType, string> = { global: 'overall', school: 'campus', friends: 'friends' }
              const toState: Record<string, TabType> = { overall: 'global', campus: 'school', friends: 'friends' }
              return (
                <LeaderboardTabs
                  tabs={tabs}
                  activeId={toUiId[activeTab]}
                  onChange={(id) => setActiveTab(toState[id] || 'global')}
                />
              )
            })()}
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students or schools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              <FilterDropdown filter={filter} onFilterChange={setFilter} />
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="grid grid-cols-12 gap-4 items-center font-semibold">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-3">Student Name</div>
              <div className="col-span-4 hidden md:block">School</div>
              <div className="col-span-2 text-center">XP</div>
              <div className="col-span-2 text-center">Badges</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {filteredStudents.map((student, index) => (
                <LeaderboardRow
                  key={student.id}
                  student={student}
                  index={index}
                  badgeData={badgeData}
                  onBadgeHover={setHoveredBadge}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Badge Tooltip */}
        {hoveredBadge && (
          <BadgeTooltip
            badge={badgeData[hoveredBadge as keyof typeof badgeData]}
            onClose={() => setHoveredBadge(null)}
          />
        )}
      </main>
    </div>
  )
}
