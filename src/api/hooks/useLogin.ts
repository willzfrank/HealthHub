import { useState } from 'react'
import { useMutation } from 'react-query'
import { axiosInstance, setAuthCookie } from '../../api/axiosInstance'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface LoginCredentials {
  email: string
  password: string
}

interface UseLoginResult {
  loginStatus: 'Login' | 'loading' | 'Logged In'
  login: (credentials: LoginCredentials) => void
}

export const useLogin = (): UseLoginResult => {
  const [loginStatus, setLoginStatus] = useState<
    'Login' | 'loading' | 'Logged In'
  >('Login')
  const navigate = useNavigate()

  const loginMutation = useMutation(
    (credentials: LoginCredentials) =>
      axiosInstance.post('/api/admin/login', credentials),
    {
      onMutate: () => {
        setLoginStatus('loading')
      },
      onSuccess: (response) => {
        const { status, message, response: data } = response.data

        if (status) {
          setAuthCookie(data)
          setLoginStatus('Logged In')
          setTimeout(() => navigate('/'), 1500)
          toast.success(message || 'Login successful!')
        } else {
          toast.error(message || 'Invalid credentials!')
          setLoginStatus('Login')
        }
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          'An error occurred. Please try again.'
        toast.error(errorMessage)
        setLoginStatus('Login')
      },
    }
  )

  const login = (credentials: LoginCredentials) =>
    loginMutation.mutate(credentials)

  return { loginStatus, login }
}
