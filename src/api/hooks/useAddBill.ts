import { useQuery, useMutation, useQueryClient } from 'react-query'
import axiosInstance from '../axiosInstance'
import { IBillData } from '../../types/types'
import { toast } from 'react-hot-toast'

// Fetch all bills with pagination
const getBills = async (page: number, perPage: number) => {
  try {
    const response = await axiosInstance.get(
      `admin/bills/list?per_page=${perPage}&page=${page}`
    )
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        'Failed to fetch bills. Please try again.'
    )
  }
}

// fetch bills hook
export const useGetBills = (page: number, perPage: number) => {
  return useQuery(['bills', page, perPage], () => getBills(page, perPage), {
    onError: (error: any) => {
      toast.error(error.message)
    },
    keepPreviousData: true,
  })
}

// Add a new bill
const addBill = async (billData: IBillData): Promise<any> => {
  try {
    const response = await axiosInstance.post('admin/bills/add', billData)

    if (!response.data.status) {
      throw new Error(response.data.message || 'An unknown error occurred')
    }

    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to add bill. Please try again.'
    )
  }
}

// add a bill mutation
export const useAddBill = () => {
  const queryClient = useQueryClient()

  return useMutation(addBill, {
    onSuccess: () => {
      toast.success('Bill added successfully!')
      queryClient.invalidateQueries('bills')
    },
    onError: (error: any) => {
      toast.error(error.message)
    },
  })
}

// Update an existing bill
const updateBill = async (billData: {
  id: string
  purchase_price: number
  selling_price: number
}) => {
  try {
    const response = await axiosInstance.post(
      'admin/bills/update',
      billData,
      {}
    )

    if (!response.data.status) {
      throw new Error(response.data.message || 'Failed to update bill')
    }

    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        'Failed to update bill. Please try again.'
    )
  }
}

// update bill mutation
export const useUpdateBill = () => {
  const queryClient = useQueryClient()

  return useMutation(updateBill, {
    onSuccess: () => {
      toast.success('Bill updated successfully!')
      queryClient.invalidateQueries('bills')
    },
    onError: (error: any) => {
      toast.error(error.message)
    },
  })
}
