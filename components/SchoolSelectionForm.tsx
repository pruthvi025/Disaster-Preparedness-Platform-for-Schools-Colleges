'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { listZones, listDistricts, listSchools } from '@/data/schools'
import { useAuth } from '@/context/AuthContext'

type Inputs = {
  zone: string
  district: string
  schoolName: string
  role: 'Student' | 'Teacher' | 'Admin' | ''
}

export default function SchoolSelectionForm({ onDone }: { onDone: () => void }) {
  const { setAuth } = useAuth()
  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: { zone: '', district: '', schoolName: '', role: '' }
  })

  const zone = watch('zone')
  const district = watch('district')
  const role = watch('role')

  useEffect(() => {
    if (!zone) setValue('district', '')
  }, [zone])
  useEffect(() => {
    if (!district) setValue('schoolName', '')
  }, [district])

  const onSubmit = (data: Inputs) => {
    const school = listSchools(data.district).find(s => s.schoolName === data.schoolName)
    setAuth({
      role: data.role,
      zone: data.role === 'Admin' ? '' : data.zone,
      district: data.role === 'Admin' ? '' : data.district,
      schoolName: data.role === 'Admin' ? '' : (school?.schoolName || ''),
      udiseCode: data.role === 'Admin' ? '' : (school?.udiseCode || ''),
      schoolCategory: data.role === 'Admin' ? '' : (school?.schoolCategory || '')
    })
    onDone()
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-indigo-600" />
        <h2 className="font-semibold text-gray-900">Select School & Role</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select className={`w-full rounded-md border px-3 py-2 ${errors.role ? 'border-red-300' : 'border-gray-300'}`} {...register('role', { required: 'Role is required' })}>
          <option value="">Select role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role.message}</p>}
      </div>

      {role !== 'Admin' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
            <select className={`w-full rounded-md border px-3 py-2 ${errors.zone ? 'border-red-300' : 'border-gray-300'}`} {...register('zone', { required: 'Zone is required' })}>
              <option value="">Select zone</option>
              {listZones().map(z => <option key={z} value={z}>{z}</option>)}
            </select>
            {errors.zone && <p className="text-xs text-red-600 mt-1">{errors.zone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select className={`w-full rounded-md border px-3 py-2 ${errors.district ? 'border-red-300' : 'border-gray-300'}`} {...register('district', { required: 'District is required' })} disabled={!zone}>
              <option value="">Select district</option>
              {listDistricts(zone).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.district && <p className="text-xs text-red-600 mt-1">{errors.district.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
            <select className={`w-full rounded-md border px-3 py-2 ${errors.schoolName ? 'border-red-300' : 'border-gray-300'}`} {...register('schoolName', { required: 'School is required' })} disabled={!district}>
              <option value="">Select school</option>
              {listSchools(district).map(s => <option key={s.udiseCode} value={s.schoolName}>{s.schoolName}</option>)}
            </select>
            {errors.schoolName && <p className="text-xs text-red-600 mt-1">{errors.schoolName.message}</p>}
          </div>

          {/* readonly details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UDISE Code</label>
              <input className="w-full rounded-md border px-3 py-2 bg-gray-50" readOnly value={(() => { const s = listSchools(district).find(x => x.schoolName === watch('schoolName')); return s?.udiseCode || '' })()} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Category</label>
              <input className="w-full rounded-md border px-3 py-2 bg-gray-50" readOnly value={(() => { const s = listSchools(district).find(x => x.schoolName === watch('schoolName')); return s?.schoolCategory || '' })()} />
            </div>
          </div>
        </>
      )}

      <button type="submit" className="w-full rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:scale-[1.01] transition">
        Proceed to Login
      </button>
    </motion.form>
  )
}












