import React, { useState } from 'react'
import { Table, Pagination, Dropdown } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'
import PatientInformationModal from '../../component/ModalComponent/PatientInformationModal'


interface AppointmentItem {
  key: string
  patientID: string
  patientName: string
  purpose: string
  doctor: string
  payment: string
  date: string
  vitals: 'Done' | 'Pending'
}

const DoctorAppointment = () => {
  // Sample Data
  const [data, setData] = useState<AppointmentItem[]>([
    {
      key: '1',
      patientID: 'P001',
      patientName: 'John Doe',
      purpose: 'Check-up',
      doctor: 'Dr. Smith',
      payment: 'Paid',
      date: '2023-10-01 10:00 AM',
      vitals: 'Done' as const,
    },
    {
      key: '2',
      patientID: 'P002',
      patientName: 'Jane Roe',
      purpose: 'Consultation',
      doctor: 'Dr. Brown',
      payment: 'Pending',
      date: '2023-10-02 11:00 AM',
      vitals: 'Pending' as const,
    },
    // Add more rows as needed
  ])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [filter, setFilter] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Details')

  // Handle row selection
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  // Handle filtering
  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  // Function to handle modal visibility
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  // Columns definition
  const columns = [
    {
      title: <span className="text-[#69686A]">Date/Time </span>,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <span className="text-[#69686A]">Patient ID </span>,
      dataIndex: 'patientID',
      key: 'patientID',
    },
    {
      title: <span className="text-[#69686A]">Patient Name </span>,

      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: <span className="text-[#69686A]">Purpose </span>,
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: <span className="text-[#69686A]">Doctor </span>,
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: <span className="text-[#69686A]">Status </span>,
      key: 'vitals',
      render: (_text: any, item: AppointmentItem) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            item.vitals === 'Done'
              ? 'bg-[#ccf0eb] text-[#70d5c7]'
              : 'bg-[#f0edcc] text-[#bbae15]'
          }`}
        >
          {item.vitals}
        </span>
      ),
    },
    {
      title: <span className="text-[#69686A]">Actions </span>,
      key: 'actions',
      render: () => (
        <Icon
          icon="bitcoin-icons:exit-outline"
          width="20"
          height="20"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        />
      ),
    },

    {
      title: <span className="text-[#69686A]">View </span>,
      key: 'view',
      render: () => (
        <Icon
          icon="mdi:eye"
          width="20"
          height="20"
          onClick={showModal}
          className="cursor-pointer text-[#0061FF]"
        />
      ),
    },
  ]

  return (
    <Layout role="nurse">
      <HeaderSection title="Appointments" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="rounded bg-white p-2 flex items-center">
          <span className="text-[#202224] text-[14px]">
            Showing results for{' '}
          </span>
          <div className="mx-2 border-l border-[#979797] h-4"></div>
          <Dropdown
            menu={{
              items: [
                { key: 'purpose', label: 'Purpose' },
                // Add more items as needed
              ],
            }}
            trigger={['click']}
          >
            <button className="text-[#202224] text-[11px] outline-none flex items-center">
              Purpose
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
                { key: 'all-vitals', label: 'Status' },
                // Add more items as needed
              ],
            }}
            trigger={['click']}
          >
            <button className="text-[#202224] text-[11px] outline-none flex items-center">
              Status
              <Icon
                icon="mdi:chevron-down"
                width="16"
                height="16"
                className="ml-1"
              />
            </button>
          </Dropdown>
        </div>

        <div className="flex justify-end gap-1.5 items-center mb-4">
          <Dropdown
            menu={{
              items: [
                { key: '', label: 'All' },
                { key: 'Paid', label: 'Paid' },
                { key: 'Pending', label: 'Pending' },
              ],
              onClick: (e) => handleFilterChange(e.key),
            }}
            trigger={['click']}
          >
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
          <span className="border-[#0061FF] border-b text-[#69686A]">
            {data.length}{' '}
          </span>
          <span className="text-[#69686A]">Shown on page</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#69686A]">Page</span>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>

      

        <Modal
        isOpen={isModalVisible}
        onClose={handleCancel}
        title="Health Information"
        centerTitle={true}
      >
        <DoctorPatientViewFormModal />
      </Modal>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Joe Biden - CPD-5002"
      >
        <PatientInformationModal
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          role="doctor"
        />
      </Modal>
    </Layout>
  )
}

export default DoctorAppointment
