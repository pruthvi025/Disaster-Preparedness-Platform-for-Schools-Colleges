'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Inputs = {
  email: string
  password: string
  role: 'Student' | 'Teacher' | ''
}

export default function LoginForm() {
  const router = useRouter()
  const [authError, setAuthError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
    defaultValues: { email: '', password: '', role: '' }
  })

  const onSubmit = async (data: Inputs) => {
    setAuthError('')
    const { email, password, role } = data

    const isStudent = role === 'Student' && email === 'student@demo.com' && password === 'password123'
    const isTeacher = role === 'Teacher' && email === 'teacher@demo.com' && password === 'password123'

    if (isStudent) {
      router.push('/student/dashboard')
      return
    }
    if (isTeacher) {
      router.push('/teacher/dashboard')
      return
    }
    setAuthError('Invalid credentials. Please try again.')
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 placeholder-gray-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
          {...register('email', { required: 'Email is required' })}
          autoFocus
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 placeholder-gray-500 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 ${errors.role ? 'border-red-300' : 'border-gray-300'}`}
          {...register('role', { required: 'Role is required' })}
        >
          <option value="">Select role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:shadow-lg transition"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      {authError && (
        <motion.p
          className="text-sm text-red-600"
          initial={{ x: 0 }}
          animate={{ x: [0, -8, 8, -6, 6, -3, 3, 0] }}
          transition={{ duration: 0.5 }}
        >
          {authError}
        </motion.p>
      )}
    </motion.form>
  )
}











