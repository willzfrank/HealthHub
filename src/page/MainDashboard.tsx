import { useState } from 'react'
import DoctorDashboard from './Doctor/DoctorDashboard'
import NurseDashboard from './Nurse/NurseDashboard'
import ReceptionistDashboard from './Receptionist/Dashboard'


type Role = 'nurse' | 'receptionist' | 'doctor'

const MainDashboard = () => {
  const [role, setRole] = useState<Role>('receptionist')

  const renderDashboard = () => {
    switch (role) {
      case 'receptionist':
        return <ReceptionistDashboard />
      case 'nurse':
        return <NurseDashboard />
      case 'doctor':
        return <DoctorDashboard />

      default:
        return null
    }
  }

  return <div>{renderDashboard()}</div>
}

export default MainDashboard
