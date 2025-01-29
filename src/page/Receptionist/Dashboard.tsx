import { useState } from 'react'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DashboardCardSection from '../../component/HealthHubComponent/DashboardSection/DashboardCardSection'
import DashboardTable from '../../component/HealthHubComponent/DashboardSection/DashboardTable'
import Modal from '../../component/common/Modal'
import UserRegistrationModal from '../../component/ModalComponent/UserRegistrationModal'
import DashboardMetricCard from '../../component/HealthHubComponent/DashboardSection/DashboardMetricCard'

// Main Dashboard Component
const ReceptionistDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewPatientClick = () => {
    setIsModalOpen(true)
  }

  const appointmentsHeaders = [
    'Date',
    'Patient',
    'Purpose',
    'Doctor',
    'Payment',
    'View',
  ]
  const appointmentsData = [
    {
      id: 'apt-1',
      cells: [
        '10 Nov 2024 08:30 AM',
        'John Doe',
        'Consultation',
        'Dr. Smith',
        'Unpaid',
        <Icon icon="bitcoin-icons:exit-outline" width="20" height="20" />,
      ],
    },
  ]

  const consultationsHeaders = ['Date', 'Patient', 'Doctor']
  const consultationsData = [
    {
      id: 'cons-1',
      cells: ['10 Nov 2024 08:30 AM', 'John Doe', 'Dr. Smith'],
    },
  ]

  const patientsHeaders = [
    'Patient ID',
    'Name',
    'Reg. Date',
    'Last Visit',
    'Date',
    'View',
  ]
  const patientsData = [
    {
      id: 'pat-1',
      cells: [
        '1001',
        'John Doe',
        '10 Nov 2004',
        'Consultation',
        '10 Nov 2024 08:30 AM',
        <Icon icon="bitcoin-icons:exit-outline" width="20" height="20" />,
      ],
    },
  ]

  const eventsHeaders = ['Date', 'Patient', 'Event']
  const eventsData = [
    {
      id: 'evt-1',
      cells: ['10 Nov 2024 08:30 AM', 'John Doe', 'Birthday'],
    },
  ]

  return (
    <Layout>
      <HeaderSection />

      <div className="grid grid-cols-4 gap-4">
        <DashboardMetricCard />
        {[
          {
            id: 'new-patient',
            title: 'New Patient',
            onClick: handleNewPatientClick,
          },
          { id: 'book-appointment', title: 'Book Appointment' },
          { id: 'payments', title: 'Payments' },
        ].map(({ id, title, onClick }) => (
          <DashboardCardSection key={id} title={title} onClick={onClick} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <DashboardTable
          title="Today’s Appointments"
          headers={appointmentsHeaders}
          data={appointmentsData}
        />
        <DashboardTable
          title="Consultations"
          headers={consultationsHeaders}
          data={consultationsData}
        />
        <DashboardTable
          title="Recent Patients"
          headers={patientsHeaders}
          data={patientsData}
        />
        <DashboardTable
          title="Upcoming Events"
          headers={eventsHeaders}
          data={eventsData}
        />
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Patient"
      >
        <UserRegistrationModal />
      </Modal>
    </Layout>
  )
}

export default ReceptionistDashboard
