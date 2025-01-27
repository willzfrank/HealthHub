import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import { axiosInstance } from '../axiosInstance'

// Function to fetch the profile
const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/admin/profile')

    if (response.data.status) {
      return response.data
    } else {
      throw new Error(response.data.message || 'Failed to fetch profile')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile')
  }
}

const useGetProfile = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return { data, error, isLoading }
}

export default useGetProfile
