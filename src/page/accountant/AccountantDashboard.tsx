import React, { useState } from 'react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import { Icon } from '@iconify/react'
import { Dropdown } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import DashboardTable from '../../component/HealthHubComponent/DashboardSection/DashboardTable'

type Props = {}

const AccountantDashboard = (props: Props) => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  const paymentsHeaders = [
    'Invoice ID',
    'Patient Name',
    'Procedure',
    'Amount',
    'Amount Paid',
    'Trnx Date',
  ]
  const paymentsData = [
    {
      id: 'pat-1',
      cells: [
        'IN-876364',
        'Jeremiah Lens',
        'PAYE',
        '5000',
        '5000',
        '10-06-2021',
      ],
    },
  ]

  // Revenue data from Oct 2023 to July 2024 with random values between 0-80
  const revenueData = [
    { month: 'Oct 2023', revenue: 45 },
    { month: 'Nov 2023', revenue: 62 },
    { month: 'Dec 2023', revenue: 78 },
    { month: 'Jan 2024', revenue: 56 },
    { month: 'Feb 2024', revenue: 67 },
    { month: 'Mar 2024', revenue: 43 },
    { month: 'Apr 2024', revenue: 58 },
    { month: 'May 2024', revenue: 73 },
    { month: 'Jun 2024', revenue: 65 },
    { month: 'Jul 2024', revenue: 70 },
  ]

  return (
    <Layout>
      <HeaderSection />
      <div className="flex justify-between items-center">
        <div className="rounded bg-white p-2 flex items-center">
          <span className="text-[#202224] text-[14px]">
            Showing results for{' '}
          </span>
          <div className="mx-2 border-l border-[#979797] h-4"></div>
          <Dropdown
            menu={{
              items: [
                { key: 'all-doctors', label: 'All Doctors' },
                // Add more doctor options here
              ],
            }}
            trigger={['click']}
          >
            <button className="text-[#202224] text-[11px] outline-none flex items-center">
              All Time
              <Icon
                icon="mdi:chevron-down"
                width="16"
                height="16"
                className="ml-1"
              />
            </button>
          </Dropdown>
          <div className="mx-2 border-l border-[#979797] h-4"></div>
          <Dropdown
            menu={{
              items: [
                { key: 'all-vitals', label: 'All Vitals' },
                // Add more vitals options here
              ],
            }}
            trigger={['click']}
          >
            <button className="text-[#202224] text-[11px] outline-none flex items-center">
              All Procedures
              <Icon
                icon="mdi:chevron-down"
                width="16"
                height="16"
                className="ml-1"
              />
            </button>
          </Dropdown>
        </div>
      </div>

      <div className="grid gap-5 my-5 grid-cols-4">
        <div className="space-y-2 flex flex-col items-start rounded-[10px] bg-white p-5">
          <span className="text-[#030229] text-[14px]">Revenue</span>
          <span className="text-[#000000] opacity-70 text-[28px] font-[800]">
            ₦198,000,000
          </span>
        </div>

        <div className="space-y-2 flex flex-col items-start rounded-[10px] bg-white p-5">
          <span className="text-[#030229] text-[14px]">Unpaid Invoice</span>
          <span className="text-[#000000] opacity-70 text-[28px] font-[800]">
            ₦9,000,000
          </span>
        </div>

        <div className="space-y-2 flex flex-col items-start rounded-[10px] bg-white p-5">
          <span className="text-[#030229] text-[14px]">Patients</span>
          <span className="text-[#000000] opacity-70 text-[28px] font-[800]">
            6000000
          </span>
        </div>

        <div className="space-y-2 flex flex-col items-start rounded-[10px] bg-white p-5">
          <span className="text-[#030229] text-[14px]">Invoice Created</span>
          <span className="text-[#000000] opacity-70 text-[28px] font-[800]">
            310,000
          </span>
        </div>
      </div>

      <div className="bg-white rounded p-5">
        <span className="text-[#030229] opacity-70 text-[18px] font-[700]">
          Revenue
        </span>
        <div className="w-full h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#5EC3FF"
                strokeWidth={4}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                name="Revenue (millions)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center justify-between my-5 w-full gap-5">
        <div className="w-[60%]">
          <DashboardTable
            title="Recent Payments"
            headers={paymentsHeaders}
            data={paymentsData}
          />
        </div>

        <div className="w-[40%]">
          <span className="text-[#030229] opacity-70 text-[18px] font-[700]">
            Payment Channels
          </span>
        </div>
      </div>
    </Layout>
  )
}

export default AccountantDashboard
