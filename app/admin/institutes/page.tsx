'use client'

import { useState, useEffect } from 'react'
import { Building2, Plus, Search, Edit, Trash2, Users, Globe } from 'lucide-react'

interface Institute {
  id: string
  name: string
  domain: string
  description: string | null
  address: string | null
  phone: string | null
  email: string | null
  website: string | null
  logo: string | null
  established: string | null
  isActive: boolean
  createdAt: string
  _count: {
    Users: number
  }
}

export default function InstitutesManagement() {
  const [institutes, setInstitutes] = useState<Institute[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingInstitute, setEditingInstitute] = useState<Institute | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    logo: '',
    established: '',
  })

  useEffect(() => {
    fetchInstitutes()
  }, [])

  const fetchInstitutes = async () => {
    try {
      const res = await fetch(`/api/admin/institutes?search=${searchTerm}`)
      const data = await res.json()
      setInstitutes(data.institutes || [])
    } catch (error) {
      console.error('Failed to fetch institutes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingInstitute 
        ? `/api/admin/institutes/${editingInstitute.id}`
        : '/api/admin/institutes'
      
      const method = editingInstitute ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Failed to save institute')
        return
      }

      alert(editingInstitute ? 'Institute updated!' : 'Institute created!')
      setShowAddModal(false)
      setEditingInstitute(null)
      resetForm()
      fetchInstitutes()
    } catch (error) {
      console.error('Error saving institute:', error)
      alert('Failed to save institute')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this institute?')) return

    try {
      const res = await fetch(`/api/admin/institutes/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Failed to delete institute')
        return
      }

      alert('Institute deleted!')
      fetchInstitutes()
    } catch (error) {
      console.error('Error deleting institute:', error)
      alert('Failed to delete institute')
    }
  }

  const handleEdit = (institute: Institute) => {
    setEditingInstitute(institute)
    setFormData({
      name: institute.name,
      domain: institute.domain,
      description: institute.description || '',
      address: institute.address || '',
      phone: institute.phone || '',
      email: institute.email || '',
      website: institute.website || '',
      logo: institute.logo || '',
      established: institute.established || '',
    })
    setShowAddModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      domain: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      logo: '',
      established: '',
    })
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingInstitute(null)
    resetForm()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading institutes...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Institute Management</h1>
        <p className="text-gray-600">Manage educational institutes and auto-assign users based on email domains</p>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && fetchInstitutes()}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Institute
        </button>
      </div>

      {/* Institutes Grid */}
      {institutes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No institutes found</p>
          <p className="text-gray-500 text-sm mt-2">Add your first institute to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutes.map((institute) => (
            <div
              key={institute.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              {/* Logo & Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {institute.logo ? (
                    <img src={institute.logo} alt={institute.name} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{institute.name}</h3>
                    <p className="text-sm text-gray-500">Est. {institute.established || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Domain */}
              <div className="mb-3 flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded">{institute.domain}</span>
              </div>

              {/* Description */}
              {institute.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{institute.description}</p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{institute._count.Users} users</span>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    institute.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {institute.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEdit(institute)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(institute.id)}
                  disabled={institute._count.Users > 0}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium ${
                    institute._count.Users > 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-50 hover:bg-red-100 text-red-600'
                  }`}
                  title={institute._count.Users > 0 ? 'Cannot delete institute with users' : 'Delete institute'}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingInstitute ? 'Edit Institute' : 'Add New Institute'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institute Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., VIIT Pune"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Domain <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., viit.ac.in"
                  />
                  <p className="text-xs text-gray-500 mt-1">Users with this email domain will be auto-assigned</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief description of the institute"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Complete address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91-20-12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="info@institute.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.institute.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Established</label>
                <input
                  type="text"
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1992"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  {editingInstitute ? 'Update Institute' : 'Add Institute'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
