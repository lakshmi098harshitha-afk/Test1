import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_URL = 'http://localhost:8000/api'

export default function FavoritesPage() {
  const { token } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const [favRes, outRes] = await Promise.all([
        axios.get(`${API_URL}/favorites`),
        axios.get(`${API_URL}/recommendations/history`),
      ])
      setFavorites(favRes.data)
    } catch (err) {
      console.error('Failed to fetch favorites:', err)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`${API_URL}/favorites/${id}`)
      fetchFavorites()
    } catch (err) {
      console.error('Failed to remove favorite:', err)
    }
  }

  const toggleFavorite = async (outfitId) => {
    try {
      await axios.post(`${API_URL}/favorites/outfit/${outfitId}/toggle`)
      fetchFavorites()
    } catch (err) {
      console.error('Failed to toggle favorite:', err)
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
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-900 mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
          <div className="text-6xl mb-6">⭐</div>
          <h2 className="text-2xl font-bold text-sky-900 mb-4">No Favorites Yet</h2>
          <p className="text-sky-700 max-w-md mx-auto mb-6">
            Save your favorite outfits to see them here for quick reference!
          </p>
          <button
            onClick={() => window.location.href = '/recommendations'}
            className="bg-gradient-to-r from-sky-600 to-sky-500 text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Find Outfits to Save
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-video bg-sky-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
                  alt={fav.outfit_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-sky-900">{fav.outfit_name}</h3>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-sky-700">
                    <span className="font-semibold">Items:</span> {fav.items}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-sky-600 text-white py-2 rounded-lg font-medium hover:bg-sky-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border-2 border-sky-200 rounded-lg text-sky-700 hover:border-sky-400 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}