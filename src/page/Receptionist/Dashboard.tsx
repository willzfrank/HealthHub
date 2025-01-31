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

  const appointmentsHeaders = ['Time', 'Patient', 'Purpose', 'Doctor', 'View']
  const appointmentsData = [
    {
      id: 'apt-1',
      cells: [
        '10 Nov 2024',
        'John Doe',
        'Consultation',
        'Dr. Smith',
        <Icon icon="mdi:eye-outline" width="20" height="20" />,
      ],
    },
  ]

  const consultationsHeaders = ['Date', 'Patient', 'Doctor']
  const consultationsData = [
    {
      id: 'cons-1',
      cells: ['10 Nov 2024', 'John Doe', 'Dr. Smith'],
    },
  ]

  const patientsHeaders = [
    'Patient ID',
    'Patient Name',
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
        '10 Nov 2024',
        <Icon icon="bitcoin-icons:exit-outline" width="20" height="20" />,
      ],
    },
  ]

  const eventsHeaders = ['Date', 'Patient', 'Event']
  const eventsData = [
    {
      id: 'evt-1',
      cells: ['10 Nov 2024', 'John Doe', 'Birthday'],
    },
  ]

  return (
    <Layout>
      <HeaderSection />

      <div className="grid grid-cols-4 gap-4">
        <DashboardMetricCard />
        <div className="rounded-lg h-[95px] bg-white p-3.5 shadow-sm">
          <div className="space-y-4 flex items-start flex-col">
            <span className="text-gray-600">New Patients</span>
            <span className="text-3xl font-bold text-gray-900">20</span>
          </div>
        </div>

        {[
          {
            id: 'new-patient',
            title: 'New Patient',
            onClick: handleNewPatientClick,
          },
          { id: 'book-appointment', title: 'Book Appointment' },
        ].map(({ id, title, onClick }) => (
          <DashboardCardSection key={id} title={title} onClick={onClick} />
        ))}
      </div>
      <div className="my-5">
        <DashboardTable
          title="Today’s Appointments"
          headers={appointmentsHeaders}
          data={appointmentsData}
        />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="w-[70%]">
          <DashboardTable
            title="Recent Patients"
            headers={patientsHeaders}
            data={patientsData}
          />
        </div>
        <div className="w-[30%]">
          <DashboardTable
            title="Upcoming Events"
            headers={eventsHeaders}
            data={eventsData}
          />
        </div>
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
