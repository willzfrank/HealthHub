import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

const fetchInvoices = async (patient_id: number) => {
  const response = await axiosInstance.post(
    '/admin/patient/invoice/all',
    { patient_id }
  )

  if (response.data.status) {
    return response.data.response
  } else {
    throw new Error('Failed to fetch invoices')
  }
}

const useGetPatientInvoices = (selectedPatientID: number | null) => {
  return useQuery(
    ['patient-invoices', selectedPatientID],
    () => fetchInvoices(selectedPatientID!),
    {
      enabled: !!selectedPatientID,
    }
  )
}

export default useGetPatientInvoices
