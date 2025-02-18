// hooks/useRegisterPatient.ts
import { useMutation } from 'react-query'
import axiosInstance from '../axiosInstance'
import { toast } from 'react-hot-toast'
import { PatientRegistrationData } from '../../types/types'

interface PatientRegistrationResponse {
  status: boolean
  response: {
    id: number
    hospital: string
    patient_number: string
    name: string
    phone: string
  } | null
  message: string
}

const registerPatient = async (
  data: PatientRegistrationData
): Promise<PatientRegistrationResponse> => {
  const { data: response } =
    await axiosInstance.post<PatientRegistrationResponse>(
      'admin/patient/register',
      data
    )
  return response
}

export const useRegisterPatient = () => {
  return useMutation({
    mutationFn: registerPatient,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message || 'Patient registered successfully')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'An error occurred during registration'
      toast.error(message)
    },
  })
}
