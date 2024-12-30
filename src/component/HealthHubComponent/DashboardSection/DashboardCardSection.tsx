type DashboardCardSectionProps = {
  title: string
  onClick?: () => void
}

const DashboardCardSection = ({ title,onClick }: DashboardCardSectionProps) => (
  <div className="p-4 md:p-6 w-full h-[88px] bg-[#1970FE] rounded-[10px] flex items-center justify-center"
   onClick={onClick}
  >
    <div className="text-[20px] font-bold text-white">{title}</div>
  </div>
)

export default DashboardCardSection
