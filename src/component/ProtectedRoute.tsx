import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getAuthCookie } from '../api/axiosInstance'

interface ProtectedRouteProps {
  element: React.ReactNode
  redirectPath?: string
  isAllowed?: boolean
}

/**
 * A wrapper component that protects routes by checking authentication status
 * and user permissions before rendering the protected content.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  redirectPath = '/login',
  isAllowed = true,
}) => {
  const location = useLocation()
  const authState = getAuthCookie()

  const isAuthenticated = React.useMemo(() => {
    try {
      if (!authState?.access_token) return false

      const isTokenExpired =
        Date.now() >= new Date(authState.expires_at).getTime()

      return !isTokenExpired
    } catch {
      return false
    }
  }, [authState])

  if (!isAuthenticated) {
    // URL for redirecting after login
    sessionStorage.setItem('redirectTo', location.pathname)

    // Redirect to login with the return URL
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  // if (!isAllowed) {
  //   return <Navigate to="/unauthorized" replace />
  // }

  // Render the protected content
  return <>{element}</>
}

export default ProtectedRoute
