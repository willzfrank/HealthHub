import React, { useState } from 'react'
import { Table, Pagination, Menu, Dropdown } from 'antd'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import { Icon } from '@iconify/react'
import Modal from '../../component/common/Modal'
import PatientInformationModal from '../../component/ModalComponent/PatientInformationModal'
import useAppointments from '../../api/hooks/useAppointments'
import { getAuthCookie } from '../../api/axiosInstance'

const AccountantProcedures = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [filter, setFilter] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Details')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useAppointments('2', perPage, page)

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
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

  const columns = [
    {
      title: 'Procedure',
      dataIndex: 'procedure',
      key: 'procedure',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Last Edit',
      dataIndex: 'lastEdit',
      key: 'lastEdit',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Edited By',
      dataIndex: 'editedBy',
      key: 'editedBy',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Icon
          icon="mdi:eye-outline"
          width="20"
          height="20"
          className="text-[#0061FF] cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      ),
    },
  ]

  return (
    <Layout>
      <HeaderSection title="Procedures" />
      <div className="flex justify-between gap-1.5 items-center mb-4">
        <div>Add new Procedures </div>
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
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={columns}
        dataSource={data?.response?.data || []}
        pagination={{
          current: data?.response?.current_page || 1,
          total: data?.response?.total || 0,
          pageSize: perPage,
          onChange: (newPage, newPageSize) => {
            setPage(newPage)
            setPerPage(newPageSize)
          },
          showSizeChanger: true,
        }}
        loading={isLoading}
        rowKey="procedure"
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Procedure Details"
      >
        <PatientInformationModal
          handleTabClick={setActiveTab}
          activeTab={activeTab}
        />
      </Modal>
    </Layout>
  )
}

export default AccountantProcedures
