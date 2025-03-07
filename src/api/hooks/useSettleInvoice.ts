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
      setIsSuccess(data.status)
      toast.success(data.message || 'Invoice settled successfully!')
    },
    onError: (error: any) => {
      setIsSuccess(false)
      toast.error(
        error.response?.data?.message ||
          'An error occurred while settling the invoice.'
      )
    },
  })

  return {
    settleInvoice: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess,
  }
}

export default useSettleInvoice
