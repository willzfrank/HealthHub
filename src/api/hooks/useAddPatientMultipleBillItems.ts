import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import toast from 'react-hot-toast'

interface AddPatientMultipleBillItemsRequest {
  patient_id: string
  bills: Array<{ bill_item_id: string; quantity: number }>
}

interface AddPatientMultipleBillItemsResponse {
  status: boolean
  response: null
  message: string
}

export const useAddPatientMultipleBillItems = () => {
  return useMutation<
    AddPatientMultipleBillItemsResponse,
    Error,
    AddPatientMultipleBillItemsRequest
  >({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        '/admin/patient-bills/item/add-multiple',
        data
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message || 'Bill items added successfully')
      } else {
        toast.error(
          'Failed to add bill items: ' + (data.message || 'Unknown error')
        )
      }
    },
    onError: (error) => {
      toast.error('API request failed: ' + error.message)
    },
  })
}
