'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Message from '@/components/ui/Message'

type UserRole = 'admin' | 'teacher' | 'student'

interface FormData {
  displayName: string
  role: UserRole | undefined
}

interface MessageState {
  type: 'success' | 'error' | 'info' | 'warning' | null
  text: string
}

/**
 * Profile Setup Page - Enhanced UI/UX with modular components
 * Features: Form validation UI, loading states, success/error messages
 */
export default function ProfileSetup() {
  const [formData, setFormData] = useState<FormData>({
    displayName: '',
    role: 'student'
  })
  
  const [message, setMessage] = useState<MessageState>({ 
    type: null, 
    text: '' 
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ displayName?: string; role?: string }>({})

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
    
    // Clear message when user makes changes
    if (message.type) {
      setMessage({ type: null, text: '' })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { displayName?: string; role?: string } = {}
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required'
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters'
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setMessage({ 
        type: 'error', 
        text: 'Please fix the errors below and try again.' 
      })
      return
    }
    
    setLoading(true)
    setMessage({ type: null, text: '' })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    setMessage({ 
      type: 'success', 
      text: 'Profile setup completed successfully! Welcome to Disaster Preparedness Platform.' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <Card>
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Setup
          </h1>
          <p className="text-gray-600">
            Complete your profile to get started
          </p>
        </motion.div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Display Name Input */}
          <Input
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            placeholder="Enter your display name"
            error={errors.displayName}
            helperText="This will be visible to other users"
            required
          />

          {/* Role Select */}
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            options={roleOptions}
            error={errors.role}
            helperText="Choose your role in the platform"
            required
          />

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
            loading={loading}
            className="w-full"
          >
            {loading ? 'Setting up profile...' : 'Continue'}
          </Button>

          {/* Avatar Creator Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <a 
              href="/student/avatar" 
              className="block w-full text-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              🎨 Create Your Avatar
            </a>
          </motion.div>
        </motion.form>

        {/* Footer Links */}
        <motion.div 
          className="mt-8 text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a 
            href="/admin/register-school" 
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors block"
          >
            Need to register a school first? ←
          </a>
          
          <div className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </motion.div>
      </Card>
      </div>
    </div>
  )
}
