import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

type BillItem = {
  id: number
  hospital_id: number
  branch_id: number | null
  name: string
  purchase_price: number
  selling_price: number
  status: number
  last_edit: string | null
  last_edit_by_id: number | null
  created_at: string
  updated_at: string
}

type BillsResponse = {
  status: boolean
  response: {
    current_page: number
    data: BillItem[]
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
  }
  message: string
}

const fetchBills = async (page: number, perPage: number) => {
  const response = await axiosInstance.get<BillsResponse>(
    `/admin/bills/list?per_page=${perPage}&page=${page}`
  )
  return response.data
}

export const useFetchBills = (page: number, perPage: number) => {
  return useQuery(['bills', page, perPage], () => fetchBills(page, perPage), {
    keepPreviousData: true,
  })
}
