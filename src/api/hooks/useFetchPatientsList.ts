import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

const fetchPatients = async (perPage: number, page: number) => {
  const response = await axiosInstance.get(
    `/admin/patient/list?per_page=${perPage}&page=${page}`
  )

  return response.data
}

const useFetchPatientsList = (perPage: number, page: number) => {
  return useQuery(
    ['patients', perPage, page],
    () => fetchPatients(perPage, page),
    {
      keepPreviousData: true,
    }
  )
}

export default useFetchPatientsList
