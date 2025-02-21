import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../../api/axiosInstance'
import { useMutation } from 'react-query'
import { IAppointmentItem, IBillData } from '../../types/types'
import useDoctors from '../../api/hooks/useDoctors'
import { useFetchBills } from '../../api/hooks/useFetchBills'

type Props = {
  appointmentData: IAppointmentItem | null
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const DoctorPatientVitalsModal = ({ appointmentData }: Props) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    appointmentData?.doctor ?? ''
  )
  const [newProcedure, setNewProcedure] = useState({
    name: '',
    purchase_price: '',
    selling_price: '',
  })

  console.log('appointmentData', appointmentData)

  const fullName = appointmentData?.patient_name ?? ''
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
  const { data: billsData, isLoading: isBillsLoading } = useFetchBills(1, 10)

  return (
    <div>
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        Vitals
      </h3>
      <form onSubmit={(e) => e.preventDefault()}>
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
                  defaultValue={appointmentData?.consultation_name ?? 'N/A'}
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
                    className="w-full"
                    placeholder="Select a doctor"
                    loading={isDoctorsLoading}
                    value={
                      selectedDoctor ?? appointmentData?.doctor ?? undefined
                    }
                    onChange={(value) => setSelectedDoctor(value)}
                  >
                    {doctors?.map((doctor: { id: number; name: string }) => (
                      <Select.Option key={doctor.id} value={doctor.name}>
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
                    defaultValue={dayjs(new Date(2023, 9, 1))}
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
              defaultValue={appointmentData?.receptionist_comment ?? 'N/A'}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
              rows={4}
            />
          </div>

          <div className="w-full col-span-2">
            <span className="text-[#0061FF]">Vitals</span>
            <div className=" border-[#0061FF] border rounded-lg p-3.5 w-full">
              <div className="flex items-center gap-2.5">
                <div>
                  <label
                    htmlFor="bloodPressure"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Blood Pressure
                  </label>
                  <input
                    id="bloodPressure"
                    type="text"
                    readOnly
                    defaultValue={
                      appointmentData?.vitals_blood_pressure ?? 'N/A'
                    }
                    className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none cursor-not-allowed bg-[#F5F6FA] w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="otherPressure"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Other Pressure
                  </label>
                  <input
                    id="otherPressure"
                    type="text"
                    readOnly
                    className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
                  />
                </div>
              </div>
              <div className="flex items-center w-full gap-5">
                <div className="w-[70%]">
                  <label
                    htmlFor="nurse"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Nurse
                  </label>
                  <input
                    id="nurse"
                    type="text"
                    defaultValue="Sarah"
                    readOnly
                    className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
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
                    defaultValue={dayjs(new Date(2023, 9, 1))}
                    disabled
                    placeholder="Select Date"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full col-span-2">
            <span className="text-[#0061FF]">Doctor Report</span>
            <div className=" border-[#0061FF] border rounded-lg p-3.5 w-full">
              <div className="flex items-center w-full gap-5">
                <div className="w-[70%]">
                  <label
                    htmlFor="procedure"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Procedure
                  </label>
                  <Select
                    id="procedure"
                    className="w-full bg-[#F5F6FA] border rounded-[8px] border-[#CCCCCC]"
                    placeholder="Select a procedure"
                    loading={isBillsLoading}
                    value={newProcedure.name}
                    onChange={(value) =>
                      setNewProcedure((prev) => ({ ...prev, name: value }))
                    }
                  >
                    {billsData?.response.data.map((bill) => (
                      <Select.Option key={bill.id} value={bill.name}>
                        {bill.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="w-[30%]">
                  <label
                    htmlFor="procedureDate"
                    className="text-[#0061FF] text-[15px] mb-2 font-medium"
                  >
                    Quantity
                  </label>
                  <input
                    id="procedureDate"
                    className="w-full p-1.5 bg-[#F5F6FA] border border-[#CCCCCC] rounded-[8px]"
                    type="text"
                    value={newProcedure.purchase_price}
                    onChange={(e) =>
                      setNewProcedure((prev) => ({
                        ...prev,
                        purchase_price: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <span className="text-[#0061FF] underline">
                Add new procedure
              </span>
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="caseNote"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Doctor note
            </label>
            <textarea
              id="caseNote"
              defaultValue={appointmentData?.doctor_comment ?? 'N/A'}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
              rows={4}
            />
          </div>
        </div>

        <div className="flex items-center justify-between my-5">
          <button className="border text-[#0061FF] border-[#0061FF] rounded px-20 py-2.5">
            CANCEL
          </button>
          <button className="text-white bg-[#0061FF] rounded px-20 py-2.5">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  )
}

export default DoctorPatientVitalsModal
