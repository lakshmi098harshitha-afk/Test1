import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_URL = 'http://localhost:8000/api'

const OCCASIONS = ['Work', 'Casual', 'Formal', 'Party', 'Evening', 'Summer', 'Winter']
const STYLES = ['Modern', 'Classic', 'Chic', 'Trendy', 'Minimalist']
const BUDGETS = ['$25-$50', '$50-$100', '$100-$200', '$200+']
const GENDERS = ['Male', 'Female', 'Non-binary', 'Other']

export default function ProfilePage() {
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    height: '',
    clothing_preferences: '',
    favorite_colors: '',
    preferred_styles: [],
    occasions: [],
    budget: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile`)
      setFormData(res.data || {})
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await axios.put(`${API_URL}/profile`, {
        ...formData,
        preferred_styles: formData.preferred_styles.join(','),
        occasions: formData.occasions.join(','),
      })
      alert('Profile updated successfully!')
    } catch (err) {
      console.error('Failed to update profile:', err)
      alert('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const toggleArrayField = (field, value) => {
    setFormData((prev) => {
      const current = prev[field]
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((item) => item !== value) }
      }
      return { ...prev, [field]: [...current, value] }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-900 mb-8">Your Style Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-sky-900 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              >
                <option value="">Select gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                placeholder="Your age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Height</label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                placeholder="Your height (e.g., 5'10\")"
              />
            </div>
          </div>
        </div>

        {/* Style Preferences */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-sky-900 mb-6">Style Preferences</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">
                Clothing Preferences
              </label>
              <textarea
                value={formData.clothing_preferences}
                onChange={(e) => setFormData({ ...formData, clothing_preferences: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                rows="3"
                placeholder="Describe your preferred clothing styles..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">
                Favorite Colors
              </label>
              <input
                type="text"
                value={formData.favorite_colors}
                onChange={(e) => setFormData({ ...formData, favorite_colors: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                placeholder="e.g., Blue, White, Grey"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">
                Preferred Styles
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleArrayField('preferred_styles', style)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      formData.preferred_styles.includes(style)
                        ? 'bg-sky-600 text-white'
                        : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">
                Occasions
              </label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map((occasion) => (
                  <button
                    key={occasion}
                    type="button"
                    onClick={() => toggleArrayField('occasions', occasion)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      formData.occasions.includes(occasion)
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              >
                <option value="">Select your budget</option>
                {BUDGETS.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}