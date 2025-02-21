import { useQuery } from 'react-query'
import axiosInstance from '../axiosInstance'

type PatientBillResponse = {
  status: boolean
  response: {
    patient: {
      id: number
      name: string
      age: string
      gender: 'MALE' | 'FEMALE' | 'OTHER'
      file_number: string
      phone: string
      address: string
    }
    items: {
      id: number
      hospital_id: number
      branch_id: number | null
      name: string
      purchase_price: number
      selling_price: number
      status: number
      last_edit: string | null
      last_edit_by_id: number | null
      created_at: string
      updated_at: string
      pivot: {
        patient_id: number
        bill_item_id: number
        invoice_generated: number
        payment_status: number
        id: number
      }
    }[]
  }
  message: string
}

// Function to fetch patient bills with authorization and payload
const fetchPatientBills = async (patientId: number) => {
  const response = await axiosInstance.post<PatientBillResponse>(
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
