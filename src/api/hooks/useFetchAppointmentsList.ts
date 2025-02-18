import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'
import { IAppointmentItem } from '../../types/types'


interface AppointmentsListResponse {
  status: boolean
  response: {
    current_page: number
    last_page: number
    from: number
    to: number
    per_page: number
    total: number
    data: IAppointmentItem[]
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
