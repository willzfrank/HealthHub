import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'

const usePayInvoice = () => {
  return useMutation({
    mutationFn: async (paymentData: {
      patient_id: number
      invoice_id: number
      items: { item_id: number; amount: number }[]
    }) => {
      const response = await axiosInstance.post(
        'admin/patient/invoice/pay',
        paymentData
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.status && data.response?.url) {
        window.open(data.response.url, '_blank')
      } else {
        alert('Payment initiation failed. Please try again.')
      }
    },
    onError: () => {
      alert('An error occurred while processing payment.')
    },
  })
}

export default usePayInvoice
