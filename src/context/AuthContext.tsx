import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { AuthState, User } from '../types/types'

interface AuthContextType extends AuthState {
  login: (authData: any) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const COOKIE_KEY = 'authState'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedAuth = Cookies.get(COOKIE_KEY)
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
    Cookies.set(COOKIE_KEY, JSON.stringify(authState), {
      secure: true,
      sameSite: 'Strict',
      expires: 7,
    })
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
    Cookies.remove(COOKIE_KEY)
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
