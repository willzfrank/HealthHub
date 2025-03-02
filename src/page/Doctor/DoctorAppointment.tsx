import { useState } from 'react'
import { Table, Pagination, Modal as AntdModal } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientVitalsModal from '../../component/ModalComponent/DoctorPatientVitalsModal'
import useFetchAppointmentsList from '../../api/hooks/useFetchAppointmentsList'
import { IAppointmentItem } from '../../types/types'

interface AppointmentItem {
  id: number
  file_number: string
  patient_name: string
  consultation_name: string
  doctor: string
  scheduled_date: string
  vitals_status: string
}

const DoctorAppointment = () => {
  const {
    data: appointmentData,
    error: isAppointmentError,
    isLoading: isAppointmentLoading,
  } = useFetchAppointmentsList()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Details')
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointmentItem | null>(null)

  const showModal = (record: IAppointmentItem) => {
    setSelectedAppointment(record)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedAppointment(null)
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const columns = [
    {
      title: <span className="text-[#69686A]">Date/Time </span>,
      dataIndex: 'scheduled_date',
      key: 'scheduled_date',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: <span className="text-[#69686A]">Patient ID </span>,
      dataIndex: 'file_number',
      key: 'file_number',
    },
    {
      title: <span className="text-[#69686A]">Patient Name </span>,
      dataIndex: 'patient_name',
      key: 'patient_name',
    },
    {
      title: <span className="text-[#69686A]">Purpose </span>,
      dataIndex: 'consultation_name',
      key: 'consultation_name',
    },
    {
      title: <span className="text-[#69686A]">Doctor </span>,
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: <span className="text-[#69686A]">Status </span>,
      dataIndex: 'consultation_status',
      key: 'consultation_status',
      render: (status: number) => {
        const statusMap: Record<number, { label: string; color: string }> = {
          0: { label: 'Close', color: 'bg-[#f0edcc] text-[#bbae15]' },
          1: { label: 'Active', color: 'bg-[#ccf0eb] text-[#70d5c7]' },
        }

        const statusInfo = statusMap[status] || {
          label: 'Unknown',
          color: 'bg-gray-200 text-gray-600',
        }

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm ${statusInfo.color}`}
          >
            {statusInfo.label}
          </span>
        )
      },
    },

    {
      title: <span className="text-[#69686A]">View </span>,
      key: 'view',
      render: (_: any, record: IAppointmentItem) => (
        <Icon
          icon="mdi:eye"
          width="20"
          height="20"
          className="cursor-pointer text-[#0061FF]"
        />
      ),
    },
    {
      title: <span className="text-[#69686A]">Action </span>,
      key: 'action',
      render: (_: any, record: IAppointmentItem) => (
        <Icon
          icon="system-uicons:enter"
          width="21"
          height="21"
          onClick={() => showModal(record)}
          className="cursor-pointer"
        />
      ),
    },
  ]

  return (
    <Layout>
      <HeaderSection title="Appointments" />

      {/* Table */}
      <Table
        columns={columns}
        dataSource={appointmentData?.response?.data}
        pagination={false}
        loading={isAppointmentLoading}
        rowKey="id"
      />

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#69686A]">
            {appointmentData?.response?.data?.length ?? 0}{' '}
          </span>
          <span className="text-[#69686A]">Shown on page</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#69686A]">Page</span>
          <Pagination
            current={appointmentData?.response?.current_page}
            total={appointmentData?.response?.total}
            pageSize={appointmentData?.response?.per_page}
          />
        </div>
      </div>

      <AntdModal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <DoctorPatientVitalsModal appointmentData={selectedAppointment} />
      </AntdModal>

      {/* <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Joe Biden - CPD-5002"
      >
        <PatientInformationModal
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
      </Modal> */}
    </Layout>
  )
}

export default DoctorAppointment
