import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'

type Props = {}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const DoctorPatientViewFormModal = (props: Props) => {
  return (
    <form>
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
            defaultValue="120/80"
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
            defaultValue="Normal"
            readOnly
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
        </div>

        <div>
          <label
            htmlFor="procedure"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Procedure
          </label>
          <input
            id="procedure"
            type="text"
            defaultValue="Check-up"
            readOnly
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          <span className="text-[#0061FF] text-[12px] cursor-pointer underline">
            Add Another Procedure
          </span>
        </div>

        <div>
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

        <div className="col-span-2">
          <label
            htmlFor="caseNote"
            className="text-[#0061FF] text-[15px] mb-2 font-medium"
          >
            Case Note
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

     
    </form>
  )
}

export default DoctorPatientViewFormModal
