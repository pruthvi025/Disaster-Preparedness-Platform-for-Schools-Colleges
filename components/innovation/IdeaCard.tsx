'use client'

import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, MessageCircle, Share, User } from 'lucide-react'

interface IdeaCardProps {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar?: string
  }
  votes: {
    upvotes: number
    downvotes: number
  }
  status: 'trending' | 'featured' | 'new' | 'popular'
  comments: number
  createdAt: string
}

/**
 * IdeaCard Component - Individual idea display with voting and interaction
 * Features: Vote buttons, status badges, author info, engagement metrics
 */
export default function IdeaCard({
  id,
  title,
  description,
  author,
  votes,
  status,
  comments,
  createdAt
}: IdeaCardProps) {
  const statusConfig = {
    trending: {
      label: 'Trending',
      bgClass: 'bg-orange-100 text-orange-800',
      icon: '🔥'
    },
    featured: {
      label: 'Featured',
      bgClass: 'bg-purple-100 text-purple-800',
      icon: '⭐'
    },
    new: {
      label: 'New',
      bgClass: 'bg-green-100 text-green-800',
      icon: '✨'
    },
    popular: {
      label: 'Popular',
      bgClass: 'bg-blue-100 text-blue-800',
      icon: '👑'
    }
  }

  const config = statusConfig[status]
  const netVotes = votes.upvotes - votes.downvotes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{author.name}</h4>
            <p className="text-xs text-gray-500">{createdAt}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${config.bgClass}`}>
          {config.icon} {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{comments} comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm font-medium">
          <span className={netVotes >= 0 ? 'text-green-600' : 'text-red-600'}>
            {netVotes >= 0 ? '+' : ''}{netVotes}
          </span>
          <span className="text-gray-500">votes</span>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>👍 {votes.upvotes}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>👎 {votes.downvotes}</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
