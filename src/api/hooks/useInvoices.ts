// useInvoices.js
import { useQuery } from 'react-query'
import axiosInstance from '../../api/axiosInstance'

const fetchInvoices = async (page: any) => {
  const { data } = await axiosInstance.get('/admin/invoices', {
    params: {
      page: page,
      per_page: 10,
    },
  })
  return data
}

const useInvoices = (page: any) => {
  return useQuery(['invoices', page], () => fetchInvoices(page), {
    keepPreviousData: true,
  })
}

export default useInvoices
