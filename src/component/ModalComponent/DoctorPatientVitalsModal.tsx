import { Select, DatePicker, Button, Input } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Doctor, IAppointmentItem } from '../../types/types'
import useDoctors from '../../api/hooks/useDoctors'
import { useFetchBills } from '../../api/hooks/useFetchBills'
import { useAddBill } from '../../api/hooks/useAddBill'
import useFetchAppointment from '../../api/hooks/useFetchAppointment'
import useFetchTitles from '../../api/hooks/useFetchTitles'
import useFetchGender from '../../api/hooks/useFetchGender'
import { useUpdateAppointment } from '../../api/hooks/useUpdateAppointmentDoctor'
import toast from 'react-hot-toast'
import { useAddPatientMultipleBillItems } from '../../api/hooks/useAddPatientMultipleBillItems'
import { useAddPatientSingleBillItem } from '../../api/hooks/useAddPatientSingleBill'
import { useDeletePatientBillItem } from '../../api/hooks/useDeletePatientBillItem'

type Props = {
  appointmentData: IAppointmentItem | null
  onClose: () => void
}

const DoctorPatientVitalsModal = ({ appointmentData, onClose }: Props) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    appointmentData?.doctor ?? ''
  )
  const [selectedProcedure, setSelectedProcedure] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('1')
  const [selectedProcedures, setSelectedProcedures] = useState<
    Array<{
      billItemId: any
      name: string
      quantity: string
    }>
  >([])
  const [doctorComment, setDoctorComment] = useState<string>(
    appointmentData?.doctor_comment ?? ''
  )

  const { data: appointmentDetails, isLoading: isAppointmentDetailsLoading } =
    useFetchAppointment(appointmentData?.id ?? 0)

  const { titleData, loading: isTitlesLoading } = useFetchTitles()
  const { data: genderData, isLoading: isGenderLoading } = useFetchGender()

  // Ensure we use appointmentDetails if available
  const details = appointmentDetails?.response ?? {}

  // Extract patient data
  const patient = details?.patient ?? {}
  const consultation = details?.consultation ?? {}
  const vitals = consultation?.vitals ?? {}

  const selectedTitle =
    titleData.find((t) => t.id === patient?.title_id)?.name ?? ''
  const selectedGender =
    genderData.find((g: { id: any }) => g.id === patient.gender_id)?.name ?? ''

  const firstName = patient?.first_name ?? ''
  const middleName = patient?.middle_name ?? ''
  const lastName = patient?.last_name ?? ''
  const { data: doctors, isLoading: isDoctorsLoading } = useDoctors(1)
  const { data: billsData, isLoading: isBillsLoading } = useFetchBills(1, 10)
  const { mutateAsync: addSingleBillItem } = useAddPatientSingleBillItem()
  const { mutateAsync: addMultipleBillItems } = useAddPatientMultipleBillItems()
  const { mutateAsync: deleteBillItem, isLoading: isDeletingBillItem } =
    useDeletePatientBillItem()

  const {
    mutateAsync: updateAppointmentMutation,
    isLoading: isUpdatingAppointment,
  } = useUpdateAppointment()

  const handleAddProcedure = () => {
    if (selectedProcedure) {
      setSelectedProcedures([
        ...selectedProcedures,
        {
          billItemId: billsData?.response.data.find(
            (b) => b.name === selectedProcedure
          )?.id,
          name: selectedProcedure,
          quantity: quantity,
        },
      ])
      setSelectedProcedure('')
      setQuantity('1')
    }
  }

  const handleDeleteProcedure = async (billItemId: string) => {
    try {
      const payload = {
        patient_id: patient.id.toString(),
        bill_id: billItemId,
      }

      const response = await deleteBillItem(payload)

      if (response.status) {
        toast.success('Bill item deleted successfully!')
        // Optionally, refetch the appointment details to update the UI
        // refetchAppointmentDetails();
      } else {
        toast.error('Failed to delete bill item.')
      }
    } catch (error: any) {
      toast.error('An error occurred while deleting the bill item.')
    }
  }

  const handleRemoveProcedure = (index: number) => {
    const updatedProcedures = [...selectedProcedures]
    updatedProcedures.splice(index, 1)
    setSelectedProcedures(updatedProcedures)
  }

  const handleSubmit = async () => {
    const selectedDoctorId = doctors?.find(
      (doctor: Doctor) => doctor.name === selectedDoctor
    )?.id

    if (!selectedDoctorId) {
      toast.error('Invalid doctor selected.')
      return
    }

    // Prepare the payload for updating the appointment
    const proceduresPayload = selectedProcedures.map((proc) => ({
      billItemId: billsData?.response.data.find((b) => b.name === proc.name)
        ?.id,
      quantity: parseInt(proc.quantity, 10),
    }))

    const payload = {
      id: appointmentData?.id,
      doctor_id: selectedDoctorId,
      doctor_comment: doctorComment,
      patient_complaint: consultation.receptionist_comment,
      procedures: proceduresPayload,
      is_nurse: false,
    }

    try {
      // Update the appointment first
      const response = await updateAppointmentMutation(payload)

      if (response.status) {
        toast.success('Appointment updated successfully!')

        // Add bill items based on the number of procedures
        if (selectedProcedures.length === 1) {
          // Single procedure
          const singleBillPayload = {
            patient_id: patient?.id.toString(),
            bill_item_id: proceduresPayload[0]?.billItemId?.toString(),
            quantity: proceduresPayload[0].quantity,
          }

          try {
            await addSingleBillItem(singleBillPayload)
            toast.success('Single bill item added successfully!')
          } catch (error) {
            toast.error('Failed to add single bill item.')
          }
        } else if (selectedProcedures.length > 1) {
          // Multiple procedures
          const multipleBillsPayload = {
            patient_id: patient.id.toString(),
            bills: proceduresPayload.map((proc: any) => ({
              bill_item_id: proc?.billItemId.toString(),
              quantity: proc.quantity,
            })),
          }

          try {
            await addMultipleBillItems(multipleBillsPayload)
            toast.success('Multiple bill items added successfully!')
          } catch (error) {
            console.error('Error adding multiple bill items:', error)
            toast.error('Failed to add multiple bill items.')
          }
        }

        onClose() // Close the modal after successful submission
      } else {
        toast.error('Failed to update appointment.')
      }
    } catch (error: any) {
      if (
        error.response?.data?.response &&
        Array.isArray(error.response.data.response)
      ) {
        error.response.data.response.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`)
        })
      } else {
        toast.error('An error occurred while updating the appointment.')
      }
    }
  }
  return (
    <div>
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        Vitals
      </h3>
      {isUpdatingAppointment ? (
        <p>Loading appointment details...</p>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
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
                      options={doctors?.map((doctor: Doctor) => ({
                        label: doctor.name,
                        value: doctor.id,
                      }))}
                      value={selectedDoctor}
                      disabled
                      placeholder="Select Doctor"
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
                      defaultValue={dayjs(consultation.scheduled_date)}
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
                defaultValue={consultation.receptionist_comment ?? 'N/A'}
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
                      value={vitals?.blood_pressure ?? 'N/A'}
                      readOnly
                      className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pulseRate"
                      className="text-[#0061FF] text-[15px] mb-2 font-medium"
                    >
                      Pulse Rate
                    </label>
                    <input
                      id="pulseRate"
                      type="text"
                      value={vitals?.pulse_rate ?? 'N/A'}
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
                      value={consultation.nurse_name ?? 'N/A'}
                      readOnly
                      className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
                    />
                  </div>
                  <div className="w-[30%]">
                    <label
                      htmlFor="vitalsDate"
                      className="text-[#0061FF] text-[15px] mb-2 font-medium"
                    >
                      Date
                    </label>
                    <DatePicker
                      id="vitalsDate"
                      className="w-full p-1.5 bg-[#F5F6FA] border border-[#CCCCCC] rounded-[8px]"
                      defaultValue={dayjs(consultation.scheduled_date)}
                      disabled
                      placeholder="Select Date"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Report Section with Improved UI */}
            <div className="w-full col-span-2">
              <span className="text-[#0061FF] font-medium text-lg">
                Doctor Report
              </span>
              <div className="border-[#0061FF] border rounded-lg p-5 w-full mt-2">
                <div className="flex items-center w-full gap-5 mb-4">
                  <div className="w-[70%]">
                    <label
                      htmlFor="procedure"
                      className="text-[#0061FF] text-[15px] mb-2 font-medium"
                    >
                      Procedure
                    </label>
                    <Select
                      id="procedure"
                      className="w-full"
                      placeholder="Select a procedure"
                      loading={isBillsLoading}
                      value={selectedProcedure || undefined}
                      onChange={(value) => setSelectedProcedure(value)}
                    >
                      {billsData?.response.data.map((bill) => (
                        <Select.Option key={bill.id} value={bill.name}>
                          {bill.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div className="w-[20%]">
                    <label
                      htmlFor="quantity"
                      className="text-[#0061FF] text-[15px] mb-2 font-medium"
                    >
                      Quantity
                    </label>
                    <Input
                      id="quantity"
                      className="w-full"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="w-[10%] flex items-end mt-5">
                    <Button
                      type="primary"
                      className="bg-[#0061FF] h-[38px]"
                      onClick={handleAddProcedure}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Existing Procedures List */}
                {consultation?.procedures?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-[#0061FF] font-medium mb-2">
                      Existing Procedures
                    </h4>
                    <div className="bg-[#F5F6FA] p-3 rounded-md">
                      {consultation.procedures.map((proc: any, index: any) => {
                        const procedureName =
                          billsData?.response.data.find(
                            (bill) => bill.id === proc.billItemId
                          )?.name || 'Unknown Procedure'

                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center mb-2 pb-2 border-b border-[#CCCCCC] last:border-b-0 last:mb-0 last:pb-0"
                          >
                            <div className="flex-1">
                              <span className="font-medium">
                                {procedureName}
                              </span>
                              <span className="ml-2 text-gray-500">
                                x{proc.quantity}
                              </span>
                            </div>
                            <Button
                              danger
                              type="text"
                              size="small"
                              onClick={() =>
                                handleDeleteProcedure(proc.billItemId)
                              }
                              loading={isDeletingBillItem}
                            >
                              Remove
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Procedures List */}
                {selectedProcedures.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-[#0061FF] font-medium mb-2">
                      Selected Procedures
                    </h4>
                    <div className="bg-[#F5F6FA] p-3 rounded-md">
                      {selectedProcedures.map((proc, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2 pb-2 border-b border-[#CCCCCC] last:border-b-0 last:mb-0 last:pb-0"
                        >
                          <div className="flex-1">
                            <span className="font-medium">{proc.name}</span>
                            <span className="ml-2 text-gray-500">
                              x{proc.quantity}
                            </span>
                          </div>
                          <Button
                            danger
                            type="text"
                            size="small"
                            onClick={() => handleRemoveProcedure(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                value={doctorComment}
                onChange={(e) => setDoctorComment(e.target.value)}
                className="p-1.5 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center justify-between my-5">
            <button
              className="border text-[#0061FF] border-[#0061FF] rounded px-20 py-2.5"
              onClick={onClose}
            >
              CANCEL
            </button>
            <button
              className="text-white bg-[#0061FF] rounded px-20 py-2.5"
              onClick={handleSubmit}
              disabled={isUpdatingAppointment}
            >
              {isUpdatingAppointment ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default DoctorPatientVitalsModal
