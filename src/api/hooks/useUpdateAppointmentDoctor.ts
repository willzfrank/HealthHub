import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'

const updateAppointment = async (appointmentData: any) => {
  const response = await axiosInstance.post(
    '/admin/patient/update-appointment',
    appointmentData
  )
  return response.data
}

export const useUpdateAppointment = () => {
  return useMutation(updateAppointment)
}
