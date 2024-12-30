import { useState } from 'react'
import NurseAppointment from './Nurse/NurseAppointment'
import AppointmentsTable from './Receptionist/Appointments'
import DoctorAppointment from './Doctor/DoctorAppointment'


type Role = 'nurse' | 'receptionist' | 'doctor'

const MainAppointment = () => {
  const [role, setRole] = useState<Role>('doctor')

  const renderDashboard = () => {
    switch (role) {
      case 'receptionist':
        return <AppointmentsTable />
      case 'nurse':
        return <NurseAppointment />
      case 'doctor':
        return <DoctorAppointment        />
      default:
        return null
    }
  }

  return <div>{renderDashboard()}</div>
}

export default MainAppointment
