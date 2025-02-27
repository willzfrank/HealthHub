import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

const fetchPatientData = async (patientId: string) => {
  const { data } = await axiosInstance.get(`/admin/patient/single/${patientId}`)

  if (!data.status) {
    throw new Error('Failed to fetch patient data')
  }

  return data.response
}

export const useGetSinglePatientData = (patientId: string) => {
  return useQuery({
    queryKey: ['patient-single-data', patientId],
    queryFn: () => fetchPatientData(patientId),
    enabled: !!patientId,
  })
}
