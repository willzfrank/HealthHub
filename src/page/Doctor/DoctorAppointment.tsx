import React, { useState } from 'react'
import { Table, Pagination, Dropdown } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'
import PatientInformationModal from '../../component/ModalComponent/PatientInformationModal'
import { getAuthCookie } from '../../api/axiosInstance'

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
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Details')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

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
    <Layout>
      <HeaderSection title="Appointments" />

      {/* Table */}
      <Table columns={columns} dataSource={data} pagination={false} />

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
        title="Vitals"
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
        />
      </Modal>
    </Layout>
  )
}

export default DoctorAppointment
