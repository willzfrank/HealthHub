import { useState } from 'react'
import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import { SettleInvoiceRequest } from '../../types/types'
import toast from 'react-hot-toast'

interface SettleInvoiceResponse {
  status: boolean
  response: any
  message: string
}

const useSettleInvoice = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  const mutation = useMutation<
    SettleInvoiceResponse,
    Error,
    SettleInvoiceRequest
  >({
    mutationFn: async (data) => {
      const response = await axiosInstance.post<SettleInvoiceResponse>(
        '/admin/settle-invoice',
        data
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.status) {
        const successMessage = data.message || 'Invoice settled successfully!'
        toast.success(successMessage)
      } else {
        toast.error(
          data.message || 'An error occurred while settling the invoice.'
        )
      }
    },
  })

  return {
    settleInvoice: mutation.mutate,
    isLoading: mutation.isLoading,
  }
}

export default useSettleInvoice
