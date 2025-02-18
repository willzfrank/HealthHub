import toast from "react-hot-toast"
import axiosInstance from "../axiosInstance"
import { useMutation } from "react-query"

interface PatientRegistration {
  title_id?: number
  marital_status_id?: number
  gender_id: number
  state_id: string
  lga_id: string
  first_name: string
  middle_name: string
  last_name: string
  date_of_birth: string
  email: string
  phone: string
  address: string
}

interface RegistrationResponse {
  status: boolean
  response: {
    hospital: string
    patient_number: string
    name: string
    phone: string
  }
  message: string
}

export const useUpdatePatientRegistration = () => {
  return useMutation<RegistrationResponse, Error, PatientRegistration>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/admin/patient/register', data)
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error('Registration failed: ' + error.message)
    },
  })
}
