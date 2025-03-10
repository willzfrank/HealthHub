import { useFetchBills } from '../../api/hooks/useFetchBills'
import React from 'react'
import PatientDetailsFormSection from '../HealthHubComponent/PatientSection/PatientDetailsFormSection'
import PatientHistoryFormSection from '../HealthHubComponent/PatientSection/PatientHistoryFormSection'
// import TransactionsTable from '../HealthHubComponent/PatientSection/PatientTransactionTableSection'
import useFetchAppointment from '../../api/hooks/useFetchAppointment'

type PatientInformationModalProps = {
  handleTabClick: (tab: string) => void
  activeTab: string
  appointmentData: any
}

const PatientInformationModal = ({
  handleTabClick,
  activeTab,
  appointmentData,
}: PatientInformationModalProps) => {
  const { data: appointmentDetails, isLoading: isAppointmentDetailsLoading } =
    useFetchAppointment(appointmentData?.id ?? 0)

  // Fetch bills data
  const { data: billsData, isLoading: isBillsLoading } = useFetchBills(1, 10)

  const patient = appointmentDetails?.response?.patient
  const consultation = appointmentDetails?.response?.consultation
  const medicalHistory = appointmentDetails?.response?.medical_history
  const procedures = consultation?.procedures

  // Transform procedures data to include the procedure name
  const transformedProcedures = procedures?.map((proc: any) => {
    const procedure = billsData?.response.data.find(
      (bill: any) => bill.id === proc.billItemId
    )
    return {
      billItemId: proc.billItemId,
      quantity: proc.quantity,
      name: procedure?.name ?? 'Unknown Procedure', 
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between gap-10">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 border border-[#CCCCCC] rounded">
          {['Details', 'History'].map((tab) => (
            <div
              key={tab}
              onClick={() => handleTabClick(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#605BFF' : 'transparent',
                color: activeTab === tab ? 'white' : 'black',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
              }}
              className="text-xs"
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Conditional Content */}
      <div className="mt-4">
        {activeTab === 'Details' && (
          <PatientDetailsFormSection patient={patient} />
        )}
        {activeTab === 'History' && (
          <PatientHistoryFormSection medicalHistory={medicalHistory} />
        )}
        {/* {activeTab === 'Transactions' && (
          <TransactionsTable procedures={transformedProcedures || []} />
        )} */}
      </div>
    </div>
  )
}

export default PatientInformationModal
