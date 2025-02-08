import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

interface LGA {
  id: number
  state_id: number
  name: string
}

interface LGAResponse {
  status: boolean
  response: LGA[]
}

const fetchLGAs = async (): Promise<LGA[]> => {
  const { data } = await axiosInstance.get<LGAResponse>(
    '/common/local-governments'
  )
  return data.response
}

export const useFetchLGAs = (stateId: string) => {
  return useQuery({
    queryKey: ['lgas', stateId],
    queryFn: fetchLGAs,
    select: (data) => data.filter((lga) => lga.state_id === Number(stateId)),
    enabled: !!stateId, 
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
