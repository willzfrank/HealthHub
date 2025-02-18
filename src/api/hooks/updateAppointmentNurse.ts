import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import { IAppointmentNurseUpdateData } from '../../types/types'
import toast from 'react-hot-toast'

const updateAppointment = async (data: IAppointmentNurseUpdateData) => {
  const response = await axiosInstance.post(
    '/admin/patient/update-appointment',
    data
  )
  return response.data
}

export const useUpdateAppointmentNurse = (closeModal?: () => void) => {
  return useMutation(updateAppointment, {
    onError: (error: any) => {
      if (error.response?.data?.response) {
        error.response.data.response.forEach(
          (err: { field: string; message: string }) => {
            toast.error(`${err.field}: ${err.message}`)
          }
        )
      } else {
        toast.error('An error occurred while updating the appointment.')
      }
    },
    onSuccess: (data) => {
      if (data.status) {
        const successMessage =
          data.message || 'Appointment updated successfully!'
        toast.success(successMessage)
        if (closeModal) {
          closeModal()
        }
      } else {
        toast.error(data.message || 'Failed to update the appointment.')
      }
    },
  })
}
