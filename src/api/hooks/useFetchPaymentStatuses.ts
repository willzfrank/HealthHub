import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import axiosInstance from '../axiosInstance'

const fetchPaymentStatuses = async () => {
  try {
    const response = await axiosInstance.get('/common/payment-statuses')
    if (response.data.status) {
      return response.data.response
    } else {
      throw new Error('Failed to fetch payment statuses')
    }
  } catch (error) {
    toast.error('Error fetching payment statuses.')
    throw new Error('Error fetching payment statuses')
  }
}

const useFetchPaymentStatuses = () => {
  const { data, error, isLoading } = useQuery(
    'paymentStatuses',
    fetchPaymentStatuses,
    {
      staleTime: 300000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )

  return {
    data: data || [],
    isLoading,
    isError: Boolean(error),
  }
}

export default useFetchPaymentStatuses
