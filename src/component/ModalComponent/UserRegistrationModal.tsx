import { useState } from 'react'
import useRegisterPatient from '../../api/hooks/useRegisterPatient'
import useFetchGender from '../../api/hooks/useFetchGender'
import { toast } from 'react-hot-toast'
import useFetchTitles from '../../api/hooks/useFetchTitles'

const UserRegistrationModal = () => {
  const [formData, setFormData] = useState({
    facility_id: '2',
    marital_status_id: '2',
    title_id: '10',
    gender_id: '2',
    occupation_id: '1',
    religion_id: '2',
    educational_level_id: '2',
    language_id: '1',
    citizenship_id: '2',
    country_id: '1',
    state_id: '23',
    lga_id: '476',
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
  })

  const {
    data: genderData,
    isLoading: genderLoading,
    isError: genderError,
  } = useFetchGender()

  const { mutate, isLoading } = useRegisterPatient()
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
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Please enter a valid phone number'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      mutate(formData)
    } else {
      toast.error('Please fill in all required fields correctly')
    }
  }

  if (genderLoading || titleLoading) return <div>Loading...</div>
  if (genderError || titleError) return <div>Error loading data</div>

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5">
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
            {genderData.map((gender: { id: number; name: string }) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
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
      <div className="mt-5">
        <label
          htmlFor="address"
          className="text-[#0061FF] text-[15px] font-medium"
        >
          Address
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

      {/* Submit Button */}
      <div className="flex items-center justify-center my-2.5">
        <button
          type="submit"
          className="rounded-[3px] bg-[#0061FF] opacity-90 py-2.5 px-10"
          disabled={isLoading}
        >
          <span className="text-[14px] text-white">
            {isLoading ? 'Registering...' : 'REGISTER'}
          </span>
        </button>
      </div>
    </form>
  )
}

export default UserRegistrationModal
