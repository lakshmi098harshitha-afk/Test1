import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_URL = 'http://localhost:8000/api'

const OCCASIONS = ['Work', 'Casual', 'Formal', 'Party', 'Evening']
const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter']
const STYLES = ['Modern', 'Classic', 'Chic', 'Trendy', 'Minimalist']
const BUDGETS = ['$25-$50', '$50-$100', '$100-$200', '$200+']

export default function RecommendationsPage() {
  const { token } = useAuth()
  const [occasion, setOccasion] = useState('Casual')
  const [season, setSeason] = useState('Spring')
  const [style, setStyle] = useState('Modern')
  const [budget, setBudget] = useState('$50-$100')
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateRecommendation = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/recommendations/preview`, {
        params: { occasion, season, style, budget },
      })
      setRecommendation(res.data)
    } catch (err) {
      console.error('Failed to generate recommendation:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveRecommendation = async () => {
    if (!recommendation) return
    try {
      const res = await axios.post(`${API_URL}/recommendations/`, {
        name: `AI Recommendation - ${occasion}`,
        description: `Generated for ${occasion} occasion`,
        occasion: recommendation.occasion,
        season: recommendation.season,
        style: recommendation.style,
        budget: recommendation.total_budget || budget,
        items: [
          { item_id: 1, name: recommendation.top },
          { item_id: 2, name: recommendation.bottom },
          { item_id: 3, name: recommendation.shoes },
          { item_id: 4, name: recommendation.accessory },
        ],
        image_url: recommendation.image_url,
        is_favorite: 'false',
      })
      alert('Outfit saved to favorites!')
    } catch (err) {
      console.error('Failed to save recommendation:', err)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-900 mb-8">AI Outfit Recommendations</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 sticky top-6">
            <h2 className="text-xl font-bold text-sky-900">Set Your Preferences</h2>

            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              >
                {OCCASIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              >
                {SEASONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              >
                {STYLES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-900 mb-2">Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              >
                {BUDGETS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateRecommendation}
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Outfit'}
            </button>
          </div>
        </div>

        {/* Recommendation Display */}
        <div className="lg:col-span-2">
          {recommendation ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-sky-600 to-sky-500 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {occasion} Outfit Recommendation
                </h2>
                <p className="text-sky-100">Perfect for {season} with {style} style</p>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-sky-900 mb-4">Recommended Items</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Top', value: recommendation.top },
                          { label: 'Bottom', value: recommendation.bottom },
                          { label: 'Shoes', value: recommendation.shoes },
                          { label: 'Accessory', value: recommendation.accessory },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
                            <div className="w-12 h-12 bg-sky-200 rounded-lg flex items-center justify-center text-2xl">
                              👕
                            </div>
                            <div>
                              <p className="font-semibold text-sky-900">{item.label}</p>
                              <p className="text-sky-700">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={saveRecommendation}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold transition-all"
                    >
                      Save to Favorites
                    </button>
                  </div>
                  <div>
                    <div className="aspect-video bg-sky-100 rounded-2xl overflow-hidden mb-6">
                      <img
                        src={recommendation.image_url}
                        alt="Outfit recommendation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-sky-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-sky-900 mb-4">Budget Breakdown</h3>
                      <div className="space-y-2">
                        {recommendation.budget_breakdown && (
                          <>
                            <div className="flex justify-between">
                              <span>Top:</span>
                              <span className="font-semibold">
                                {recommendation.budget_breakdown.top}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Bottom:</span>
                              <span className="font-semibold">
                                {recommendation.budget_breakdown.bottom}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shoes:</span>
                              <span className="font-semibold">
                                {recommendation.budget_breakdown.shoes}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="text-6xl mb-6">✨</div>
              <h2 className="text-2xl font-bold text-sky-900 mb-4">Ready to Style?</h2>
              <p className="text-sky-700 max-w-md mx-auto">
                Select your preferences on the left and click Generate to get personalized outfit recommendations!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}