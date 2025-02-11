// useFetchAppointment.ts
import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

interface Vitals {
  blood_pressure: string
  height: string
  weight: string
  temperature: string
  pulse_rate: string
  oxygen_level: string
}

interface Procedure {
  quantity: number
  billItemId: number
}

interface Consultation {
  id: number
  name: string
  doctor_id: number
  nurse_id: number
  nurse_name: string
  doctor_name: string
  scheduled_date: string
  rescheduled_date: string | null
  receptionist_comment: string
  doctor_comment: string
  vitals: Vitals
  procedures: Procedure[]
}

interface Patient {
  id: number
  title_id: number
  file_number: string
  first_name: string
  middle_name: string
  last_name: string
  date_of_birth: string
  gender_id: number
  name: string
}

interface AppointmentResponse {
  status: boolean
  response: {
    patient: Patient
    consultation: Consultation
    medical_history: any[]
    diagnostics: any[]
    pharmacy_medications: any[]
  }
  message: string
}

const fetchAppointment = async (id: number): Promise<AppointmentResponse> => {
  const response = await axiosInstance.post('admin/patient/get-appointment', {
    id,
  })
  return response.data
}

const useFetchAppointment = (id: number) => {
  return useQuery(['appointment', id], () => fetchAppointment(id), {
    enabled: !!id,
  })
}

export default useFetchAppointment
