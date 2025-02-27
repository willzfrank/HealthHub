import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import useDoctors from '../../api/hooks/useDoctors'
import { getAuthCookie } from '../../api/axiosInstance'
import { useUpdateAppointmentNurse } from '../../api/hooks/updateAppointmentNurse'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  appointment: any
  closeModal: () => void
}

const NursePatientVitalsModal = ({ appointment, closeModal }: Props) => {
  const [vitals, setVitals] = useState({
    vitals_blood_pressure: appointment.vitals_blood_pressure || '',
    vitals_pulse_rate: appointment.vitals_pulse_rate || '',
  })
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | undefined>(
    appointment?.doctor_id
  )
  const authState = getAuthCookie()
  const role = authState
  const { mutate: updateAppointment, isLoading } =
    useUpdateAppointmentNurse(closeModal)

  const fullName = appointment?.patientName ?? ''
  const nameParts = fullName.split(' ')

  const firstName = nameParts[0]
  const middleName =
    nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : ''
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''

  const {
    data: doctors,
    isLoading: isDoctorsLoading,
    error: doctorsError,
  } = useDoctors(1)

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target
    setVitals((prevVitals: any) => ({
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
      ...vitals,
      is_nurse: true,
    }
    updateAppointment(data)
  }

  return (
    <div>
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        Vitals
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="surname"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Surname
            </label>
            <input
              id="surname"
              type="text"
              defaultValue={lastName}
              readOnly
              className="p-1.5 border cursor-not-allowed border-[#CCCCCC] rounded-[8px] focus:outline-none bg-[#F5F6FA] w-full"
            />
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              defaultValue={firstName}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none cursor-not-allowed bg-[#F5F6FA] w-full"
            />
          </div>
          {middleName && (
            <div>
              <label
                htmlFor="middleName"
                className="text-[#0061FF] text-[15px] mb-2 font-medium"
              >
                Middle Name
              </label>
              <input
                id="middleName"
                type="text"
                defaultValue={middleName}
                readOnly
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none cursor-not-allowed bg-[#F5F6FA] w-full"
              />
            </div>
          )}

          <div className="w-full col-span-2">
            <span className="text-[#0061FF]">Procedure</span>
            <div className=" border-[#0061FF] border rounded-lg p-3.5 w-full">
              <div>
                <label
                  htmlFor="procedure"
                  className="text-[#0061FF] text-[15px] mb-2 font-medium"
                >
                  Procedure Name
                </label>
                <input
                  id="procedure"
                  type="text"
                  defaultValue={appointment?.purpose ?? 'N/A'}
                  readOnly
                  className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none cursor-not-allowed bg-[#F5F6FA] w-full"
                />
              </div>
              <div className="flex items-center w-full gap-5 mt-0.5">
                <div className="w-[70%]">
                  <label
                    htmlFor="doctor"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Doctor
                  </label>
                  <Select
                    id="doctor"
                    className="w-full"
                    placeholder="Select a doctor"
                    loading={isDoctorsLoading}
                    value={
                      selectedDoctorId ? selectedDoctorId.toString() : undefined
                    }
                    onChange={(value) => setSelectedDoctorId(Number(value))}
                  >
                    {doctors?.map((doctor: { id: number; name: string }) => (
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
                  <label
                    htmlFor="procedureDate"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Date
                  </label>
                  <DatePicker
                    id="procedureDate"
                    className="w-full p-1.5 bg-[#F5F6FA] border border-[#CCCCCC] rounded-[8px]"
                    value={
                      appointment?.scheduled_date
                        ? dayjs(appointment.scheduled_date)
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
            <label
              htmlFor="caseNote"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Receptionist comment
            </label>
            <textarea
              id="caseNote"
              defaultValue={appointment.receptionist_comment ?? 'N/A'}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none bg-[#F5F6FA] w-full cursor-not-allowed"
              rows={4}
            />
          </div>

          <div className="w-full col-span-2">
            <span className="text-[#0061FF]">Vitals</span>
            <div className=" border-[#0061FF] border rounded-lg p-3.5 w-full">
              <div className="flex items-center gap-2.5">
                <div>
                  <label
                    htmlFor="vitals_blood_pressure"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Blood Pressure
                  </label>
                  <input
                    id="vitals_blood_pressure"
                    type="text"
                    value={vitals.vitals_blood_pressure}
                    onChange={handleChange}
                    className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vitals_pulse_rate"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Pulse Rate
                  </label>
                  <input
                    id="vitals_pulse_rate"
                    type="text"
                    value={vitals.vitals_pulse_rate}
                    onChange={handleChange}
                    className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
                  />
                </div>
              </div>
              <div className="flex items-center w-full gap-5 mt-0.5">
                <div className="w-full">
                  <label
                    htmlFor="nurse"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Nurse
                  </label>
                  <input
                    id="nurse"
                    type="text"
                    defaultValue={`${role?.user?.first_name} ${role?.user?.last_name}`}
                    readOnly
                    className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none cursor-not-allowed bg-[#F5F6FA] w-full"
                  />
                </div>
                {/* <div className="w-[30%]">
                  <label
                    htmlFor="procedureDate"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Date
                  </label>
                  <DatePicker
                    id="procedureDate"
                    className="w-full p-1.5 bg-[#F5F6FA] border border-[#CCCCCC] rounded-[8px]"
                    placeholder="Select Date"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between my-5">
          <button
            className="border text-[#0061FF] border-[#0061FF] rounded px-20 py-2.5"
            type="button"
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
    </div>
  )
}

export default NursePatientVitalsModal
