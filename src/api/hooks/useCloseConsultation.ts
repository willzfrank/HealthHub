import { useMutation } from 'react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const closeConsultation = async (consultationId: number) => {
  const response = await axios.post('admin/patient/consultation/close-case', {
    consultation_id: consultationId,
    status: 1,
  })
  return response.data
}

export const useCloseConsultation = () => {
  return useMutation(closeConsultation, {
    onSuccess: (data) => {
      if (data.status) {
        toast.success('Consultation case closed successfully!')
      } else {
        toast.error('Failed to close consultation case.')
      }
    },
    onError: (error: any) => {
      toast.error('An error occurred while closing the consultation case.')
    },
  })
}
