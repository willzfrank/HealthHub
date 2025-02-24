import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'

const generateInvoice = async (billItemIds: number[], patientId: string) => {
  const response = await axiosInstance.post('/admin/patient/invoice/generate', {
    patient_id: patientId,
    bill_items: billItemIds,
  })

  if (response.data.status) {
    return response.data.response
  } else {
    throw new Error(response.data.message || 'Invoice generation failed')
  }
}

export const useGenerateInvoice = () => {
  return useMutation({
    mutationFn: async ({
      billItemIds,
      patientId,
    }: {
      billItemIds: number[]
      patientId: string
    }) => generateInvoice(billItemIds, patientId),
  })
}
