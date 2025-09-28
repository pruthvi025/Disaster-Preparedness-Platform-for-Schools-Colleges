'use client'

import { motion } from 'framer-motion'
import { Star, User, ThumbsUp, ThumbsDown, MessageCircle, Share } from 'lucide-react'

interface FeaturedIdeaCardProps {
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
  comments: number
  createdAt: string
  reason: string
}

/**
 * FeaturedIdeaCard Component - Highlighted featured idea with special styling
 * Features: Gradient background, special badges, enhanced visibility
 */
export default function FeaturedIdeaCard({
  id,
  title,
  description,
  author,
  votes,
  comments,
  createdAt,
  reason
}: FeaturedIdeaCardProps) {
  const netVotes = votes.upvotes - votes.downvotes

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-6 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Featured Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold"
      >
        <Star className="w-3 h-3" />
        FEATURED
      </motion.div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full" />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h4 className="font-bold text-white">{author.name}</h4>
            <p className="text-sm text-white/80">{createdAt}</p>
          </div>
        </div>
        
        <div className="mb-2">
          <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-1 rounded-full">
            {reason}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-6">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/90 leading-relaxed">{description}</p>
      </div>

      {/* Stats */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{comments} comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm font-bold">
          <span className="text-green-300">
            +{netVotes}
          </span>
          <span className="text-white/80">votes</span>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="relative z-10 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>👍 {votes.upvotes}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>👎 {votes.downvotes}</span>
        </motion.button>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-8 left-8 text-2xl opacity-30"
      >
        💡
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, -3, 3, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-8 right-8 text-xl opacity-30"
      >
        ⭐
      </motion.div>
    </motion.div>
  )
}
