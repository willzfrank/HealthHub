import React, { createContext, useContext, useState, useEffect } from 'react'
import { AuthState, User } from '../types'

interface AuthContextType extends AuthState {
  login: (authData: any) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'authState'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY)
    if (storedAuth) {
      try {
        return JSON.parse(storedAuth)
      } catch (error) {
        console.error('Error parsing stored auth state:', error)
      }
    }
    return {
      isAuthenticated: false,
      accessToken: null,
      tokenType: null,
      expiresAt: null,
      user: null,
      role: null,
      facility: null,
      environment: null,
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState))
  }, [authState])

  const login = (authData: any) => {
    const {
      access_token,
      token_type,
      expires_at,
      user,
      role,
      facility,
      environment,
    } = authData
    setAuthState({
      isAuthenticated: true,
      accessToken: access_token,
      tokenType: token_type,
      expiresAt: expires_at,
      user,
      role,
      facility,
      environment,
    })
  }

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      tokenType: null,
      expiresAt: null,
      user: null,
      role: null,
      facility: null,
      environment: null,
    })
    localStorage.removeItem(STORAGE_KEY)
  }

  const updateUser = (userData: Partial<User>) => {
    setAuthState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
    }))
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
