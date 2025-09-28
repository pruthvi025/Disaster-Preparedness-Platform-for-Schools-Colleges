'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  Users,
  Plus,
  Save,
  Eye,
  Send
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateAssignmentPage() {
  const router = useRouter()
  const [assignmentType, setAssignmentType] = useState('quiz')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const assignmentTypes = [
    { id: 'quiz', name: 'Quiz', icon: <FileText className="w-5 h-5" />, color: 'blue' },
    { id: 'project', name: 'Project', icon: <FileText className="w-5 h-5" />, color: 'green' },
    { id: 'homework', name: 'Homework', icon: <FileText className="w-5 h-5" />, color: 'purple' },
    { id: 'exam', name: 'Exam', icon: <FileText className="w-5 h-5" />, color: 'red' }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Assignment created successfully!')
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Assignment</h1>
          </div>
          <p className="text-lg text-gray-600">
            Create engaging assignments and quizzes for your students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Assignment Details</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Assignment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Assignment Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {assignmentTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setAssignmentType(type.id)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          assignmentType === type.id
                            ? `${getColorClasses(type.color)} border-current`
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          {type.icon}
                          <span className="text-sm font-medium">{type.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assignment Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
                  <input
                    type="text"
                    placeholder="Enter assignment title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the assignment requirements and objectives"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Due Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <div className="relative">
                      <Calendar className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
                    <div className="relative">
                      <Clock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="time"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Points and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Points</label>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      placeholder="60"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                  <textarea
                    rows={3}
                    placeholder="Provide clear instructions for students"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isSubmitting ? 'Creating...' : 'Create Assignment'}</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Preview</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Use clear, specific instructions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Set realistic deadlines</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Provide examples when helpful</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Consider different learning styles</p>
                </div>
              </div>
            </div>

            {/* Assignment Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Assignments Created</span>
                  <span className="text-lg font-semibold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="text-lg font-semibold text-green-600">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-lg font-semibold text-blue-600">94%</span>
                </div>
              </div>
            </div>

            {/* Recent Assignments */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Fire Safety Quiz</p>
                  <p className="text-xs text-gray-500">Due: Dec 15, 2024</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Emergency Response Project</p>
                  <p className="text-xs text-gray-500">Due: Dec 20, 2024</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Disaster Preparedness Exam</p>
                  <p className="text-xs text-gray-500">Due: Dec 22, 2024</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}


