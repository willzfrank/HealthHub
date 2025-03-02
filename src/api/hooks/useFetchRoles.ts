import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

// Hook to fetch roles
export const useRoles = () => {
  return useQuery('roles', async () => {
    const response = await axiosInstance.get('/common/roles')
    return response.data
  })
}
