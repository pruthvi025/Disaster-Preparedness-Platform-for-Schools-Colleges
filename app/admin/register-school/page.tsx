'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Message from '@/components/ui/Message'

interface FormData {
  schoolName: string
  address: string
}

interface MessageState {
  type: 'success' | 'error' | 'info' | 'warning' | null
  text: string
}

/**
 * Register School Page - Enhanced UI/UX with modular components
 * Features: Form validation UI, loading states, success/error messages
 */
export default function RegisterSchool() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    address: ''
  })
  
  const [message, setMessage] = useState<MessageState>({ 
    type: null, 
    text: '' 
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const newErrors: Partial<FormData> = {}
    
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required'
    } else if (formData.schoolName.trim().length < 3) {
      newErrors.schoolName = 'School name must be at least 3 characters'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address'
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
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    setMessage({ 
      type: 'success', 
      text: 'School registered successfully! You can now proceed to profile setup.' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Navigation />
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
            Register School
          </h1>
          <p className="text-gray-600">
            Enter school details to continue
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
          {/* School Name Input */}
          <Input
            label="School Name"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleInputChange}
            placeholder="Enter school name"
            error={errors.schoolName}
            helperText="Enter the official name of your school"
            required
          />

          {/* Address Input */}
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter school address"
            error={errors.address}
            helperText="Include street address, city, and postal code"
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
            {loading ? 'Registering school...' : 'Register'}
          </Button>
        </motion.form>

        {/* Footer Links */}
        <motion.div 
          className="mt-8 text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a 
            href="/onboarding/profile-setup" 
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors block"
          >
            Already registered? Continue to profile setup →
          </a>
          
          <div className="text-xs text-gray-500">
            By registering, you agree to our Terms of Service and Privacy Policy
          </div>
        </motion.div>
      </Card>
      </div>
    </div>
  )
}
