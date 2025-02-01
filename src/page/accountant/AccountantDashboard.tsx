import React, { useState } from 'react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import { Icon } from '@iconify/react'
import { Dropdown } from 'antd'

type Props = {}

const AccountantDashboard = (props: Props) => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

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
    </Layout>
  )
}

export default AccountantDashboard
