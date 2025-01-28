// src/api/axiosInstance.ts
import axios from 'axios'
import Cookies from 'js-cookie'
import { baseUrl } from '../utils/constants'
import { toast } from 'react-hot-toast'

export const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

interface AuthState {
  access_token: string
  token_type: string
  expires_at: string
  user: {
    last_name: string
    middle_name: string | null
    first_name: string
    facility_id: number | null
    email: string
    phone: string
    id: number
    last_login: string
    login_count: number
    active: number
    facility_name: string | null
  }
  role: {
    id: number
    slug: string
    name: string
  }
  facility: null
  environment: string
}

// Cookie configuration
const COOKIE_NAME = 'auth_state'
const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: 'strict' as const,
  path: '/',
}

// Helper functions for cookie management
export const setAuthCookie = (authState: AuthState) => {
  Cookies.set(COOKIE_NAME, JSON.stringify(authState), COOKIE_OPTIONS)
}

export const getAuthCookie = (): AuthState | null => {
  const cookie = Cookies.get(COOKIE_NAME)
  if (cookie) {
    try {
      return JSON.parse(cookie)
    } catch (error) {
      console.error('Error parsing auth cookie:', error)
      removeAuthCookie()
      return null
    }
  }
  return null
}

export const removeAuthCookie = () => {
  Cookies.remove(COOKIE_NAME, { path: '/' })
}

// interceptor to include the token in every request
axiosInstance.interceptors.request.use((config) => {
  const authState = getAuthCookie()
  if (authState?.access_token) {
    config.headers.Authorization = `${authState.token_type} ${authState.access_token}`
  }
  return config
})

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401: {
          removeAuthCookie()
          toast.error('Session expired. Please login again.')
          window.location.href = '/login'
          break
        }
        case 403: {
          toast.error('You do not have permission to perform this action.')
          break
        }
        case 404: {
          toast.error('Requested resource not found.')
          break
        }
        case 422: {
          if (data.errors) {
            Object.values(data.errors).forEach((errorMessages: any) => {
              errorMessages.forEach((message: any) => toast.error(message))
            })
          } else {
            toast.error(data.message || 'Validation failed.')
          }
          break
        }
        case 500: {
          toast.error(
            'An internal server error occurred. Please try again later.'
          )
          break
        }
        case 429: {
          toast.error('Too many requests. Please try again later.')
          break
        }
        default: {
          toast.error(data.message || 'An error occurred.')
        }
      }
    } else if (error.request) {
      toast.error(
        'Unable to connect to the server. Please check your internet connection.'
      )
    } else {
      toast.error('An unexpected error occurred.')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
