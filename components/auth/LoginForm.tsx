'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import { signInWithEmail } from '@/lib/auth'

type Role = 'Student' | 'Teacher'

export default function LoginForm({ role }: { role: Role }) {
  const router = useRouter()
  const { setAuth } = useAuth()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: any) => {
    setError('')
    setIsSubmitting(true)
    
    try {
      // Use our new auth system
      const user = await signInWithEmail(data.email, data.password)
      
      if (user) {
        // Set auth context with user data
        setAuth({
          user: { 
            name: user.fullName, 
            email: user.email,
            mobile: '+91 98765 43210' // Default for demo
          },
          role: user.role,
          token: 'demo-token'
        })

        // Redirect based on role
        if (user.role === 'student') {
          router.push('/student/dashboard')
        } else if (user.role === 'teacher') {
          router.push('/teacher/dashboard')
        } else if (user.role === 'admin') {
          router.push('/admin/dashboard')
        }
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error('Login error:', err)
    }
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <input 
            type="email"
            className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 placeholder-gray-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`} 
            placeholder="Enter your email" 
            {...register('email', { required: 'Email is required' })} 
          />
          <Mail className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
        </div>
        {errors.email && <p className="text-xs text-red-600 mt-1">{String(errors.email.message)}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input 
            type="password" 
            className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 placeholder-gray-500 ${errors.password ? 'border-red-300' : 'border-gray-300'}`} 
            placeholder="Enter your password" 
            {...register('password', { required: 'Password is required' })} 
          />
          <Lock className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
        </div>
        {errors.password && <p className="text-xs text-red-600 mt-1">{String(errors.password.message)}</p>}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <button type="button" onClick={() => console.log('Google Login mock')} className="px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50">Google</button>
        <div className="text-xs text-gray-500">Role: {role}</div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}