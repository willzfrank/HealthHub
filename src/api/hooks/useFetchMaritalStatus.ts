import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

interface MaritalStatus {
  id: number
  name: string
}

interface MaritalStatusResponse {
  status: boolean
  response: MaritalStatus[]
}

const fetchMaritalStatus = async (): Promise<MaritalStatus[]> => {
  const { data } = await axiosInstance.get<MaritalStatusResponse>(
    '/common/marital-statuses'
  )
  return data.response
}

export const useFetchMaritalStatus = () => {
  return useQuery({
    queryKey: ['maritalStatus'],
    queryFn: fetchMaritalStatus,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
