import { useState } from 'react'

import useFetchGender from '../../api/hooks/useFetchGender'
import { toast } from 'react-hot-toast'
import useFetchTitles from '../../api/hooks/useFetchTitles'
import { useRegisterPatient } from '../../api/hooks/useRegisterPatient'
import { useFetchLGAs } from '../../api/hooks/useFetchLGAs'
import { useFetchStates } from '../../api/hooks/useFetchStates'
import { useFetchMaritalStatus } from '../../api/hooks/useFetchMaritalStatus'
import { IAddPatientBillItemRequest } from '../../types/types'
import { useAddPatientSingleBillItem } from '../../api/hooks/useAddPatientSingleBill'

interface UserRegistrationModalProps {
  onClose: () => void
}

const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({
  onClose,
}) => {
  const [formData, setFormData] = useState({
    facility_id: '2',
    marital_status_id: '',
    title_id: '10',
    gender_id: '',
    occupation_id: '1',
    religion_id: '2',
    educational_level_id: '2',
    language_id: '1',
    citizenship_id: '2',
    country_id: '1',
    state_id: '',
    lga_id: '',
    city_id: '3948',
    nok_country_id: '1',
    nok_state_id: '1',
    nok_lga_id: '1',
    nok_relationship_id: '18',
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone: '',
    address: '',
    nearest_bus_stop: '',
    nok_first_name: '',
    nok_middle_name: '',
    nok_last_name: '',
    nok_phone: '',
    nok_address: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    date_of_birth: '',
    address: '',
    gender_id: '',
    marital_status_id: '',
    state_id: '',
    lga_id: '',
  })

  const {
    data: genderData,
    isLoading: genderLoading,
    isError: genderError,
  } = useFetchGender()

  const {
    data: maritalStatusData,
    isLoading: maritalStatusLoading,
    isError: maritalStatusError,
  } = useFetchMaritalStatus()

  const {
    data: statesData,
    isLoading: statesLoading,
    isError: statesError,
  } = useFetchStates()

  const {
    data: lgasData,
    isLoading: lgasLoading,
    isError: lgasError,
  } = useFetchLGAs(formData.state_id)

  const { mutate: registerPatient, isLoading: isRegistering } =
    useRegisterPatient()
  const { mutate: addPatientSingleBill, isLoading: isAddingBill } =
    useAddPatientSingleBillItem()

  const {
    titleData,
    loading: titleLoading,
    error: titleError,
  } = useFetchTitles()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const validate = () => {
    const newErrors: any = {}

    if (!formData.first_name) newErrors.first_name = 'First name is required'
    if (!formData.last_name) newErrors.last_name = 'Surname is required'
    if (!formData.date_of_birth)
      newErrors.date_of_birth = 'Date of birth is required'
    if (!formData.phone || !/^\d{11}$/.test(formData.phone))
      newErrors.phone = 'Please enter a valid phone number'
    if (!formData.gender_id) newErrors.gender_id = 'Gender is required'
    if (!formData.marital_status_id)
      newErrors.marital_status_id = 'Marital status is required'
    if (!formData.state_id) newErrors.state_id = 'State is required'
    if (!formData.lga_id) newErrors.lga_id = 'LGA is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      registerPatient(formData, {
        onSuccess: (response) => {
          const patientId = response?.response?.id
          if (patientId) {
            const billData: IAddPatientBillItemRequest = {
              patient_id: patientId,
              bill_item_id: '1',
              quantity: 1,
            }

            addPatientSingleBill(billData, {
              onSuccess: () => {
                toast.success('Patient registered and bill added successfully!')

                // Reset form data
                setFormData({
                  facility_id: '2',
                  marital_status_id: '',
                  title_id: '10',
                  gender_id: '',
                  occupation_id: '1',
                  religion_id: '2',
                  educational_level_id: '2',
                  language_id: '1',
                  citizenship_id: '2',
                  country_id: '1',
                  state_id: '',
                  lga_id: '',
                  city_id: '3948',
                  nok_country_id: '1',
                  nok_state_id: '1',
                  nok_lga_id: '1',
                  nok_relationship_id: '18',
                  first_name: '',
                  middle_name: '',
                  last_name: '',
                  date_of_birth: '',
                  email: '',
                  phone: '',
                  address: '',
                  nearest_bus_stop: '',
                  nok_first_name: '',
                  nok_middle_name: '',
                  nok_last_name: '',
                  nok_phone: '',
                  nok_address: '',
                })
                // Clear validation errors
                setErrors({
                  email: '',
                  phone: '',
                  first_name: '',
                  last_name: '',
                  middle_name: '',
                  date_of_birth: '',
                  address: '',
                  gender_id: '',
                  marital_status_id: '',
                  state_id: '',
                  lga_id: '',
                })

                // Close modal
                onClose()
              },
              onError: (error) => {
                toast.error(error.message || 'Failed to add bill')
              },
            })
          }
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to register patient')
        },
      })
    } else {
      toast.error('Please fill in all required fields correctly')
    }
  }

  if (genderLoading || titleLoading || maritalStatusLoading || statesLoading)
    return <div>Loading...</div>
  if (genderError || titleError || maritalStatusError || statesError)
    return <div>Error loading data</div>

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <select
            id="title_id"
            value={formData.title_id}
            onChange={handleChange}
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          >
            {titleData?.map((title: { id: number; name: string }) => (
              <option key={title.id} value={title.id}>
                {title.name}
              </option>
            ))}
          </select>
        </div>

        {/* Surname Field */}
        <div>
          <label
            htmlFor="surname"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Surname <span className="text-red-500">*</span>
          </label>
          <input
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            type="text"
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name}</p>
          )}
        </div>

        {/* First Name Field */}
        <div>
          <label
            htmlFor="firstName"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            type="text"
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name}</p>
          )}
        </div>

        {/* Middle Name Field */}
        <div>
          <label
            htmlFor="middleName"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Middle Name
          </label>
          <input
            id="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
            type="text"
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          {errors.middle_name && (
            <p className="text-red-500 text-sm">{errors.middle_name}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-2.5">
        {/* Gender Field */}
        <div>
          <label
            htmlFor="gender"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            id="gender_id"
            value={formData.gender_id}
            onChange={handleChange}
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          >
            <option value="">Select a gender</option>
            {genderData.map((gender: { id: number; name: string }) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
          {errors.gender_id && (
            <p className="text-red-500 text-sm">{errors.gender_id}</p>
          )}
        </div>
        {/* Marital Status Field */}
        <div>
          <label
            htmlFor="marital_status_id"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Marital Status <span className="text-red-500">*</span>
          </label>
          <select
            id="marital_status_id"
            value={formData.marital_status_id}
            onChange={handleChange}
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          >
            <option value="">Select Marital Status</option>
            {maritalStatusData?.map((status: { id: number; name: string }) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          {errors.marital_status_id && (
            <p className="text-red-500 text-sm">{errors.marital_status_id}</p>
          )}
        </div>
        {/* Date of Birth Field */}
        <div>
          <label
            htmlFor="dob"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            id="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            type="date"
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-sm">{errors.date_of_birth}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Email
          </label>
          <input
            id="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Address Field */}
      <div className="mt-2.5">
        <label
          htmlFor="address"
          className="text-[#0061FF] text-[15px] font-medium"
        >
          Address
          <span className="text-red-500">*</span>
        </label>
        <input
          id="address"
          value={formData.address}
          onChange={handleChange}
          type="text"
          className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        {/* State Field */}
        <div>
          <label
            htmlFor="state_id"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            State of Residence <span className="text-red-500">*</span>
          </label>
          <select
            id="state_id"
            value={formData.state_id}
            onChange={handleChange}
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          >
            <option value="">Select State</option>
            {statesData?.map((state: { id: number; name: string }) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state_id && (
            <p className="text-red-500 text-sm">{errors.state_id}</p>
          )}
        </div>

        {/* LGA Field */}
        <div>
          <label
            htmlFor="lga_id"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            LGA of Residence <span className="text-red-500">*</span>
          </label>
          <select
            id="lga_id"
            value={formData.lga_id}
            onChange={handleChange}
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            disabled={!formData.state_id || statesLoading}
          >
            <option value="">Select LGA</option>
            {statesLoading ? (
              <option value="" disabled>
                Loading LGAs...
              </option>
            ) : (
              lgasData?.map((lga: { id: number; name: string }) => (
                <option key={lga.id} value={lga.id}>
                  {lga.name}
                </option>
              ))
            )}
          </select>
          {errors.lga_id && (
            <p className="text-red-500 text-sm">{errors.lga_id}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center my-2.5">
        <button
          type="submit"
          className="rounded-[3px] bg-[#0061FF] opacity-90 py-2.5 px-10"
          disabled={isRegistering}
        >
          <span className="text-[14px] text-white">
            {isRegistering ? 'Registering...' : 'REGISTER'}
          </span>
        </button>
      </div>
    </form>
  )
}

export default UserRegistrationModal
