import useAdminStats from '../../api/hooks/useAdminStats'
import HeaderSection from '../../component/common/HeaderSection'
import TodayAppointmentsTable from '../../component/common/TodayAppointmentsTable'
import VitalsSummaryGrid from '../../component/HealthHubComponent/DashboardSection/NurseVitalsSummaryGrid'
import Layout from '../../layout/HealthHubLayout'

type Props = {}

const NurseDashboard = (props: Props) => {
  const { data: adminData, isLoading, error } = useAdminStats()
  const vitalsCounts = adminData?.response?.vitals_counts ?? {
    today_count: 0,
    week_count: 0,
    month_count: 0,
    year_count: 0,
  }

  // Mapping vitalsCounts to match statsData format
  const statsData = [
    {
      id: 1,
      title: 'Today, you have taken vitals for',
      count: vitalsCounts.today_count,
      label: 'patients',
    },
    {
      id: 2,
      title: 'This week, you have taken vitals for',
      count: vitalsCounts.week_count,
      label: 'patients',
    },
    {
      id: 3,
      title: 'This month, you have taken vitals for',
      count: vitalsCounts.month_count,
      label: 'patients',
    },
    {
      id: 4,
      title: 'This year, you have taken vitals for',
      count: vitalsCounts.year_count,
      label: 'patients',
    },
  ]
  return (
    <Layout>
      <HeaderSection />
      <VitalsSummaryGrid statsData={statsData} />

      {/* Table Section */}
      <TodayAppointmentsTable />
    </Layout>
  )
}

export default NurseDashboard
