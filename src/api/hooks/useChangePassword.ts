import { useMutation } from 'react-query'
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../axiosInstance'

const useChangePassword = () => {
  return useMutation(
    async (passwordData: {
      old_password: string
      password: string
      password_confirmation: string
    }) => {
      const response = await axiosInstance.post(
        '/admin/profile/change-password',
        passwordData
      )
      if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to change password')
      }
      return response.data
    },
    {
      onSuccess: () => {
        toast.success('Password changed successfully')
      },
      onError: (error: any) => {
        toast.error(error?.message || 'An error occurred')
      },
    }
  )
}

export default useChangePassword
