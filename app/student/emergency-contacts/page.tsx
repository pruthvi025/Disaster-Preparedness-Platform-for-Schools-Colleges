'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Plus, 
  X, 
  Upload, 
  Star,
  AlertTriangle,
  User,
  Mail,
  Home,
  FileText,
  Heart
} from 'lucide-react'
import { BackButton } from '@/components/ui'

interface Contact {
  id: number
  name: string
  relationship: string
  phone: string
  email: string
  address?: string
  notes?: string
  avatar?: string
  primary: boolean
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    relationship: "Brother",
    phone: "+1 234 567 890",
    email: "john@example.com",
    address: "123 Main St, City, State",
    notes: "Allergic to peanuts",
    primary: true
  },
  {
    id: 2,
    name: "Sarah Lee",
    relationship: "Friend",
    phone: "+1 987 654 321",
    email: "sarah@example.com",
    address: "456 Oak Ave, City, State",
    notes: "Diabetic",
    primary: false
  },
  {
    id: 3,
    name: "Dr. Maria Garcia",
    relationship: "Doctor",
    phone: "+1 555 123 456",
    email: "maria.garcia@hospital.com",
    address: "789 Medical Center, City, State",
    notes: "Emergency physician",
    primary: false
  },
  {
    id: 4,
    name: "Mike Johnson",
    relationship: "Neighbor",
    phone: "+1 333 444 555",
    email: "mike.j@email.com",
    address: "321 Elm Street, City, State",
    notes: "Has spare house key",
    primary: false
  }
]

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    primary: false
  })

  const handleAddContact = () => {
    setEditingContact(null)
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      primary: false
    })
    setIsModalOpen(true)
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email,
      address: contact.address || '',
      notes: contact.notes || '',
      primary: contact.primary
    })
    setIsModalOpen(true)
  }

  const handleSaveContact = () => {
    if (editingContact) {
      // Update existing contact
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, ...formData }
          : contact
      ))
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now(),
        ...formData
      }
      setContacts([...contacts, newContact])
    }
    setIsModalOpen(false)
  }

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleSOS = () => {
    alert('🆘 SOS Alert!\n\nSending emergency message with your location to all primary contacts...\n\nEmergency services have been notified.')
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleAction = (action: string, contact: Contact) => {
    switch (action) {
      case 'call':
        alert(`📞 Calling ${contact.name} at ${contact.phone}`)
        break
      case 'sms':
        alert(`💬 Opening SMS to ${contact.name}`)
        break
      case 'whatsapp':
        alert(`📱 Opening WhatsApp to ${contact.name}`)
        break
      case 'location':
        alert(`📍 Sharing location with ${contact.name}`)
        break
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <BackButton href="/student/dashboard" label="Back to Dashboard" />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="text-4xl">🆘</span>
            Emergency Contacts
          </h1>
          <p className="text-lg text-gray-600">Manage your emergency contacts and safety information</p>
        </motion.div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 relative group"
            >
              {/* Primary Badge */}
              {contact.primary && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  ICE
                </div>
              )}

              {/* Contact Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {contact.avatar ? (
                    <img 
                      src={contact.avatar} 
                      alt={contact.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    getInitials(contact.name)
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              </div>

              {/* Caution/alert note removed per requirements */}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction('call', contact)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction('sms', contact)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  SMS
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction('whatsapp', contact)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction('location', contact)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Location
                </motion.button>
              </div>

              {/* Edit/Delete Actions */}
              <div className="mt-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEditContact(contact)}
                  className="flex-1 px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  Edit
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteContact(contact.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Contact Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddContact}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center z-10"
        >
          <Plus className="w-6 h-6" />
        </motion.button>

        {/* SOS Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSOS}
          className="fixed bottom-6 left-6 w-16 h-16 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center z-10"
        >
          <AlertTriangle className="w-8 h-8" />
        </motion.button>

        {/* Add/Edit Contact Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingContact ? 'Edit Contact' : 'Add New Contact'}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter full name"
                      />
                    </div>

                    {/* Relationship */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Heart className="w-4 h-4 inline mr-2" />
                        Relationship *
                      </label>
                      <input
                        type="text"
                        value={formData.relationship}
                        onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., Brother, Friend, Doctor"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+1 234 567 890"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="email@example.com"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Home className="w-4 h-4 inline mr-2" />
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="123 Main St, City, State"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Medical Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows={3}
                        placeholder="Any important medical information or notes..."
                      />
                    </div>

                    {/* Primary Contact Toggle */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="primary"
                        checked={formData.primary}
                        onChange={(e) => setFormData({...formData, primary: e.target.checked})}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="primary" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Primary Emergency Contact (ICE)
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveContact}
                      className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {editingContact ? 'Update Contact' : 'Add Contact'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
