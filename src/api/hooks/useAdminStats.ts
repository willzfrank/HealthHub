import { useQuery } from 'react-query'
import { ICounts, IAppointmentStats, IVitalsCount } from '../../types/types'
import axiosInstance from '../axiosInstance'

// fetch admin stats
const useAdminStats = () => {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/admin/stats')
      return response.data
    },
    staleTime: 60000,
    retry: 2,
  })
}

export default useAdminStats
