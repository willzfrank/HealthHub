import { Select, DatePicker, Button, Input, Divider } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { IAppointmentItem } from '../../types/types'
import useDoctors from '../../api/hooks/useDoctors'
import { useFetchBills } from '../../api/hooks/useFetchBills'
import { useAddBill } from '../../api/hooks/useAddBill' // Import the hook

type Props = {
  appointmentData: IAppointmentItem | null
}

const DoctorPatientVitalsModal = ({ appointmentData }: Props) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    appointmentData?.doctor ?? ''
  )
  const [selectedProcedure, setSelectedProcedure] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('1')
  const [showAddNewForm, setShowAddNewForm] = useState<boolean>(false)
  const [newProcedure, setNewProcedure] = useState({
    name: '',
    purchase_price: '',
    selling_price: '',
  })
  const [selectedProcedures, setSelectedProcedures] = useState<
    Array<{ name: string; quantity: string }>
  >([])

  console.log('appointmentData', appointmentData)

  const fullName = appointmentData?.patient_name ?? ''
  const nameParts = fullName.split(' ')

  const firstName = nameParts[0]
  const middleName =
    nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : ''
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''

  const { data: doctors, isLoading: isDoctorsLoading } = useDoctors(1)
  const { data: billsData, isLoading: isBillsLoading } = useFetchBills(1, 10)
  const addBillMutation = useAddBill()

  const handleAddProcedure = () => {
    if (selectedProcedure) {
      setSelectedProcedures([
        ...selectedProcedures,
        {
          name: selectedProcedure,
          quantity: quantity,
        },
      ])
      setSelectedProcedure('')
      setQuantity('1')
    }
  }

  const handleRemoveProcedure = (index: number) => {
    const updatedProcedures = [...selectedProcedures]
    updatedProcedures.splice(index, 1)
    setSelectedProcedures(updatedProcedures)
  }

  const handleAddNewProcedure = () => {
    if (
      newProcedure.name &&
      newProcedure.purchase_price &&
      newProcedure.selling_price
    ) {
      addBillMutation.mutate({
        name: newProcedure.name,
        purchase_price: newProcedure.purchase_price,
        selling_price: newProcedure.selling_price,
      })
      setNewProcedure({ name: '', purchase_price: '', selling_price: '' })
      setShowAddNewForm(false)
    }
  }

  return (
    <div>
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        Vitals
      </h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-5">
          {/* Previous code for patient info, etc. */}

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
