import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

const fetchPatientInvoices = async (patientId: number) => {
  const response = await axiosInstance.post('/admin/patient/invoice/all', {
    patient_id: patientId,
  })
  return response.data
}

export const useFetchPatientInvoices = (patientId: number) => {
  return useQuery(
    ['patientInvoices', patientId],
    () => fetchPatientInvoices(patientId),
    {
      enabled: !!patientId,
    }
  )
}
