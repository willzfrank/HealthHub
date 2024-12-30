import React from 'react'

type VitalsSummaryGridProps = {
  statsData: {
    id: number
    title: string
    count: number
    label: string
  }[]
}

const VitalsSummaryGrid: React.FC<VitalsSummaryGridProps> = ({ statsData }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsData.map((stat) => (
        <div key={stat.id} className="col-span-1">
          <div className="bg-white p-4 rounded-[10px]">
            <span className="text-[14px] text-[#030229] opacity-70">
              {stat.title}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[24px] font-bold">{stat.count}</span>
              <span className="text-[14px] text-[#091DD1] opacity-70">
                {stat.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VitalsSummaryGrid
