import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../../api/axiosInstance'
import { useMutation } from 'react-query'
import { IAppointmentItem, IBillData } from '../../types/types'

type Props = {
  appointmentData: IAppointmentItem | null

}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const DoctorPatientVitalsModal = ({ appointmentData }: Props) => {
  const [newProcedure, setNewProcedure] = useState({
    name: '',
    purchase_price: '',
    selling_price: '',
  })

   const addProcedureMutation = useMutation(
     async (data: IBillData) => {
       const response = await axiosInstance.post('admin/bills/add', data)
       if (!response.data.status) {
         throw new Error(response.data.message || 'An unknown error occurred')
       }
       return response.data
     },
     {
       onSuccess: () => {
         toast.success('Procedure added successfully!')
         setNewProcedure({
           name: '',
           purchase_price: '',
           selling_price: '',
         })
       },
       onError: (error: any) => {
         toast.error(error.message || 'Failed to add procedure')
       },
     }
   )

   const handleAddProcedure = () => {
     if (
       !newProcedure.name ||
       !newProcedure.purchase_price ||
       !newProcedure.selling_price
     ) {
       toast.error('Please fill all procedure fields')
       return
     }
     addProcedureMutation.mutate(newProcedure)
   }

  return (
    <div>
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        Vitals
      </h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="title"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              defaultValue="Dr."
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
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
              id="surname"
              type="text"
              defaultValue="Doe"
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
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
              defaultValue="John"
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
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
              id="middleName"
              type="text"
              defaultValue="A."
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Gender
            </label>
            <Select
              id="gender"
              className="w-full bg-[#F5F6FA] border  rounded-[8px]  border-[#CCCCCC]"
              options={genderOptions}
              defaultValue="male"
              disabled
              placeholder="Select Gender"
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
              id="dob"
              className="w-full p-1.5 bg-[#F5F6FA] border border-[#CCCCCC] rounded-[8px]"
              defaultValue={dayjs(new Date(1990, 0, 1))}
              disabled
              placeholder="Select Date of Birth"
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
                    className="w-full bg-[#F5F6FA] border  rounded-[8px]  border-[#CCCCCC]"
                    options={genderOptions}
                    defaultValue="male"
                    disabled
                    placeholder="Select Gender"
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

          <div className="col-span-2">
            <label
              htmlFor="caseNote"
              className="text-[#0061FF] text-[15px] mb-2 font-medium"
            >
              Receptionist comment
            </label>
            <textarea
              id="caseNote"
              defaultValue="Patient is in good health."
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
                    className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
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
                    className="w-full bg-[#F5F6FA] border  rounded-[8px]  border-[#CCCCCC]"
                    options={genderOptions}
                    defaultValue="checkup"
                    disabled
                    placeholder="Select Gender"
                  />
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
              defaultValue="Patient is in good health."
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
