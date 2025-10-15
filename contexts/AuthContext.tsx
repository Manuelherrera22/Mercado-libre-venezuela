'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { config, isMockAuthEnabled, getApiUrl, isDevelopment } from '@/lib/config'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'seller' | 'admin'
  avatar?: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  businessInfo?: {
    businessName: string
    rif: string
    businessType: string
  }
  isVerified: boolean
  joinedAt: string
  stats?: {
    totalSales: number
    totalProducts: number
    rating: number
    reviews: number
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  upgradeToSeller: (businessInfo: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isSeller: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser(token)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (token: string) => {
    // Check if it's a mock token
    if (isMockAuthEnabled() && token.startsWith('mock-token-')) {
      const userId = token.replace('mock-token-', '')
      const user = Object.values(mockUsers).find(u => u.id === userId)
      if (user) {
        setUser(user)
        setLoading(false)
        return
      }
    }

    try {
      const response = await axios.get(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
    } catch (error) {
      if (isMockAuthEnabled()) {
        console.warn('Backend not available, clearing invalid token')
      }
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  // Mock users for development
  const mockUsers = {
    'usuario@demo.com': {
      id: '1',
      name: 'Usuario Demo',
      email: 'usuario@demo.com',
      role: 'user' as const,
      isVerified: true,
      joinedAt: new Date().toISOString(),
      stats: {
        totalSales: 0,
        totalProducts: 0,
        rating: 0,
        reviews: 0
      }
    },
    'vendedor@demo.com': {
      id: '2',
      name: 'Vendedor Demo',
      email: 'vendedor@demo.com',
      role: 'seller' as const,
      isVerified: true,
      joinedAt: new Date().toISOString(),
      businessInfo: {
        businessName: 'Mi Tienda Demo',
        rif: 'V-12345678-9',
        businessType: 'individual'
      },
      stats: {
        totalSales: 12450,
        totalProducts: 24,
        rating: 4.8,
        reviews: 156
      }
    },
    'admin@demo.com': {
      id: '3',
      name: 'Admin Demo',
      email: 'admin@demo.com',
      role: 'admin' as const,
      isVerified: true,
      joinedAt: new Date().toISOString(),
      stats: {
        totalSales: 0,
        totalProducts: 0,
        rating: 0,
        reviews: 0
      }
    }
  }

  const apiUrl = getApiUrl()

  const login = async (email: string, password: string) => {
    if (isMockAuthEnabled() && password === 'demo123') {
      // Mock login for development
      const user = mockUsers[email as keyof typeof mockUsers]
      if (user) {
        const token = `mock-token-${user.id}`
        localStorage.setItem('token', token)
        setUser(user)
        return
      }
    }

    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password
      })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
    } catch (error) {
      if (isMockAuthEnabled()) {
        console.warn('Backend not available, using mock authentication')
        throw new Error('Backend no disponible. Usa las cuentas demo para desarrollo.')
      }
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        name,
        email,
        password
      })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
    } catch (error) {
      if (isMockAuthEnabled()) {
        console.warn('Backend not available, using mock authentication')
        throw new Error('Backend no disponible. Usa las cuentas demo para desarrollo.')
      }
      throw error
    }
  }

  const upgradeToSeller = async (businessInfo: any) => {
    const token = localStorage.getItem('token')
    
    if (isMockAuthEnabled() && token?.startsWith('mock-token-')) {
      // Mock upgrade for development
      const currentUser = user
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          role: 'seller' as const,
          businessInfo
        }
        setUser(updatedUser)
        return
      }
    }

    try {
      const response = await axios.post(`${apiUrl}/api/auth/upgrade-seller`, businessInfo, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data.user)
    } catch (error) {
      if (isMockAuthEnabled()) {
        console.warn('Backend not available, using mock authentication')
        throw new Error('Backend no disponible. Usa las cuentas demo para desarrollo.')
      }
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        upgradeToSeller,
        logout,
        isAuthenticated: !!user,
        isSeller: user?.role === 'seller',
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

