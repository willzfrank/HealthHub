import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import toast from 'react-hot-toast'

interface DeletePatientBillItemRequest {
  patient_id: string
  bill_id: string
}

interface DeletePatientBillItemResponse {
  status: boolean
  response: null
  message: string
}

export const useDeletePatientBillItem = () => {
  return useMutation<
    DeletePatientBillItemResponse,
    Error,
    DeletePatientBillItemRequest
  >({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        '/admin/patient-bills/item/delete',
        data
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message || 'Bill item deleted successfully')
      } else {
        toast.error(
          'Failed to delete bill item: ' + (data.message || 'Unknown error')
        )
      }
    },
    onError: (error) => {
      toast.error('API request failed: ' + error.message)
    },
  })
}
