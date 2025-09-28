'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Send, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Message from '@/components/ui/Message'

interface IdeaSubmitFormProps {
  onSubmit: (idea: { title: string; description: string }) => void
}

/**
 * IdeaSubmitForm Component - Form for students to submit their innovative ideas
 * Features: Title input, description textarea, submit button, validation
 */
export default function IdeaSubmitForm({ onSubmit }: IdeaSubmitFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null, text: string }>({ 
    type: null, 
    text: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear message when user starts typing
    if (message.type) {
      setMessage({ type: null, text: '' })
    }
  }

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Please enter an idea title' })
      return false
    }
    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Please describe your idea' })
      return false
    }
    if (formData.title.trim().length < 5) {
      setMessage({ type: 'error', text: 'Title must be at least 5 characters long' })
      return false
    }
    if (formData.description.trim().length < 20) {
      setMessage({ type: 'error', text: 'Description must be at least 20 characters long' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setMessage({ type: null, text: '' })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onSubmit(formData)
    setFormData({ title: '', description: '' })
    setMessage({ 
      type: 'success', 
      text: 'Your idea has been submitted successfully! 🎉' 
    })
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
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
          className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
        >
          <Lightbulb className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Share Your Idea</h3>
          <p className="text-sm text-gray-600">Help make disaster preparedness better!</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <Input
          label="Idea Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a catchy title for your idea..."
          helperText="Make it descriptive and engaging"
          required
        />

        {/* Description Textarea */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Describe Your Idea
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Explain your innovative disaster management idea in detail..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
            rows={4}
            required
          />
          <p className="text-xs text-gray-500">
            {formData.description.length}/500 characters
          </p>
        </div>

        {/* Status Message */}
        {message.type && (
          <Message type={message.type}>
            {message.text}
          </Message>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 mr-2"
              >
                <Send className="w-4 h-4" />
              </motion.div>
              Submitting Idea...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Idea
            </>
          )}
        </Button>
      </form>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200"
      >
        <div className="flex items-center gap-2 text-sm text-indigo-700">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Your ideas matter! Every innovation helps make our community safer.</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
