import HeaderSection from "../../component/common/HeaderSection"
import TodayAppointmentsTable from "../../component/common/TodayAppointmentsTable"
import VitalsSummaryGrid from "../../component/HealthHubComponent/DashboardSection/NurseVitalsSummaryGrid"
import Layout from "../../layout/HealthHubLayout"
import { statsData } from "../../utils/data"


type Props = {}

const NurseDashboard = (props: Props) => {
 

  return (
    <Layout role="nurse">
      <HeaderSection />
      <VitalsSummaryGrid statsData={statsData} />

      {/* Table Section */}
     <TodayAppointmentsTable/>
    </Layout>
  )
}

export default NurseDashboard
