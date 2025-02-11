import { useQuery } from "react-query"
import axiosInstance from "../axiosInstance"

const useDoctors = (hospitalId: number) => {
  return useQuery({
    queryKey: ['doctors', hospitalId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `common/doctors?hospital_id=${hospitalId}`
      )
      return response.data.response
    },
    staleTime: 1000 * 60 * 5,
  })
}

export default useDoctors
