import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useBookAppointment } from '../../api/hooks/useBookAppointment'
import toast from 'react-hot-toast'
import useDoctors from '../../api/hooks/useDoctors'
import { Doctor, Gender } from '../../types'
import useFetchGender from '../../api/hooks/useFetchGender'
import useFetchTitles from '../../api/hooks/useFetchTitles'

type ScheduleModalProps = {
  patientId: number | null
  onClose: (value: React.SetStateAction<boolean>) => void
  selectedPatientData: any
}

const ScheduleModal = ({
  patientId,
  onClose,
  selectedPatientData,
}: ScheduleModalProps) => {
  const [scheduledDate, setScheduledDate] = useState<string | null>(null)
  const [doctorId, setDoctorId] = useState<number | null>(null)
  const [receptionistComment, setReceptionistComment] = useState('')
  const { mutate: bookAppointment, isLoading } = useBookAppointment()
  const {
    data: doctors,
    isLoading: isDoctorsLoading,
    error: doctorsError,
  } = useDoctors(1)
  const { data: genderData } = useFetchGender()
  const { titleData } = useFetchTitles()

  const title =
    titleData?.find((t) => t.id === selectedPatientData.title_id)?.name || ''

  // Find gender name
  const gender =
    genderData?.find((g: Gender) => g.id === selectedPatientData.gender_id)
      ?.name || ''

  // Convert DOB to DatePicker format
  const dateOfBirth = selectedPatientData.date_of_birth
    ? dayjs(selectedPatientData.date_of_birth)
    : null

  console.log('selectedPatientData', selectedPatientData)
  const doctorOptions =
    doctors?.map((doctor: Doctor) => ({
      value: doctor.id,
      label: doctor.name,
    })) || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!patientId || !doctorId) {
      toast.error('Patient and Doctor must be selected.')
      return
    }

    if (!scheduledDate) {
      toast.error('Please select a date.')
      return
    }

    bookAppointment(
      {
        patient_id: patientId,
        doctor_id: doctorId,
        receptionist_comment: receptionistComment,
        scheduled_date: scheduledDate,
      },
      {
        onSuccess: () => {
          setDoctorId(null)
          setScheduledDate(null)
          setReceptionistComment('')
          toast.success('Appointment booked successfully!')
          onClose(false)
        },
      }
    )
  }

  return (
    <div>
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        Schedule Appointment
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="title"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="surname"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Surname
            </label>
            <input
              type="text"
              value={selectedPatientData.last_name || ''}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full cursor-not-allowed"
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
              type="text"
              value={selectedPatientData.first_name || ''}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="middleName"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Middle Name
            </label>
            <input
              type="text"
              value={selectedPatientData.middle_name || ''}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Gender
            </label>
            <input
              type="text"
              value={gender}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Date of birth
            </label>
            <DatePicker
              value={dateOfBirth}
              disabled
              className="w-full p-1.5 bg-[#F5F6FA] border border-[#CCCCCC] rounded-[8px]"
            />
          </div>
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
                  defaultValue="Check-up"
                  readOnly
                  className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
                />
              </div>
              <div className="flex items-center w-full gap-5">
                <div className="w-[70%]">
                  <label
                    htmlFor="doctor"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Doctor
                  </label>
                  <Select
                    id="doctor"
                    className="w-full bg-[#F5F6FA] border rounded-[8px] border-[#CCCCCC]"
                    options={doctorOptions}
                    onChange={(value) => setDoctorId(value)}
                    placeholder={
                      isDoctorsLoading ? 'Loading doctors...' : 'Select Doctor'
                    }
                    loading={isDoctorsLoading}
                    disabled={isDoctorsLoading || !!doctorsError}
                  />
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
                    onChange={(date) =>
                      setScheduledDate(date ? date.format('YYYY-MM-DD') : null)
                    }
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
              value={receptionistComment}
              onChange={(e) => setReceptionistComment(e.target.value)}
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
              rows={4}
            />
          </div>
        </div>

        <div className="flex items-center justify-between my-5">
          <button
            className="border text-[#0061FF] border-[#0061FF] rounded px-20 py-2.5"
            onClick={() => onClose(false)}
            type="button"
          >
            CANCEL
          </button>
          <button
            className="text-white bg-[#0061FF] rounded px-20 py-2.5"
            type="submit"
          >
            {isLoading ? 'Submitting...' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ScheduleModal
