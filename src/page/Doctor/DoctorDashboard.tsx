
import HeaderSection from '../../component/common/HeaderSection'
import TodayAppointmentsTable from '../../component/common/TodayAppointmentsTable'
import VitalsSummaryGrid from '../../component/HealthHubComponent/DashboardSection/NurseVitalsSummaryGrid'
import Layout from '../../layout/HealthHubLayout'
import { doctorStatsData } from '../../utils/data'

type Props = {}

const DoctorDashboard = (props: Props) => {
  return (
    <Layout role="doctor">
      <HeaderSection />
      <VitalsSummaryGrid statsData={doctorStatsData} />

      {/* Table Section */}
      <TodayAppointmentsTable />
    </Layout>
  )
}

export default DoctorDashboard
