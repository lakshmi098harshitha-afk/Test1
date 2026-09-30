import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_URL = 'http://localhost:8000/api'

export default function DashboardPage() {
  const { token } = useAuth()
  const [profile, setProfile] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [wardrobeCount, setWardrobeCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [profileRes, recRes, wardrobeRes] = await Promise.all([
        axios.get(`${API_URL}/profile`),
        axios.get(`${API_URL}/recommendations/history`),
        axios.get(`${API_URL}/wardrobe`),
      ])
      setProfile(profileRes.data)
      setRecommendations(recRes.data.slice(0, 3))
      setWardrobeCount(wardrobeRes.data.length)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-500 rounded-2xl p-8 text-white shadow-xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Welcome back{profile?.name ? `, ${profile.name}` : ''}!
            </h1>
            <p className="text-sky-100 text-lg">
              Ready to style your day? Get personalized outfit recommendations or check your wardrobe.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/recommendations"
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-sky-500"
            >
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-sky-900 mb-2">New Outfit</h3>
              <p className="text-sky-700">Get AI-generated recommendations</p>
            </Link>
            <Link
              to="/wardrobe"
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-purple-500"
            >
              <div className="text-4xl mb-4">👗</div>
              <h3 className="text-xl font-bold text-sky-900 mb-2">Wardrobe</h3>
              <p className="text-sky-700">{wardrobeCount} items in your closet</p>
            </Link>
            <Link
              to="/favorites"
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-pink-500"
            >
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-sky-900 mb-2">Favorites</h3>
              <p className="text-sky-700">Your saved outfits</p>
            </Link>
          </div>

          {/* Today's Style Suggestion */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-sky-900 mb-4">Today's Style Suggestion</h2>
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
                    <div className="w-16 h-16 bg-sky-200 rounded-lg flex items-center justify-center text-2xl">
                      👗
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sky-900">{rec.name}</h3>
                      <p className="text-sky-700">{rec.occasion} outfit</p>
                    </div>
                    <button className="text-sky-600 hover:text-sky-800">View</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sky-700 italic">Start building your wardrobe to get recommendations!</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-sky-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
                <span className="text-sky-700">Wardrobe Items</span>
                <span className="font-bold text-sky-900">{wardrobeCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-700">Saved Outfits</span>
                <span className="font-bold text-purple-900">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                <span className="text-pink-700">Style Tags</span>
                <span className="font-bold text-pink-900">3</span>
              </div>
            </div>
          </div>

          <Link
            to="/profile"
            className="block bg-gradient-to-r from-sky-600 to-sky-500 rounded-2xl p-6 text-white text-center hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-bold mb-2">Complete Your Profile</h3>
            <p className="text-sky-100">Get better recommendations</p>
          </Link>
        </div>
      </div>
    </div>
  )
}