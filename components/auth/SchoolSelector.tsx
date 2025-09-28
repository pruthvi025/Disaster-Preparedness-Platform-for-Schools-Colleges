'use client'

import { useMemo } from 'react'
import { schools } from '@/data/schools'

type Props = {
  zone: string
  district: string
  schoolName: string
  onChange: (next: { zone?: string; district?: string; schoolName?: string }) => void
}

export default function SchoolSelector({ zone, district, schoolName, onChange }: Props) {
  const zones = useMemo(() => Array.from(new Set(schools.map(s => s.zone))), [])
  const districts = useMemo(() => Array.from(new Set(schools.filter(s => s.zone === zone).map(s => s.district))), [zone])
  const filteredSchools = useMemo(() => schools.filter(s => s.zone === zone && s.district === district), [zone, district])
  const selected = filteredSchools.find(s => s.schoolName === schoolName)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
        <select className="w-full rounded-lg border px-3 py-2 shadow-sm" value={zone} onChange={(e)=>onChange({ zone: e.target.value, district: '', schoolName: '' })}>
          <option value="">Select zone</option>
          {zones.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
        <select className="w-full rounded-lg border px-3 py-2 shadow-sm" value={district} onChange={(e)=>onChange({ district: e.target.value, schoolName: '' })} disabled={!zone}>
          <option value="">Select district</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
        <select className="w-full rounded-lg border px-3 py-2 shadow-sm" value={schoolName} onChange={(e)=>onChange({ schoolName: e.target.value })} disabled={!district}>
          <option value="">Select school</option>
          {filteredSchools.map(s => <option key={s.udiseCode} value={s.schoolName}>{s.schoolName}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">UDISE Code</label>
          <input className="w-full rounded-lg border px-3 py-2 bg-gray-50" readOnly value={selected?.udiseCode || ''} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School Category</label>
          <input className="w-full rounded-lg border px-3 py-2 bg-gray-50" readOnly value={selected?.schoolCategory || ''} />
        </div>
      </div>
    </div>
  )
}












