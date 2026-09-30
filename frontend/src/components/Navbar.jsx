import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-sky-900">FitStylist</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Link to="/dashboard" className="text-sky-700 hover:text-sky-900 font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/recommendations" className="text-sky-700 hover:text-sky-900 font-medium transition-colors">
                  Recommendations
                </Link>
                <Link to="/wardrobe" className="text-sky-700 hover:text-sky-900 font-medium transition-colors">
                  Wardrobe
                </Link>
                <Link to="/favorites" className="text-sky-700 hover:text-sky-900 font-medium transition-colors">
                  Favorites
                </Link>
                <Link to="/profile" className="text-sky-700 hover:text-sky-900 font-medium transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sky-700 hover:text-sky-900 font-medium transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}