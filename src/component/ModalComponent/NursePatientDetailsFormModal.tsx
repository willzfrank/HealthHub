import {  Select,  DatePicker } from 'antd'


type Props = {}

const NursePatientDetailsFormModal = (props: Props) => {
     const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ]
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
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-5 my-10">
        <button className="rounded-[3px] w-1/2 border border-[#0061FF] py-2.5 px-10">
          <span className="text-[#0061FF] font-bold">CANCEL </span>
        </button>
        <button className="w-1/2 rounded-[3px] bg-[#0061FF] opacity-90 py-2.5 px-10">
          <span className="text-[14px] text-white font-bold">SUBMIT</span>
        </button>
      </div>
    </form>
  )
}

export default NursePatientDetailsFormModal