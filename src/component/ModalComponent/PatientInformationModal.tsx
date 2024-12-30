import PatientDetailsFormSection from '../HealthHubComponent/PatientSection/PatientDetailsFormSection'
import PatientHistoryFormSection from '../HealthHubComponent/PatientSection/PatientHistoryFormSection'
import TransactionsTable from '../HealthHubComponent/PatientSection/PatientTransactionTableSection'

type PatientInformationModalProps = {
  handleTabClick: (tab: string) => void
  activeTab: string
}

const PatientInformationModal = ({
  handleTabClick,
  activeTab,
  role,
}: PatientInformationModalProps & { role: string }) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-10">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 border border-[#CCCCCC] rounded">
          {['Details', 'History', 'Transactions'].map((tab) => (
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
        <span className="text-[#030229] text-xs">
          {activeTab === 'Details'
            ? 'Registration Date : 15 Dec 2004'
            : activeTab !== 'Transactions'
            ? 'Next Appointment : 15 Dec 2024'
            : 'Unpaid Invoice : NGN 300,000'}
        </span>
      </div>

      {/* Conditional Content */}
      <div className="mt-4">
        {activeTab === 'Details' && <PatientDetailsFormSection />}
        {activeTab === 'History' && <PatientHistoryFormSection role={role} />}
        {activeTab === 'Transactions' && <TransactionsTable />}
      </div>
    </div>
  )
}

export default PatientInformationModal
