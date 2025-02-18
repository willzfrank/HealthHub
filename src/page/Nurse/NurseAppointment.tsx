import React, { useState } from 'react'
import { Table, Pagination, Modal as AntdModal } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import NursePatientVitalsModal from '../../component/ModalComponent/NursePatientVitalsModal'
import useFetchAppointmentsList from '../../api/hooks/useFetchAppointmentsList'
import { IAppointmentItem } from '../../types/types'

const NurseAppointment = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointmentItem | null>(null)

  const showModal = (record: IAppointmentItem) => {
    setSelectedAppointment(record)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setSelectedAppointment(null)
    setIsModalVisible(false)
  }

  const {
    data: appointmentData,
    error: isAppointmentError,
    isLoading: isAppointmentLoading,
  } = useFetchAppointmentsList()

  const formattedData = appointmentData?.response?.data.map(
    (item: IAppointmentItem) => ({
      key: item.id,
      patientID: item.file_number,
      patientName: item.patient_name,
      purpose: item.consultation_name,
      doctor: item.doctor,
      date: item.scheduled_date
        ? new Date(item.scheduled_date).toLocaleString()
        : '',
      vitals: item.vitals_status === 'pending' ? 'Pending' : 'Done',
      receptionist_comment: item.receptionist_comment,
      vitals_blood_pressure: item.vitals_blood_pressure,
      rescheduled_date: item.rescheduled_date,
      vitals_pulse_rate: item.vitals_pulse_rate,
    })
  )

  const columns = [
    { title: 'Date/Time', dataIndex: 'date', key: 'date' },
    { title: 'Patient ID', dataIndex: 'patientID', key: 'patientID' },
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Purpose', dataIndex: 'purpose', key: 'purpose' },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
    {
      title: 'Vitals',
      key: 'vitals',
      render: (_: any, item: any) => (
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
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IAppointmentItem) => (
        <Icon
          icon="bitcoin-icons:exit-outline"
          width="20"
          height="20"
          onClick={() => showModal(record)}
          className="cursor-pointer"
        />
      ),
    },
  ]

  return (
    <Layout>
      <HeaderSection title="Appointments" />
      <Table
        columns={columns}
        dataSource={formattedData}
        pagination={false}
        loading={isAppointmentLoading}
      />
      <AntdModal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <NursePatientVitalsModal
          appointment={selectedAppointment}
          closeModal={()=> setIsModalVisible(false)}
        />
      </AntdModal>
      <div className="flex justify-between items-center mt-4">
        <span>{formattedData?.length ?? 0} Shown on page</span>
        <Pagination
          defaultCurrent={1}
          total={appointmentData?.response?.total}
        />
      </div>
    </Layout>
  )
}

export default NurseAppointment
