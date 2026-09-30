import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const API_URL = 'http://localhost:8000/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setLoading(false)
  }, [token])

  const register = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/register`, { email, password })
    localStorage.setItem('token', res.data.access_token)
    setToken(res.data.access_token)
    return res.data
  }

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, new URLSearchParams({
      username: email,
      password: password
    }))
    localStorage.setItem('token', res.data.access_token)
    setToken(res.data.access_token)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
    navigate('/')
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}