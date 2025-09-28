'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Bell, 
  Shield, 
  Settings as SettingsIcon,
  Camera,
  Save,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Globe,
  Accessibility,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import { GovernmentHeader, GovernmentFooter } from '@/components/branding'
import { BackButton } from '@/components/ui'

interface SettingCategory {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    name: 'Mr.Rahul A. Jadhav',
    email: 'alex.johnson@school.edu',
    school: 'Government Model School, Chandigarh',
    role: 'Student'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    inAppNotifications: true
  })

  const [privacySettings, setPrivacySettings] = useState({
    twoFactorAuth: false
  })

  const [appPreferences, setAppPreferences] = useState({
    theme: 'light',
    language: 'english',
    fontSize: 'medium',
    highContrast: false
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Keep server and client renders consistent: detect screen size after mount
  // and avoid using window during the initial render to prevent hydration mismatch.
  // Sidebar will default to closed on small screens during SSR, and open automatically on lg screens after mount.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsLargeScreen(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const categories: SettingCategory[] = [
    {
      id: 'profile',
      name: 'Profile Settings',
      icon: <User className="w-5 h-5" />,
      description: 'Manage your personal information and avatar'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: 'Configure alert and notification preferences'
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      icon: <Shield className="w-5 h-5" />,
      description: 'Password, security, and privacy settings'
    },
    {
      id: 'preferences',
      name: 'App Preferences',
      icon: <SettingsIcon className="w-5 h-5" />,
      description: 'Theme, language, and accessibility options'
    }
  ]

  const handleSaveProfile = () => {
    // Handle profile save logic
    console.log('Saving profile:', profileData)
  }

  const handleSavePassword = () => {
    // Handle password save logic
    console.log('Saving password')
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }))
  }

  const handleAppPreferenceChange = (key: string, value: string | boolean) => {
    setAppPreferences(prev => ({ ...prev, [key]: value }))
  }

  const renderProfileSettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
        <p className="text-gray-600">Manage your personal information and profile picture</p>
      </div>

      {/* Avatar Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Upload New Photo</h4>
            <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
            <button className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition-colors">
              Choose File
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">School/College</label>
            <input
              type="text"
              value={profileData.school}
              onChange={(e) => setProfileData(prev => ({ ...prev, school: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={profileData.role}
              onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleSaveProfile}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-lg"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  )

  const renderNotificationSettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Settings</h2>
        <p className="text-gray-600">Choose how you want to be notified about important updates</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-6">
          {/* Email Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Email Alerts</h3>
              <p className="text-sm text-gray-500">Receive important updates via email</p>
            </div>
            <button
              onClick={() => handleNotificationChange('emailAlerts', !notificationSettings.emailAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.emailAlerts ? 'bg-indigo-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* SMS Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">SMS Alerts</h3>
              <p className="text-sm text-gray-500">Get emergency notifications via SMS</p>
            </div>
            <button
              onClick={() => handleNotificationChange('smsAlerts', !notificationSettings.smsAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.smsAlerts ? 'bg-indigo-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* In-App Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">In-App Notifications</h3>
              <p className="text-sm text-gray-500">Show notifications within the application</p>
            </div>
            <button
              onClick={() => handleNotificationChange('inAppNotifications', !notificationSettings.inAppNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.inAppNotifications ? 'bg-indigo-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.inAppNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderPrivacySettings = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy & Security</h2>
        <p className="text-gray-600">Manage your account security and privacy settings</p>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              onClick={handleSavePassword}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
            >
              Update Password
            </motion.button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Enable 2FA</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => handlePrivacyChange('twoFactorAuth', !privacySettings.twoFactorAuth)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              privacySettings.twoFactorAuth ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                privacySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  )

  const renderAppPreferences = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">App Preferences</h2>
        <p className="text-gray-600">Customize your app experience and accessibility options</p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleAppPreferenceChange('theme', 'light')}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
              appPreferences.theme === 'light' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Sun className="w-5 h-5" />
            Light
          </button>
          <button
            onClick={() => handleAppPreferenceChange('theme', 'dark')}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
              appPreferences.theme === 'dark' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Moon className="w-5 h-5" />
            Dark
          </button>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language</h3>
        <div className="relative">
          <select
            value={appPreferences.language}
            onChange={(e) => handleAppPreferenceChange('language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
          >
            <option value="english">English</option>
            <option value="hindi">हिन्दी (Hindi)</option>
            <option value="punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
          </select>
          <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <div className="flex gap-2">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleAppPreferenceChange('fontSize', size)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    appPreferences.fontSize === size
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">High Contrast Mode</h4>
              <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
            </div>
            <button
              onClick={() => handleAppPreferenceChange('highContrast', !appPreferences.highContrast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                appPreferences.highContrast ? 'bg-indigo-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  appPreferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderContent = () => {
    switch (activeCategory) {
      case 'profile':
        return renderProfileSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'privacy':
        return renderPrivacySettings()
      case 'preferences':
        return renderAppPreferences()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackButton href="/student/dashboard" label="Back to Dashboard" />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ⚙️ Settings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your experience and manage your account preferences
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80"
          >
            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg"
              >
                <Menu className="w-5 h-5" />
                Settings Menu
                <ChevronDown className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Sidebar Content */}
            <AnimatePresence>
              {(sidebarOpen || isLargeScreen) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6 space-y-2"
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-indigo-500 text-white shadow-lg'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {category.icon}
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className={`text-xs ${
                          activeCategory === category.id ? 'text-indigo-100' : 'text-gray-500'
                        }`}>
                          {category.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
