import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

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
  const authToken = localStorage.getItem('authState')

  // Check if user is authenticated and has required permissions
  const isAuthenticated = React.useMemo(() => {
    try {
      if (!authToken) return false

      const tokenData = JSON.parse(authToken)
      const isTokenExpired =
        Date.now() >= new Date(tokenData.expires_at).getTime()

      return !isTokenExpired
    } catch {
      return false
    }
  }, [authToken])

  if (!isAuthenticated) {
    // URL for redirecting after login
    sessionStorage.setItem('redirectTo', location.pathname)

    // Redirect to login with the return URL
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  // Check additional permissions if required
  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />
  }

  // Render the protected content
  return <>{element}</>
}

export default ProtectedRoute
