import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import toast from 'react-hot-toast'

const bookAppointment = async (appointmentData: {
  patient_id: number
  doctor_id: number
  receptionist_comment: string
  scheduled_date: string
}) => {
  try {
    const response = await axiosInstance.post(
      '/admin/patient/book-appointment',
      appointmentData
    )

    if (response.data.status) {
      toast.success('Appointment booked successfully!')
      return response.data
    } else {
      if (response.data.response?.length) {
        response.data.response.forEach(
          (error: { field: string; message: string }) => {
            toast.error(error.message)
          }
        )
      } else {
        toast.error(response.data.message || 'Failed to book appointment.')
      }
      throw new Error(response.data.message || 'Validation error.')
    }
  } catch (error) {
    toast.error('An unexpected error occurred. Please try again.')
    throw error
  }
}

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: bookAppointment,
  })
}
