import { useQuery } from 'react-query'
import { toast } from 'react-hot-toast'
import axiosInstance from '../../api/axiosInstance'

const fetchInvoices = async (page: any) => {
  try {
    const { data } = await axiosInstance.get('/admin/invoices', {
      params: { page, per_page: 20 },
    })

    if (data?.status) {
      return { success: true, data: data }
    } else {
      toast.error(data?.message || 'Validation failed')
      return {
        success: false,
        errors: data?.response || [],
        message: data?.message || 'Unknown error',
      }
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'An unexpected error occurred'
    toast.error(errorMessage)
    return {
      success: false,
      errors: error?.response?.data?.response || [],
      message: errorMessage,
    }
  }
}

const useInvoices = (page: any) => {
  return useQuery(['invoices', page], () => fetchInvoices(page), {
    keepPreviousData: true,
  })
}

export default useInvoices
