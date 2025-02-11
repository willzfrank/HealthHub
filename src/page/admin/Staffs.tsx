import React, { useState } from 'react'
import { Table, Pagination } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import Modal from '../../component/common/Modal'

interface StaffItem {
  key: string
  staffID: string
  name: string
  role: string
  department: string
  email: string
  phone: string
}

const Staffs = () => {
  const [data, setData] = useState<StaffItem[]>([
    {
      key: '1',
      staffID: 'STF001',
      name: 'Dr. John Smith',
      role: 'Surgeon',
      department: 'Surgery',
      email: 'john.smith@example.com',
      phone: '(123) 456-7890',
    },
    {
      key: '2',
      staffID: 'STF002',
      name: 'Nurse Jane Doe',
      role: 'Nurse',
      department: 'Pediatrics',
      email: 'jane.doe@example.com',
      phone: '(987) 654-3210',
    },
  ])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Staff ID',
      dataIndex: 'staffID',
      key: 'staffID',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Icon
          icon="mdi:eye"
          width="20"
          height="20"
          className="cursor-pointer text-[#0061FF]"
        />
      ),
    },
  ]

  return (
    <Layout>
      <HeaderSection title="Staff Members" />

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

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#69686A]">
            {data.length}{' '}
          </span>
          <span className="text-[#69686A]"> Shown on page</span>
        </div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </Layout>
  )
}

export default Staffs
