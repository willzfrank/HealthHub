import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DashboardCardSection from '../../component/HealthHubComponent/DashboardSection/DashboardCardSection'
import DashboardTable from '../../component/HealthHubComponent/DashboardSection/DashboardTable'
import Modal from '../../component/common/Modal'
import UserRegistrationModal from '../../component/ModalComponent/UserRegistrationModal'
import DashboardMetricCard from '../../component/HealthHubComponent/DashboardSection/DashboardMetricCard'
import useAdminStats from '../../api/hooks/useAdminStats'
import useFetchPatientsList from '../../api/hooks/useFetchPatientsList'
import { IAppointmentItem, IPatient } from '../../types/types'

const ReceptionistDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { data: adminData, isLoading, error } = useAdminStats()
  const {
    data: patientData,
    isLoading: isPatientLoading,
    error: patientError,
  } = useFetchPatientsList(1, 10)

  const handleNewPatientClick = () => {
    setIsModalOpen(true)
  }

    const handleBookAppointmentClick = () => {
      navigate('/patients') 
    }

  /** Extract API response */
  const appointments = adminData?.response?.appointments_today ?? []
  const counts = adminData?.response?.counts ?? {
    total_patients: 0,
    waiting_today: 0,
    seen_today: 0,
    scheduled_tomorrow: 0,
    seen_this_year: 0,
  }

  /** Headers */
  const appointmentsHeaders = ['Time', 'Patient', 'Purpose', 'Doctor', 'View']
  const patientsHeaders = [
    'Patient ID',
    'Patient Name',
    'Reg. Date',
    'Last Visit',
    'Date',
    'View',
  ]
  const eventsHeaders = ['Date', 'Patient', 'Event']

  /** Data Population */
  const appointmentsData = appointments.map((apt: IAppointmentItem) => ({
    id: `apt-${apt.id}`,
    cells: [
      new Date(apt.scheduled_date).toLocaleString(),
      apt.patient_name,
      apt.consultation_name,
      apt.doctor,
      <Icon icon="mdi:eye-outline" width="20" height="20" />,
    ],
  }))

  const patientsData =
    patientData?.response?.data?.length > 0
      ? patientData.response.data.map((patient: IPatient) => ({
          id: `pat-${patient.id}`,
          cells: [
            patient.file_number || 'N/A',
            patient.name || 'N/A',
            new Date(patient.created_at).toLocaleDateString(),
            patient.last_visited
              ? new Date(patient.last_visited).toLocaleDateString()
              : 'N/A',
            patient.next_scheduled_date
              ? new Date(patient.next_scheduled_date).toLocaleDateString()
              : 'N/A',
            <Icon icon="mdi:eye-outline" width="20" height="20" />,
          ],
        }))
      : []

  const getUpcomingBirthdays = (
    patients: IPatient[]
  ): Array<{ id: string; cells: React.ReactNode[] }> => {
    const currentYear = new Date().getFullYear()

    return patients
      .map((patient) => {
        const dob = new Date(patient.date_of_birth)
        if (isNaN(dob.getTime())) return null

        const birthdayThisYear = new Date(
          currentYear,
          dob.getMonth(),
          dob.getDate()
        )

        if (birthdayThisYear >= new Date()) {
          return {
            id: `evt-${patient.id}`,
            cells: [
              birthdayThisYear.toLocaleDateString(),
              patient.name,
              'Birthday',
            ],
          }
        }

        return null
      })
      .filter(Boolean) as Array<{ id: string; cells: React.ReactNode[] }>
  }

  const eventsData = patientData?.response?.data
    ? getUpcomingBirthdays(patientData.response.data)
    : []

  return (
    <Layout>
      <HeaderSection />

      <div className="grid grid-cols-4 gap-4">
        <DashboardMetricCard />
        <div className="rounded-lg h-[95px] bg-white p-3.5 shadow-sm">
          <div className="space-y-4 flex items-start flex-col">
            <span className="text-gray-600">Patients Queue</span>
            <span className="text-3xl font-bold text-gray-900">
              {counts?.waiting_today ?? 0}
            </span>
          </div>
        </div>

        {[
          {
            id: 'new-patient',
            title: 'New Patient',
            onClick: handleNewPatientClick,
          },
          {
            id: 'book-appointment',
            title: 'Book Appointment',
            onClick: handleBookAppointmentClick, 
          },
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
