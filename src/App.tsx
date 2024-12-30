import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HealthHubLogin from './page/auth/login'
import Settings from './page/Settings'
import Patients from './page/Receptionist/Patients'
import MainAppointment from './page/MainAppointment'
import MainDashboard from './page/MainDashboard'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Standalone Pages */}
          <Route path="/login" element={<HealthHubLogin />} />
          <Route path="/" element={<MainDashboard />} />
          <Route path="appointments" element={<MainAppointment />} />
          <Route path="patients" element={<Patients />} />
          <Route path="notifications" element={<div>Notifications Page</div>} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
