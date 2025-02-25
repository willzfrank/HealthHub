import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

// Function to fetch patient bills with authorization and payload
const fetchPatientBills = async (patientId: number) => {
  const response = await axiosInstance.post<any>(
    `/admin/patient-bills/item/all`,
    { patient_id: patientId }
  )
  return response.data
}

export const useFetchPatientBills = (patientId: number) => {
  return useQuery(
    ['patient-bills', patientId],
    () => fetchPatientBills(patientId),
    {
      keepPreviousData: true,
      enabled: !!patientId,
    }
  )
}
