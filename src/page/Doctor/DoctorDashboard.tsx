import { useState } from 'react'
import useAdminStats from '../../api/hooks/useAdminStats'
import HeaderSection from '../../component/common/HeaderSection'
import TodayAppointmentsTable from '../../component/common/TodayAppointmentsTable'
import VitalsSummaryGrid from '../../component/HealthHubComponent/DashboardSection/NurseVitalsSummaryGrid'
import Layout from '../../layout/HealthHubLayout'
import { Modal as AntdModal } from 'antd'
import { IAppointmentItem } from '../../types/types'
import DoctorPatientVitalsModal from '../../component/ModalComponent/DoctorPatientVitalsModal'

type Props = {}

const DoctorDashboard = (props: Props) => {
  const { data: adminData, isLoading, error } = useAdminStats()
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointmentItem | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const counts = adminData?.response?.counts ?? {
    waiting_today: 0,
    seen_today: 0,
    scheduled_tomorrow: 0,
    seen_this_year: 0,
  }

  const showModal = (record: IAppointmentItem) => {
    setSelectedAppointment(record)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedAppointment(null)
  }

  const statsData = [
    {
      id: 1,
      title: 'Waiting to see you',
      count: counts.waiting_today,
      label: 'patients',
    },
    {
      id: 2,
      title: 'Seen Today',
      count: counts.seen_today,
      label: 'patients',
    },
    {
      id: 3,
      title: 'Tomorrow Patients',
      count: counts.scheduled_tomorrow,
      label: 'patients',
    },
    {
      id: 4,
      title: 'This year, you have seen',
      count: counts.seen_this_year,
      label: 'patients',
    },
  ]

  return (
    <Layout>
      <HeaderSection />
      <VitalsSummaryGrid statsData={statsData} />
      <TodayAppointmentsTable showModal={showModal} isDoctor={true} />

      <AntdModal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <DoctorPatientVitalsModal
          appointmentData={selectedAppointment}
          onClose={handleCancel}
        />
      </AntdModal>
    </Layout>
  )
}

export default DoctorDashboard
