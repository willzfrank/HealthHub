import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import useDoctors from '../../api/hooks/useDoctors'
import { getAuthCookie } from '../../api/axiosInstance'
import { useUpdateAppointmentNurse } from '../../api/hooks/updateAppointmentNurse'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useFetchAppointment from '../../api/hooks/useFetchAppointment'
import useFetchTitles from '../../api/hooks/useFetchTitles'
import useFetchGender from '../../api/hooks/useFetchGender'
import { Doctor } from '../../types/types'

type Props = {
  appointment: any
  closeModal: () => void
}

const NursePatientVitalsModal = ({ appointment, closeModal }: Props) => {
  const { data: appointmentDetails, isLoading: isAppointmentDetailsLoading } =
    useFetchAppointment(appointment.key || appointment.id)
  const { titleData, loading: isTitlesLoading } = useFetchTitles()
  const { data: genderData, isLoading: isGenderLoading } = useFetchGender()
  console.log('appointment', appointment)

  // Ensure we use appointmentDetails if available
  const details = appointmentDetails?.response ?? {}

  // Extract patient data
  const patient = details?.patient ?? {}
  const selectedTitle =
    titleData.find((t) => t.id === patient.title_id)?.name || ''
  const selectedGender =
    genderData.find((g: { id: any }) => g.id === patient.gender_id)?.name || ''
  const fullName = patient?.name || ''

  const firstName = patient?.first_name ?? ''
  const middleName = patient?.middle_name ?? ''
  const lastName = patient?.last_name ?? ''

  // Extract consultation data
  const consultation = details?.consultation ?? {}
  const vitals = consultation?.vitals ?? {}

  // Extract necessary vitals with fallbacks
  const [vitalsData, setVitalsData] = useState({
    vitals_blood_pressure: vitals?.blood_pressure ?? '',
    vitals_pulse_rate: vitals?.pulse_rate ?? '',
  })

  // Handle doctor selection
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | undefined>(
    consultation?.doctor_id
  )

  const { data: doctors, isLoading: isDoctorsLoading } = useDoctors(1)

  const { mutate: updateAppointment, isLoading } =
    useUpdateAppointmentNurse(closeModal)

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target
    setVitalsData((prevVitals) => ({
      ...prevVitals,
      [id]: value,
    }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!selectedDoctorId) {
      toast.error('Please select a doctor.')
      return
    }

    const data = {
      id: appointment.key,
      doctor_id: selectedDoctorId,
      ...vitalsData,
      is_nurse: true,
    }
    updateAppointment(data)
  }

  return (
    <div>
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        Vitals
      </h3>
      {isAppointmentDetailsLoading ? (
        <p>Loading appointment details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                Title
              </label>
              <input
                type="text"
                value={selectedTitle}
                readOnly
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
              />
            </div>
            <div>
              <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                Surname
              </label>
              <input
                type="text"
                value={lastName}
                readOnly
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
              />
            </div>
            <div>
              <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                readOnly
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
              />
            </div>
            {middleName && (
              <div>
                <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={middleName}
                  readOnly
                  className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
                />
              </div>
            )}
            <div>
              <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                Gender
              </label>
              <input
                type="text"
                value={selectedGender}
                readOnly
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
              />
            </div>
            <div>
              <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                Date of Birth
              </label>
              <input
                type="text"
                value={patient.date_of_birth ?? ''}
                readOnly
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
              />
            </div>
            <div className="col-span-2">
              <span className="text-[#0061FF]">Procedure</span>
              <div className="border-[#0061FF] border rounded-lg p-3.5 w-full">
                <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                  Procedure Name
                </label>
                <input
                  type="text"
                  value={consultation?.name ?? 'N/A'}
                  readOnly
                  className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
                />
                <div className="flex items-center w-full gap-5 mt-0.5">
                  <div className="w-[70%]">
                    <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                      Doctor
                    </label>
                    <Select
                      className="w-full"
                      placeholder="Select a doctor"
                      loading={isDoctorsLoading}
                      value={
                        selectedDoctorId
                          ? selectedDoctorId.toString()
                          : undefined
                      }
                      onChange={(value) => setSelectedDoctorId(Number(value))}
                    >
                      {doctors?.map((doctor: Doctor) => (
                        <Select.Option
                          key={doctor.id}
                          value={doctor.id.toString()}
                        >
                          {doctor.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div className="w-[30%]">
                    <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                      Date
                    </label>
                    <DatePicker
                      className="w-full p-1.5 bg-[#F5F6FA] border border-[#CCCCCC] rounded-[8px]"
                      value={
                        consultation?.scheduled_date
                          ? dayjs(consultation.scheduled_date)
                          : undefined
                      }
                      disabled
                      placeholder="Select Date"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                Receptionist comment
              </label>
              <textarea
                value={consultation?.receptionist_comment ?? 'N/A'}
                readOnly
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
                rows={4}
              />
            </div>

            <div className="w-full col-span-2">
              <span className="text-[#0061FF]">Vitals</span>
              <div className="border-[#0061FF] border rounded-lg p-3.5 w-full">
                <div className="flex items-center gap-2.5">
                  <div>
                    <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                      Blood Pressure
                    </label>
                    <input
                      id="vitals_blood_pressure"
                      type="text"
                      value={vitalsData.vitals_blood_pressure}
                      onChange={handleChange}
                      className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
                    />
                  </div>
                  <div>
                    <label className="text-[#0061FF] text-[15px] mb-2 font-medium">
                      Pulse Rate
                    </label>
                    <input
                      id="vitals_pulse_rate"
                      type="text"
                      value={vitalsData.vitals_pulse_rate}
                      onChange={handleChange}
                      className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between my-5">
            <button
              className="border text-[#0061FF] border-[#0061FF] rounded px-20 py-2.5"
              onClick={closeModal}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="text-white bg-[#0061FF] rounded px-20 py-2.5"
              disabled={isLoading}
            >
              {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default NursePatientVitalsModal
