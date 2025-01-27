// src/api/axiosInstance.js
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { toast } from 'react-hot-toast'

export const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

// interceptor to include the token in every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authState')
  if (token) {
    const { accessToken, tokenType } = JSON.parse(token)
    if (accessToken) {
      config.headers.Authorization = `${tokenType} ${accessToken}`
    }
  }
  return config
})

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401: {
          // Unauthorized - Clear auth state and redirect to login
          localStorage.removeItem('authState')
          toast.error('Session expired. Please login again.')
          window.location.href = '/login'
          break
        }
        case 403: {
          // Forbidden - No permission
          toast.error('You do not have permission to perform this action.')
          break
        }
        case 404: {
          // Not Found - Resource not found
          toast.error('Requested resource not found.')
          break
        }
        case 422: {
          // Validation errors - Display specific validation messages
          if (data.errors) {
            Object.values(data.errors).forEach((errorMessages: any) => {
              errorMessages.forEach((message:any) => toast.error(message))
            })
          } else {
            toast.error(data.message || 'Validation failed.')
          }
          break
        }
        case 500: {
          // Internal Server Error - Server issues
          toast.error(
            'An internal server error occurred. Please try again later.'
          )
          break
        }
        case 429: {
          // Too Many Requests - Rate limit reached
          toast.error('Too many requests. Please try again later.')
          break
        }
        default: {
          // Catch-all for other errors
          toast.error(data.message || 'An error occurred.')
        }
      }
    } else if (error.request) {
      // Network Error
      toast.error(
        'Unable to connect to the server. Please check your internet connection.'
      )
    } else {
      // Other Error
      toast.error('An unexpected error occurred.')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
