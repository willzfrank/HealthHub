import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

interface Appointment {
  id: number
  file_number: string
  patient_name: string
  patient_phone: string
  doctor: string
  consultation_name: string
  consultation_status: number
  vitals_height: string
  vitals_weight: string
  vitals_blood_pressure: string
  vitals_temperature: string
  vitals_oxygen_level: string
  vitals_pulse_rate: string
  doctor_comment: string
  receptionist_comment: string
  doctor_diagnosis: string | null
  treatment: string | null
  scheduled_date: string
  rescheduled_date: string | null
  vitals_status: string
}

interface AppointmentsListResponse {
  status: boolean
  response: {
    current_page: number
    last_page: number
    from: number
    to: number
    per_page: number
    total: number
    data: Appointment[]
  }
  message: string
}

const fetchAppointmentsList = async (): Promise<AppointmentsListResponse> => {
  const response = await axiosInstance.get('/admin/patient/appointments')
  return response.data
}

const useFetchAppointmentsList = () => {
  return useQuery('appointmentsList', fetchAppointmentsList, {
    refetchOnWindowFocus: false,
  })
}

export default useFetchAppointmentsList
