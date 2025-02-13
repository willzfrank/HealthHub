import { useQuery } from 'react-query'
import { ICounts, IAppointmentStats } from '../../types/types'
import axiosInstance from '../axiosInstance'

interface AdminStatsResponse {
  status: boolean
  response: {
    appointments_today: IAppointmentStats[]
    counts: ICounts
  }
  message: string
}

// fetch admin stats
const useAdminStats = () => {
  return useQuery<AdminStatsResponse>({
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
