'use client'

import { GraduationCap } from 'lucide-react'

type Role = 'Student' | 'Teacher' | 'Admin'

export default function RoleSelector({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="w-5 h-5 text-indigo-600" />
        <span className="text-sm font-medium text-gray-700">Select Role</span>
      </div>
      <div className="inline-flex rounded-lg bg-gray-100 p-1">
        {(['Student','Teacher','Admin'] as Role[]).map(r => (
          <button
            key={r}
            onClick={() => onChange(r)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${role === r ? 'bg-white shadow text-indigo-700' : 'text-gray-700 hover:text-gray-900'}`}
            type="button"
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  )
}


