'use client'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import LoginForm from '@/components/LoginForm'
import SchoolSelectionForm from '@/components/SchoolSelectionForm'
import { useState } from 'react'

export default function UnifiedLoginPage() {
  const [step, setStep] = useState<1 | 2>(1)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-start justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg bg-white"
      >
        {step === 1 ? (
          <SchoolSelectionForm onDone={() => setStep(2)} />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-indigo-600" />
              <h1 className="text-lg font-semibold text-gray-900">Login Credentials</h1>
            </div>
            <LoginForm />
          </>
        )}
      </motion.div>
    </div>
  )
}


