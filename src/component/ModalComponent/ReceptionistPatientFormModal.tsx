import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useUpdatePatientRegistration } from '../../api/hooks/useUpdatePatient'
import useDoctors from '../../api/hooks/useDoctors'
import { IAppointmentStats } from '../../types/types'
import toast from 'react-hot-toast'

type Props = {
  selectedPatient: IAppointmentStats | null
}

const ReceptionistPatientFormModal = ({ selectedPatient }: Props) => {
  const registration = useUpdatePatientRegistration()

  const { data: doctors, isLoading: doctorsLoading } = useDoctors(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // if (!selectedPatient) {
    //   toast.error('No patient selected')
    //   return
    // }

    // const payload = {
    //   procedure: selectedPatient.consultation_name,
    //   doctor: selectedPatient.doctor,
    //   date: selectedPatient.scheduled_date,
    // }

    // try {
    //   await registration.mutateAsync(payload)
    //   toast.success('Patient details updated successfully')
    // } catch (error) {
    //   toast.error('Failed to update patient details')
    // }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5">
        <div className="w-full col-span-2">
          <span className="text-[#0061FF]">Procedure</span>
          <div className="border-[#0061FF] border rounded-lg p-3.5 w-full">
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
                defaultValue={selectedPatient?.consultation_name ?? 'N/A'}
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
                  loading={doctorsLoading}
                  defaultValue={selectedPatient?.doctor ?? undefined}
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
                  value={
                    selectedPatient?.scheduled_date
                      ? dayjs(selectedPatient.scheduled_date)
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
            defaultValue={selectedPatient?.receptionist_comment ?? 'N/A'}
            readOnly
            className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
            rows={4}
          />
        </div>
      </div>

      <div className="flex items-center justify-between my-5">
        <button
          type="button"
          className="border text-[#0061FF] border-[#0061FF] rounded px-20 py-2.5"
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="text-white bg-[#0061FF] rounded px-20 py-2.5"
        >
          UPDATE
        </button>
      </div>
    </form>
  )
}

export default ReceptionistPatientFormModal
