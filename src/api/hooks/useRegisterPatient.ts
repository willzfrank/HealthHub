import { useMutation } from 'react-query'
import { axiosInstance } from '../axiosInstance'
import { toast } from 'react-hot-toast'

// Custom Hook to register a new patient
const useRegisterPatient = () => {
  return useMutation(
    async (patientData: {
      facility_id: string
      marital_status_id: string
      title_id: string
      gender_id: string
      occupation_id: string
      religion_id: string
      educational_level_id: string
      language_id: string
      citizenship_id: string
      country_id: string
      state_id: string
      lga_id: string
      city_id: string
      nok_country_id: string
      nok_state_id: string
      nok_lga_id: string
      nok_relationship_id: string
      first_name: string
      middle_name: string
      last_name: string
      date_of_birth: string
      email: string
      phone: string
      address: string
      nearest_bus_stop: string
      nok_first_name: string
      nok_middle_name: string
      nok_last_name: string
      nok_phone: string
      nok_address: string
    }) => {
      const response = await axiosInstance.post(
        'https://apps.blouzatech.ng/hms-api/public/api/patient/register',
        patientData
      )
      if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to register patient')
      }
      return response.data
    },
    {
      onSuccess: () => {
        toast.success('Patient registered successfully')
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'An error occurred')
      },
    }
  )
}

export default useRegisterPatient
