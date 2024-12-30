import React, { useState } from 'react'
import { Table, Pagination, Menu, Dropdown } from 'antd'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import { Icon } from '@iconify/react'
import Modal from '../../component/common/Modal'
import PatientInformationModal from '../../component/ModalComponent/PatientInformationModal'

const Patients = () => {
  // Sample Data
  const [data, setData] = useState([
    {
      key: '1',
      patientID: 'P001',
      patientName: 'John Doe',
      regDate: '04 Sep 2019',
      doctor: 'Dr. Smith',
      lastAppointment: '04 Sep 2019',
      lastVisit: 'Tooth Removal',
      payment: 'Paid',
      nextAppointment: '20 Sep 2019',
    },
    {
      key: '2',
      patientID: 'P002',
      patientName: 'Jane Roe',
      regDate: 'Consultation',
      doctor: 'Dr. Brown',
      lastAppointment: '04 Sep 2019',
      lastVisit: 'Tooth Removal',
      payment: 'Pending',
      nextAppointment: '24 Sep 2019',
    },
  ])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [filter, setFilter] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Details')

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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

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
    <Layout role="receptionist">
      <HeaderSection title="Patients" />

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
      <footer className="flex justify-between items-center mt-4">
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
      </footer>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Joe Biden - CPD-5002"
      >
        <PatientInformationModal 
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        role="receptionist"
        />
      </Modal>
    </Layout>
  )
}

export default Patients
