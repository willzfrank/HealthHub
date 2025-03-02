import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import toast from 'react-hot-toast'

const generateInvoice = async (params: {
  patientId: string
  bill_items: number[]
}) => {
  try {
    const response = await axiosInstance.post(
      '/admin/patient/invoice/generate',
      {
        patient_id: params.patientId,
        bill_items: params.bill_items,
      }
    )

    if (response.data.status) {
      return response.data
    } else {
      // Extract validation errors dynamically
      const errorsArray = response.data?.response
      if (Array.isArray(errorsArray) && errorsArray.length > 0) {
        const errorMessages = errorsArray
          .map((err) => `${err.field}: ${err.message}`)
          .join(', ')
        throw new Error(errorMessages)
      }
      throw new Error(response.data.message || 'Invoice generation failed')
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'An unexpected error occurred'
    )
  }
}

export const useGenerateInvoice = () => {
  return useMutation({
    mutationFn: generateInvoice,
    onError: (error: any) => {
      console.error('Invoice Generation Error:', error.message)
      toast.error(error.message)
    },
  })
}
