import React, { useState } from 'react'
import { Table, Pagination, Menu, Dropdown, Alert } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import Modal from '../../component/common/Modal'
import ReceptionistPatientFormModal from '../../component/ModalComponent/ReceptionistPatientFormModal'
import useFetchAppointmentsList from '../../api/hooks/useFetchAppointmentsList'
import { IAppointmentItem, IAppointmentStats } from '../../types/types'

const AppointmentsTable = () => {
  const {
    data: appointmentData,
    error: isAppointmentError,
    isLoading: isAppointmentLoading,
  } = useFetchAppointmentsList()

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [filter, setFilter] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPatient, setSelectedPatient] =
    useState<IAppointmentStats | null>(null)

  // Handle row selection
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  // Handle filtering
  const handleFilterChange = (value: string) => {
    setFilter(value)
    // Apply filtering logic here if needed
  }

  const showModal = (record: IAppointmentStats) => {
    setSelectedPatient(record)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedPatient(null)
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
      title: <span className="text-[#3A3A49]">Date</span>,
      dataIndex: 'scheduled_date',
      key: 'scheduled_date',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: <span className="text-[#3A3A49]">Patient ID </span>,
      dataIndex: 'file_number',
      key: 'file_number',
    },
    {
      title: <span className="text-[#3A3A49]">Patient Name </span>,
      dataIndex: 'patient_name',
      key: 'patient_name',
    },
    {
      title: <span className="text-[#3A3A49]">Purpose </span>,
      dataIndex: 'consultation_name',
      key: 'consultation_name',
    },
    {
      title: <span className="text-[#3A3A49]">Doctor </span>,
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: <span className="text-[#3A3A49]">Actions </span>,
      key: 'actions',
      render: (_: any, record: IAppointmentStats) => (
        <Icon
          icon="mdi:eye-outline"
          width="20"
          height="20"
          className="text-[#0061FF] cursor-pointer"
          onClick={() => showModal(record)}
        />
      ),
    },
  ]

  const dataSource =
    appointmentData?.response?.data.map((appointment:IAppointmentItem) => ({
      key: appointment.id,
      scheduled_date: appointment.scheduled_date,
      file_number: appointment.file_number,
      patient_name: appointment.patient_name,
      consultation_name: appointment.consultation_name,
      doctor: appointment.doctor,
      receptionist_comment: appointment.receptionist_comment,
    })) || []

  return (
    <Layout>
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

      {/* Loading State */}
      {isAppointmentError ? (
        <Alert
          message="Error"
          description="There was an error loading the appointments data."
          type="error"
          showIcon
        />
      ) : (
        // Table
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          loading={isAppointmentLoading}
        />
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#3A3A49]">
            {appointmentData?.response?.data.length}{' '}
          </span>
          <span className="text-[#3A3A49]">Shown on page</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#3A3A49]">Page</span>
          <Pagination
            current={appointmentData?.response?.current_page}
            total={appointmentData?.response?.total}
            pageSize={appointmentData?.response?.per_page}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalVisible}
        onClose={handleCancel}
        title="Schedule Appointment"
        centerTitle={true}
      >
        <ReceptionistPatientFormModal selectedPatient={selectedPatient} />
      </Modal>
    </Layout>
  )
}

export default AppointmentsTable
