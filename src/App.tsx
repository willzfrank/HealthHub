import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HealthHubLogin from './page/auth/login'
import Settings from './page/Settings'
import Patients from './page/Receptionist/Patients'
import MainAppointment from './page/MainAppointment'
import MainDashboard from './page/MainDashboard'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './component/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authState = localStorage.getItem('authState')
    if (authState) {
      const { expires_at } = JSON.parse(authState)
      const isTokenExpired = Date.now() >= new Date(expires_at).getTime()
      setIsAuthenticated(!isTokenExpired)
    }
  }, [])

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<HealthHubLogin />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<MainDashboard />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute
                  element={<MainAppointment />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute
                  element={<Patients />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  element={<Settings />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen">
                  <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
