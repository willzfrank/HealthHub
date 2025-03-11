import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import toast from 'react-hot-toast'
import { IAddPatientBillItemRequest } from '../../types/types'

export const useAddPatientSingleBillItem = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        '/admin/patient-bills/item/add',
        data
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message || 'Bill item added successfully')
      } else {
        toast.error(
          'Failed to add bill item: ' + (data.message || 'Unknown error')
        )
      }
    },
    onError: (error) => {
      toast.error('API request failed: ' + error.message)
    },
  })
}
