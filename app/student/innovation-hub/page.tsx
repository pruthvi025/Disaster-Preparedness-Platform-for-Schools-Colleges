'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, Star, Users, Filter, Search } from 'lucide-react'

import StudentNavbar from '@/components/dashboard/StudentNavbar'
import IdeaSubmitForm from '@/components/innovation/IdeaSubmitForm'
import IdeaCard from '@/components/innovation/IdeaCard'
import FeaturedIdeaCard from '@/components/innovation/FeaturedIdeaCard'

/**
 * Innovation Hub Page - Community-driven idea sharing platform
 * Features: Idea submission, voting, featured ideas, community engagement
 */
export default function InnovationHub() {
  const [ideas, setIdeas] = useState([
    {
      id: '1',
      title: 'Smart Emergency Alert System',
      description: 'A mobile app that uses GPS to send location-specific emergency alerts and evacuation routes to students and staff during disasters.',
      author: {
        name: 'Sarah Chen',
        avatar: undefined
      },
      votes: {
        upvotes: 42,
        downvotes: 3
      },
      status: 'trending' as const,
      comments: 12,
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Disaster Preparedness Game',
      description: 'An interactive game that teaches students evacuation procedures through virtual reality simulations of different disaster scenarios.',
      author: {
        name: 'Marcus Johnson',
        avatar: undefined
      },
      votes: {
        upvotes: 28,
        downvotes: 1
      },
      status: 'popular' as const,
      comments: 8,
      createdAt: '5 hours ago'
    },
    {
      id: '3',
      title: 'Community Emergency Kit Exchange',
      description: 'A platform where students can share and exchange emergency supplies, ensuring everyone has access to necessary items during disasters.',
      author: {
        name: 'Emily Rodriguez',
        avatar: undefined
      },
      votes: {
        upvotes: 35,
        downvotes: 2
      },
      status: 'new' as const,
      comments: 15,
      createdAt: '1 day ago'
    },
    {
      id: '4',
      title: 'AI-Powered Risk Assessment',
      description: 'Machine learning system that analyzes weather patterns and historical data to predict potential disaster risks and suggest preventive measures.',
      author: {
        name: 'Alex Kim',
        avatar: undefined
      },
      votes: {
        upvotes: 19,
        downvotes: 4
      },
      status: 'trending' as const,
      comments: 6,
      createdAt: '3 days ago'
    }
  ])

  const featuredIdea = {
    id: 'featured-1',
    title: 'Universal Emergency Communication Protocol',
    description: 'A standardized communication system that works across all devices and platforms, ensuring no one is left behind during emergencies. This includes visual signals, audio alerts, and haptic feedback for accessibility.',
    author: {
      name: 'Dr. Maria Santos',
      avatar: undefined
    },
    votes: {
      upvotes: 156,
      downvotes: 7
    },
    comments: 34,
    createdAt: '1 week ago',
    reason: 'Most voted idea this week'
  }

  const handleIdeaSubmit = (newIdea: { title: string; description: string }) => {
    // In a real app, this would submit to the backend
    console.log('New idea submitted:', newIdea)
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-full">
      {/* Navigation */}
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />

      {/* Main Content */}
      <main className="w-full pt-20 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Innovation Hub 💡
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your creative disaster management ideas and vote for others!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-1">{ideas.length}</div>
            <div className="text-sm text-gray-600">Ideas Submitted</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {ideas.reduce((sum, idea) => sum + idea.votes.upvotes, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Upvotes</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {ideas.reduce((sum, idea) => sum + idea.comments, 0)}
            </div>
            <div className="text-sm text-gray-600">Comments</div>
          </div>
        </motion.div>

        {/* Featured Idea Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Idea of the Week</h2>
          </div>
          <FeaturedIdeaCard {...featuredIdea} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submit Idea Form - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <IdeaSubmitForm onSubmit={handleIdeaSubmit} />
          </motion.div>

          {/* Ideas List - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Ideas Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Community Ideas</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </motion.button>
              </div>
            </div>

            {/* Ideas Grid */}
            <div className="space-y-4">
              {ideas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <IdeaCard {...idea} />
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Load More Ideas
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Join the Innovation Community</h3>
            <p className="text-gray-600 mb-4">
              Be part of a community that's making disaster preparedness better for everyone
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full"
              >
                <Users className="w-4 h-4 text-indigo-600" />
                <span>1,234 active members</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full"
              >
                <Lightbulb className="w-4 h-4 text-green-600" />
                <span>567 ideas implemented</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
        </div>
      </main>
    </div>
  )
}
