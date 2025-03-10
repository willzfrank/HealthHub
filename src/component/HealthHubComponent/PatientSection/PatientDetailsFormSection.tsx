import useFetchTitles from "../../../api/hooks/useFetchTitles"
import { Title } from "../../../types/types"

type Props = {
  patient: {
    id: number
    title_id: number
    file_number: string
    first_name: string
    middle_name: string
    last_name: string
    date_of_birth: string
    gender_id: number
    name: string
  }
}

const PatientDetailsFormSection = ({ patient }: Props) => {
  const { titleData, loading: isTitlesLoading } = useFetchTitles()
  const selectedTitle =
    titleData.find((title: Title) => title.id === patient?.title_id)?.name ?? ''
  return (
    <div>
      <form>
        <div className="grid grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="text-[#666666] text-[13px] mb-2 font-medium"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={selectedTitle}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
            />
          </div>

          {/* Surname */}
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
              value={patient?.last_name}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
            />
          </div>

          {/* First Name */}
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
              value={patient?.first_name}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
            />
          </div>

          {/* Middle Name */}
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
              value={patient?.middle_name}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
            />
          </div>

          {/* Gender */}
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
              value={patient?.gender_id === 1 ? 'Male' : 'Female'} // Map gender ID to text
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="text-[#666666] text-[13px] mb-2 font-medium"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              type="text"
              value={patient?.date_of_birth}
              readOnly
              className="p-1.5 border border-[#CCCCCC] rounded-[8px] bg-[#F5F6FA] w-full"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PatientDetailsFormSection
