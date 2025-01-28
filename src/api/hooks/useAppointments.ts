// hooks/useAppointments.ts
import { useQuery } from 'react-query'
import axios from 'axios'
import axiosInstance from '../axiosInstance'

// Modify the fetch function to accept dynamic parameters
const fetchAppointments = async (
  facilityId: string | null,
  perPage: number,
  page: number
) => {
  const response = await axiosInstance.get(
    `/api/admin/reports/facility/patient-list?facility_id=${facilityId}&per_page=${perPage}&page=${page}`
  )
  return response.data
}

const useAppointments = (facilityId: string, perPage: number, page: number) => {
  return useQuery(
    ['appointments', facilityId, perPage, page],
    () => fetchAppointments(facilityId, perPage, page),
    {
      staleTime: 60000,
      cacheTime: 300000,
      refetchOnWindowFocus: true,
    }
  )
}

export default useAppointments
