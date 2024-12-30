import React, { useState } from 'react'
import {
  Table,
  Pagination,
  Menu,
  Dropdown,
} from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'

const AppointmentsTable = () => {
  // Sample Data
  const [data, setData] = useState([
    {
      key: '1',
      patientID: 'P001',
      patientName: 'John Doe',
      purpose: 'Check-up',
      doctor: 'Dr. Smith',
      payment: 'Paid',
    },
    {
      key: '2',
      patientID: 'P002',
      patientName: 'Jane Roe',
      purpose: 'Consultation',
      doctor: 'Dr. Brown',
      payment: 'Pending',
    },
    // Add more rows as needed
  ])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [filter, setFilter] = useState('')

  // Handle row selection
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  // Handle filtering
  const handleFilterChange = (value: string) => {
    setFilter(value)
    // Apply filtering logic here if needed
  }

  const filterMenu = (
    <Menu
      onClick={(e) => handleFilterChange(e.key)}
      items={[
        { key: '', label: 'All' },
        { key: 'Paid', label: 'Paid' },
        { key: 'Pending', label: 'Pending' },
      ]}
    />
  )

  // Columns definition
  const columns = [
    {
      title: <span className="text-[#3A3A49]">Patient ID </span>,
      dataIndex: 'patientID',
      key: 'patientID',
    },
    {
      title: <span className="text-[#3A3A49]">Patient Name </span>,

      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: <span className="text-[#3A3A49]">Purpose </span>,
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: <span className="text-[#3A3A49]">Doctor </span>,
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: <span className="text-[#3A3A49]">Payment </span>,
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: <span className="text-[#3A3A49]">Actions </span>,
      key: 'actions',
      render: () => (
        <Icon
          icon="mdi:eye-outline"
          width="20"
          height="20"
          className="text-[#0061FF]"
        />
      ),
    },
  ]

  return (
    <Layout role="receptionist">
      <HeaderSection title="Appointments" />

      {/* Header */}
      <div className="flex justify-end gap-1.5 items-center mb-4">
        <Dropdown overlay={filterMenu} trigger={['click']}>
          <button className="flex items-center gap-0.5 p-1.5 bg-[#0061FF] rounded">
            <Icon
              icon="line-md:filter"
              width="20"
              height="20"
              className="text-white"
            />
            <span className="text-white text-[16px]">Filter</span>
          </button>
        </Dropdown>
        <button className="flex items-center gap-0.5 p-1.5 bg-[#0061FF] rounded">
          <Icon
            icon="material-symbols:print-rounded"
            width="20"
            height="20"
            className="text-white"
          />
          <span className="text-white text-[16px]">Export</span>
          <Icon
            icon="bi:three-dots-vertical"
            width="16"
            height="16"
            className="text-white"
          />
        </button>
      </div>

      {/* Table */}
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#3A3A49]">
            {data.length}{' '}
          </span>
          <span className="text-[#3A3A49]">Shown on page</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#3A3A49]">Page</span>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </Layout>
  )
}

export default AppointmentsTable
