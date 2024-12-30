import React from 'react'

type Props = {}

const PatientDetailsFormSection = (props: Props) => {
  return (
    <div>
      <form>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="title"
              className="text-[#666666] text-[13px] mb-2 font-medium"
            >
              Title
            </label>
            <select
              id="title"
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            >
              <option value="chief">Chief</option>
              <option value="mrs">Mrs</option>
              <option value="mr">Mr</option>
              <option value="dr">Dr</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="surname"
              className="text-[#666666] text-[13px] mb-2 font-medium"
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
              className="text-[#666666] text-[13px] mb-2 font-medium"
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
              className="text-[#666666] text-[13px] mb-2 font-medium"
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
              className="text-[#666666] text-[13px] mb-2 font-medium"
            >
              Gender
            </label>
            <input
              id="gender"
              type="text"
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="text-[#666666] text-[13px] mb-2 font-medium"
            >
              Date of birth
            </label>
            <input
              id="dob"
              type="text"
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="text-[#666666] text-[13px] mb-2 font-medium"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-[#666666] text-[13px] mb-2 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            />
          </div>
        </div>
        <div className="mt-5">
          <label
            htmlFor="address"
            className="text-[#666666] text-[13px]  font-medium"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
        </div>

        <div className="flex items-center justify-end my-2.5">
          <button className="rounded-[3px] bg-[#0061FF] opacity-90 py-2.5 px-10">
            <span className="text-[14px] text-white">Edit</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatientDetailsFormSection
