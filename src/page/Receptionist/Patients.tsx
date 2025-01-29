import React, { useState } from 'react'
import { Table, Pagination, Menu, Dropdown } from 'antd'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import { Icon } from '@iconify/react'
import Modal from '../../component/common/Modal'
import PatientInformationModal from '../../component/ModalComponent/PatientInformationModal'
import useAppointments from '../../api/hooks/useAppointments'
import { getAuthCookie } from '../../api/axiosInstance'

const Patients = () => {
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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPage(newPage)
    setPerPage(newPageSize)
  }

  const columns = [
    {
      title: <span className="text-[#3A3A49]">Patient ID </span>,
      dataIndex: 'file_number',
      key: 'patientID',
    },
    {
      title: <span className="text-[#3A3A49]">Patient Name </span>,
      dataIndex: 'name',
      key: 'patientName',
    },
    {
      title: <span className="text-[#3A3A49]">Reg. Date </span>,
      dataIndex: 'regDate',
      key: 'regDate',
    },
    {
      title: <span className="text-[#3A3A49]">Last Appointment </span>,
      dataIndex: 'lastAppointment',
      key: 'lastAppointment',
    },
    {
      title: <span className="text-[#3A3A49]">Last Visit </span>,
      dataIndex: 'lastVisit',
      key: 'lastVisit',
    },
    {
      title: <span className="text-[#3A3A49]">Doctor</span>,
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: <span className="text-[#3A3A49]">Next Appointment</span>,
      dataIndex: 'nextAppointment',
      key: 'nextAppointment',
    },
    {
      title: <span className="text-[#3A3A49]">Actions </span>,
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
      <HeaderSection title="Patients" />

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

      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={columns}
        dataSource={data?.response?.data || []}
        pagination={false}
        loading={isLoading}
        rowKey="patientID"
      />

      <footer className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#3A3A49]">
            {data?.response?.data?.length}{' '}
          </span>
          <span className="text-[#3A3A49]">Shown on page</span>
        </div>
        <Pagination
          current={data?.response?.current_page || 1}
          total={data?.response?.total || 0}
          pageSize={perPage}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </footer>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Joe Biden - CPD-5002"
      >
        <PatientInformationModal
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
      </Modal>
    </Layout>
  )
}

export default Patients
