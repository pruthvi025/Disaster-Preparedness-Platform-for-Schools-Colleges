'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useMemo, useState } from 'react'
import { schools } from '@/data/schools'

type Role = 'Student' | 'Teacher'

type Inputs = {
  fullName: string
  email: string
  mobile: string
  age: string
  district: string
  udiseCode: string
  schoolName: string
  schoolCategory: string
  zone: string
  password: string
  confirmPassword: string
}

export default function SignupForm({ role }: { role: Role }) {
  const router = useRouter()
  const { setAuth } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>({
    defaultValues: { fullName: '', email: '', mobile: '', age: '', district: '', udiseCode: '', schoolName: '', schoolCategory: '', zone: '', password: '', confirmPassword: '' }
  })

  const zone = watch('zone')
  const district = watch('district')
  const schoolName = watch('schoolName')

  const zones = useMemo(() => Array.from(new Set(schools.map(s => s.zone))), [])
  const districts = useMemo(() => Array.from(new Set(schools.filter(s => s.zone === zone).map(s => s.district))), [zone])
  const filteredSchools = useMemo(() => schools.filter(s => s.zone === zone && s.district === district), [zone, district])
  const selectedSchool = useMemo(() => filteredSchools.find(s => s.schoolName === schoolName), [filteredSchools, schoolName])

  useEffect(() => {
    // reset dependent fields
    setValue('district', '')
    setValue('schoolName', '')
    setValue('udiseCode', '')
    setValue('schoolCategory', '')
  }, [zone])

  useEffect(() => {
    setValue('schoolName', '')
    setValue('udiseCode', '')
    setValue('schoolCategory', '')
  }, [district])

  useEffect(() => {
    if (selectedSchool) {
      setValue('udiseCode', selectedSchool.udiseCode)
      setValue('schoolCategory', selectedSchool.schoolCategory)
    } else {
      setValue('udiseCode', '')
      setValue('schoolCategory', '')
    }
  }, [selectedSchool])

  const onSubmit = async (data: Inputs) => {
    setIsSubmitting(true)
    setError('')
    
    // Mock signup - no database connection
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Set auth context with mock data
    setAuth({
      user: { 
        name: data.fullName, 
        email: data.email, 
        mobile: data.mobile, 
        age: data.age 
      },
      role: role.toLowerCase(),
      district: data.district,
      udiseCode: data.udiseCode,
      schoolName: data.schoolName,
      schoolCategory: data.schoolCategory,
      zone: data.zone,
      token: 'demo-token'
    })

    // Redirect based on role
    router.push(role === 'Student' ? '/student/dashboard' : '/teacher/dashboard')
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          type="text" 
          placeholder="Enter your full name"
          className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 ${errors.fullName ? 'border-red-300' : 'border-gray-300'}`} 
          {...register('fullName', { 
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })} 
        />
        {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 ${errors.email ? 'border-red-300' : 'border-gray-300'}`} {...register('email', { required: 'Required' })} />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <input type="tel" className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`} {...register('mobile', { required: 'Required' })} />
          {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile.message}</p>}
        </div>
      </div>

      {/* Student-specific fields - only show for Student role */}
      {role === 'Student' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input 
              type="number" 
              min="1" 
              max="100" 
              className={`w-full rounded-md border px-3 py-2 bg-white text-gray-900 ${errors.age ? 'border-red-300' : 'border-gray-300'}`} 
              {...register('age', { 
                required: role === 'Student' ? 'Age is required' : false,
                min: { value: 1, message: 'Age must be at least 1' },
                max: { value: 100, message: 'Age must be less than 100' }
              })} 
            />
            {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
              <select className="w-full rounded-lg border px-3 py-2 shadow-sm bg-white text-gray-900" {...register('zone', { required: role === 'Student' ? 'Required' : false })}>
                <option value="">Select zone</option>
                {zones.map(z => (<option key={z} value={z}>{z}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <select className="w-full rounded-lg border px-3 py-2 shadow-sm bg-white text-gray-900" disabled={!zone} {...register('district', { required: role === 'Student' ? 'Required' : false })}>
                <option value="">Select district</option>
                {districts.map(d => (<option key={d} value={d}>{d}</option>))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UDISE Code</label>
              <input placeholder="—" className="w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-500" readOnly {...register('udiseCode', { required: role === 'Student' ? 'Required' : false })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
              <select className="w-full rounded-lg border px-3 py-2 shadow-sm bg-white text-gray-900" disabled={!district} {...register('schoolName', { required: role === 'Student' ? 'Required' : false })}>
                <option value="">Select school</option>
                {filteredSchools.map(s => (<option key={s.udiseCode} value={s.schoolName}>{s.schoolName}</option>))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Category</label>
            <input placeholder="—" className="w-full rounded-md border px-3 py-2 bg-gray-50 text-gray-900 placeholder-gray-500" readOnly {...register('schoolCategory', { required: role === 'Student' ? 'Required' : false })} />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" className="w-full rounded-md border px-3 py-2 bg-white text-gray-900 border-gray-300" {...register('password', { required: 'Required' })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input type="password" className="w-full rounded-md border px-3 py-2 bg-white text-gray-900 border-gray-300" {...register('confirmPassword', { validate: (v) => v === watch('password') || 'Passwords do not match' })} />
          {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <button type="button" onClick={() => console.log('Google Signup mock')} className="px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50">Google</button>
        <div className="text-xs text-gray-500">Role: {role}</div>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition disabled:opacity-50">
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}