import toast from 'react-hot-toast'
import axiosInstance from '../axiosInstance'
import { useQuery } from 'react-query'

const fetchGender = async () => {
  try {
    const response = await axiosInstance.get('/api/common/genders')
    if (response.data.status) {
      return response.data.response
    } else {
      throw new Error('Failed to fetch gender data')
    }
  } catch (error) {
    toast.error('Error fetching gender data.')
    throw new Error('Error fetching gender data')
  }
}

const useFetchGender = () => {
  const { data, error, isLoading } = useQuery('genders', fetchGender, {
    staleTime: 300000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return {
    data: data || [],
    isLoading,
    isError: Boolean(error),
  }
}

export default useFetchGender
