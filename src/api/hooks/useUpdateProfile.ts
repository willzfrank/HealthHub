import { useMutation } from 'react-query'
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../axiosInstance'

const updateProfile = async (data: { email: string; phone: string }) => {
  try {
    const response = await axiosInstance.post('/api/admin/profile/update', data)

    if (response.data.status) {
      return response.data
    } else {
      throw new Error(response.data.message || 'Profile update failed')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Profile update failed')
  }
}

const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || 'Profile updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return mutation
}

export default useUpdateProfile
