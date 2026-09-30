import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_URL = 'http://localhost:8000/api'

const CATEGORIES = [
  'T-Shirts',
  'Shirts',
  'Pants',
  'Jeans',
  'Dresses',
  'Jackets',
  'Shoes',
  'Accessories',
]

export default function WardrobePage() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    fetchWardrobe()
  }, [])

  const fetchWardrobe = async () => {
    try {
      const res = await axios.get(`${API_URL}/wardrobe`)
      setItems(res.data)
    } catch (err) {
      console.error('Failed to fetch wardrobe:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = async (itemData) => {
    try {
      await axios.post(`${API_URL}/wardrobe`, itemData)
      fetchWardrobe()
      setShowAddModal(false)
    } catch (err) {
      console.error('Failed to add item:', err)
    }
  }

  const handleUpdateItem = async (itemData) => {
    try {
      await axios.put(`${API_URL}/wardrobe/${editingItem.id}`, itemData)
      fetchWardrobe()
      setEditingItem(null)
    } catch (err) {
      console.error('Failed to update item:', err)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/wardrobe/${id}`)
      fetchWardrobe()
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  const getItemIcon = (category) => {
    const icons = {
      'T-Shirts': '👕',
      Shirts: '👔',
      Pants: '👖',
      Jeans: '👖',
      Dresses: '👗',
      Jackets: '🧥',
      Shoes: '👟',
      Accessories: '🧣',
    }
    return icons[category] || '👕'
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-sky-900">My Wardrobe</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          + Add Item
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setItems([])}
          className="px-4 py-2 rounded-lg font-medium text-sky-700 bg-sky-100 hover:bg-sky-200 transition-colors"
        >
          All Items
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => {
              const filtered = items.filter((item) => item.category === category)
              setItems(filtered)
            }}
            className="px-4 py-2 rounded-lg font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
          <div className="text-6xl mb-6">_empty</div>
          <h2 className="text-2xl font-bold text-sky-900 mb-4">Your Wardrobe is Empty</h2>
          <p className="text-sky-700 max-w-md mx-auto mb-6">
            Add clothing items to build your personal wardrobe and get better recommendations!
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-sky-600 to-sky-500 text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
              <div className="aspect-square bg-sky-100 overflow-hidden">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-sky-700 bg-sky-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-sky-900 mb-1">{item.name}</h3>
                <p className="text-sky-700 text-sm mb-3">{item.color || 'No color specified'}</p>
                <div className="flex justify-between items-center pt-4 border-t border-sky-100">
                  <span className="font-semibold text-sky-900">{item.price || 'Free'}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-sky-600 hover:text-sky-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <AddEditItemModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddItem}
        />
      )}

      {editingItem && (
        <AddEditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSubmit={handleUpdateItem}
        />
      )}
    </div>
  )
}

function AddEditItemModal({ item, onClose, onSubmit }) {
  const [formData, setFormData] = useState(
    item || {
      name: '',
      category: 'T-Shirts',
      color: '',
      price: '',
      description: '',
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-sky-500 p-6 text-white">
          <h2 className="text-2xl font-bold">
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-sky-900 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sky-900 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-sky-900 mb-2">Color</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              placeholder="e.g., Blue, White"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sky-900 mb-2">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              placeholder="e.g., $50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sky-900 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 transition-colors"
            >
              {item ? 'Update' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}