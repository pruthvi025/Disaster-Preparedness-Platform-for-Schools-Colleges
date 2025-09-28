'use client'

import { useState } from 'react'
import { Info, Eye, EyeOff } from 'lucide-react'

export default function DemoCredentials() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-blue-800">Student Login (Mr.Rahul A. Jadhav):</span>
              <div className="mt-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-700">Email:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">student@demo.com</code>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-700">Password:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">password123</code>
                </div>
              </div>
            </div>
            
            <div>
              <span className="font-medium text-blue-800">Teacher Login (Prof A.J.Patil):</span>
              <div className="mt-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-700">Email:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">teacher@demo.com</code>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-700">Password:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">password123</code>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-blue-600">
            💡 This is a demo version - no real authentication required!
          </div>
        </div>
      </div>
    </div>
  )
}

