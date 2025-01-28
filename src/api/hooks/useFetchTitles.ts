import { useQuery } from 'react-query'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-hot-toast'

interface Title {
  id: number
  name: string
}

const fetchTitles = async (): Promise<Title[]> => {
  try {
    const response = await axiosInstance.get('/api/common/titles')
    if (response.data.status) {
      return response.data.response
    } else {
      throw new Error('Failed to fetch titles')
    }
  } catch (error) {
    toast.error('Error fetching titles.')
    throw new Error('Error fetching titles')
  }
}

const useFetchTitles = () => {
  const { data, error, isLoading } = useQuery<Title[], Error>(
    'titles',
    fetchTitles,
    {
      staleTime: 300000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )

  return {
    titleData: data || [],
    loading: isLoading,
    error: error?.message || null,
  }
}

export default useFetchTitles
