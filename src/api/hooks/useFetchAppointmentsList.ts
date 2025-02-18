import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

const fetchAppointmentsList = async (): Promise<any> => {
  const response = await axiosInstance.get('/admin/patient/appointments')
  return response.data
}

const useFetchAppointmentsList = () => {
  return useQuery('appointmentsList', fetchAppointmentsList, {
    refetchOnWindowFocus: false,
  })
}

export default useFetchAppointmentsList
