import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

const fetchInvoiceDetails = async (invoiceId: string) => {
  const response = await axiosInstance.get(`admin/invoices/${invoiceId}`, {})
  return response.data
}

const useGetInvoiceDetails = (invoiceId: string) => {
  return useQuery({
    queryKey: ['invoiceDetails', invoiceId],
    queryFn: () => fetchInvoiceDetails(invoiceId),
    enabled: !!invoiceId,
  })
}

export default useGetInvoiceDetails
