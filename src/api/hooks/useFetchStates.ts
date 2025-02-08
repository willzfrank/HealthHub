import { useQuery } from "react-query"
import { axiosInstance } from "../axiosInstance"

interface State {
  id: number
  name: string
}

interface StateResponse {
  status: boolean
  response: State[]
}

const fetchStates = async (): Promise<State[]> => {
  const { data } = await axiosInstance.get<StateResponse>('/common/states')
  return data.response
}

export const useFetchStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: fetchStates,
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  })
}
