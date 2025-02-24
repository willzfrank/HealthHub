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
import { getAuthCookie } from './api/axiosInstance'
import NurseDashboard from './page/Nurse/NurseDashboard'
import DoctorDashboard from './page/Doctor/DoctorDashboard'
import Transaction from './page/Receptionist/Transaction'
import AccountantDashboard from './page/accountant/AccountantDashboard'
import AccountantProcedures from './page/accountant/AccountantProcedures'
import DoctorAppointment from './page/Doctor/DoctorAppointment'
import NurseAppointment from './page/Nurse/NurseAppointment'
import Staffs from './page/admin/Staffs'
import Invoice from './page/Receptionist/Invoice'
import AccountantBill from './page/accountant/AccountantBill'

const queryClient = new QueryClient()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authState = getAuthCookie()
    if (authState) {
      const expires_at = authState?.expires_at
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
              path="/doctor-dashboard"
              element={
                <ProtectedRoute
                  element={<DoctorDashboard />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/nurse-dashboard"
              element={
                <ProtectedRoute
                  element={<NurseDashboard />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/accountant-dashboard"
              element={
                <ProtectedRoute
                  element={<AccountantDashboard />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/accountant-bills"
              element={
                <ProtectedRoute
                  element={<AccountantBill />}
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
              path="/doctor-appointment"
              element={
                <ProtectedRoute
                  element={<DoctorAppointment />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/nurse-appointment"
              element={
                <ProtectedRoute
                  element={<NurseAppointment />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute
                  element={<Transaction />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/invoice"
              element={
                <ProtectedRoute
                  element={<Invoice />}
                  isAllowed={isAuthenticated}
                />
              }
            />
            <Route
              path="/accountant-procedures"
              element={
                <ProtectedRoute
                  element={<AccountantProcedures />}
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
              path="/staffs"
              element={
                <ProtectedRoute
                  element={<Staffs />}
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
