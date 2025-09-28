'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '@/lib/auth-client'
import Select from '@/components/ui/Select'

type Role = 'Student' | 'Teacher' | 'Admin'

const regions = ['North', 'South', 'East', 'West']
const zones = ['Zone-1', 'Zone-2', 'Zone-3', 'Zone-4']

const districtData: Record<string, string[]> = {
  'Zone-1': ['District A', 'District B'],
  'Zone-2': ['District C', 'District D'],
  'Zone-3': ['District E', 'District F'],
  'Zone-4': ['District G', 'District H']
}

const schoolData: Record<string, { name: string; udise: string; category: string }[]> = {
  'District A': [
    { name: 'Springfield High', udise: 'UD-1001', category: 'Senior Secondary' },
    { name: 'Riverside Public', udise: 'UD-1002', category: 'Secondary' }
  ],
  'District B': [
    { name: 'Hillside School', udise: 'UD-1003', category: 'Primary' }
  ],
  'District C': [
    { name: 'Green Valley School', udise: 'UD-2001', category: 'Senior Secondary' }
  ],
  'District D': [
    { name: 'Blue Ridge School', udise: 'UD-2002', category: 'Secondary' }
  ],
  'District E': [
    { name: 'Sunrise Academy', udise: 'UD-3001', category: 'Primary' }
  ],
  'District F': [
    { name: 'Everest High', udise: 'UD-3002', category: 'Senior Secondary' }
  ],
  'District G': [
    { name: 'Lakeside School', udise: 'UD-4001', category: 'Secondary' }
  ],
  'District H': [
    { name: 'Seaside Public', udise: 'UD-4002', category: 'Primary' }
  ]
}

export default function LoginPage() {
  const { setAuth } = useAuth()
  const [role, setRole] = useState<Role>('Student')
  const [region, setRegion] = useState('')
  const [zone, setZone] = useState('')
  const [district, setDistrict] = useState('')
  const [school, setSchool] = useState('')

  const selectedDistricts = useMemo(() => (zone ? districtData[zone] : []), [zone])
  const selectedSchools = useMemo(() => (district ? schoolData[district] : []), [district])
  const selectedSchool = selectedSchools.find((s) => s.name === school)

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
    password: '',
    confirmPassword: '',
    profilePic: ''
  })

  const onSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmail({ email: loginForm.email, password: loginForm.password })
      setAuth({
        role,
        region,
        zone,
        district: role === 'Admin' ? '' : district,
        schoolName: role === 'Admin' ? '' : (selectedSchool?.name || ''),
        udiseCode: role === 'Admin' ? '' : (selectedSchool?.udise || ''),
        schoolCategory: role === 'Admin' ? '' : (selectedSchool?.category || ''),
      })
    } catch (err) {
      console.error(err)
      alert('Login failed')
    }
  }

  const onSubmitSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signUpWithEmail({ email: signupForm.email, password: signupForm.password, fullName: signupForm.name })
      setAuth({
        role,
        region,
        zone,
        district: role === 'Admin' ? '' : district,
        schoolName: role === 'Admin' ? '' : (selectedSchool?.name || ''),
        udiseCode: role === 'Admin' ? '' : (selectedSchool?.udise || ''),
        schoolCategory: role === 'Admin' ? '' : (selectedSchool?.category || ''),
      })
    } catch (err) {
      console.error(err)
      alert('Signup failed')
    }
  }

  const googleSignIn = async () => {
    try { await signInWithGoogle() } catch (e) { console.error(e) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Left: School & Role Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">School & Role Selection</h2>

          <div className="space-y-4">
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              options={[{ value: 'Student', label: 'Student' }, { value: 'Teacher', label: 'Teacher' }, { value: 'Admin', label: 'Admin' }]}
            />

            {role !== 'Admin' && (
              <>
                <Select
                  label="Region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  options={regions.map((r) => ({ value: r, label: r }))}
                  placeholder="Select region"
                />

                <Select
                  label="Zone"
                  value={zone}
                  onChange={(e) => {
                    setZone(e.target.value)
                    setDistrict('')
                    setSchool('')
                  }}
                  options={zones.map((z) => ({ value: z, label: z }))}
                  placeholder="Select zone"
                />

                <Select
                  label="District"
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value)
                    setSchool('')
                  }}
                  options={(selectedDistricts || []).map((d) => ({ value: d, label: d }))}
                  placeholder="Select district"
                  disabled={!zone}
                />

                <Select
                  label="School"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  options={(selectedSchools || []).map((s) => ({ value: s.name, label: s.name }))}
                  placeholder="Select school"
                  disabled={!district}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UDISE Code</label>
                    <input className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50" readOnly value={selectedSchool?.udise || ''} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Category</label>
                    <input className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50" readOnly value={selectedSchool?.category || ''} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'signup' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('signup')}
            >
              Signup
            </button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={onSubmitLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-md border border-gray-300" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" className="w-full px-4 py-3 rounded-md border border-gray-300" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
              </div>
              <div className="flex items-center justify-between">
                <button type="button" onClick={googleSignIn} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Continue with Google</button>
                <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot Password?</Link>
              </div>
              <button type="submit" className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Login</button>
            </form>
          ) : (
            <form onSubmit={onSubmitSignup} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input className="w-full px-4 py-3 rounded-md border border-gray-300" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input className="w-full px-4 py-3 rounded-md border border-gray-300" value={signupForm.mobile} onChange={(e) => setSignupForm({ ...signupForm, mobile: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-md border border-gray-300" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  className="w-full px-4 py-3 rounded-md border border-gray-300" 
                  value={signupForm.age} 
                  onChange={(e) => setSignupForm({ ...signupForm, age: e.target.value })} 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full px-4 py-3 rounded-md border border-gray-300" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input type="password" className="w-full px-4 py-3 rounded-md border border-gray-300" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                <input type="file" onChange={(e) => setSignupForm({ ...signupForm, profilePic: e.target.files?.[0]?.name || '' })} />
              </div>
              <div className="text-sm text-gray-600">
                School/role info will be attached from the left panel automatically.
              </div>
              <button type="submit" className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Create Account</button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}





