import React, { useState } from 'react'

import { Table, Modal as AntdModal, Pagination, Menu, Dropdown } from 'antd'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import { Icon } from '@iconify/react'
import Modal from '../../component/common/Modal'
import PatientInformationModal from '../../component/ModalComponent/PatientInformationModal'
import useFetchGender from '../../api/hooks/useFetchGender'
import useFetchPatientsList from '../../api/hooks/useFetchPatientsList'
import { Gender } from '../../types/types'
import { formatDate } from '../../utils/utils'
import ScheduleModal from '../../component/ModalComponent/ScheduleModal'
import { getAuthCookie } from '../../api/axiosInstance'

const Patients = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Details')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const authState = getAuthCookie()
  const role = authState?.role?.name

  const { data: patientData, isLoading: isPatientLoading } =
    useFetchPatientsList(perPage, page)
  const { data: genderData, isLoading: isGenderLoading } = useFetchGender()
  const [selectedPatientData, setSelectedPatientData] = useState<any>(null)

  // Mapping the gender ID to gender name
  const getGenderName = (genderId: number | null) => {
    if (!genderId || !genderData.length) return 'N/A'
    const gender = genderData.find((g: Gender) => g.id === genderId)
    return gender ? gender.name : 'N/A'
  }

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

  const getAppointmentMessage = (
    appointmentDate: string | null,
    record: any
  ) => {
    if (!appointmentDate || isNaN(new Date(appointmentDate).getTime())) {
      return (
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => {
            setSelectedPatientData(record)
            setIsScheduleModalOpen(true)
          }}
        >
          <img src="/images/icons/tooth-calendar.svg" alt="calendar" />
          <span className="underline text-[#0061FF]">Schedule</span>
        </div>
      )
    }
    return formatDate(appointmentDate)
  }

  const columns = [
    {
      title: <span className="text-[#3A3A49]">Patient ID </span>,
      dataIndex: 'file_number',
      key: 'patientID',
      render: (text: string) => text || 'N/A',
    },
    {
      title: <span className="text-[#3A3A49]">Patient Name </span>,
      dataIndex: 'name',
      key: 'patientName',
      render: (text: string) => text || 'N/A',
    },
    {
      title: <span className="text-[#3A3A49]">Date of Birth</span>,
      dataIndex: 'date_of_birth',
      key: 'dob',
      render: (text: string) => formatDate(text) || 'N/A',
    },
    {
      title: <span className="text-[#3A3A49]">Reg. Date</span>,
      dataIndex: 'created_at',
      key: 'regDate',
      render: (text: string) => formatDate(text),
    },
    {
      title: <span className="text-[#3A3A49]">Gender</span>,
      dataIndex: 'gender_id',
      key: 'gender',
      render: (genderId: number) => getGenderName(genderId),
    },
    {
      title: <span className="text-[#3A3A49]">Phone Number </span>,
      dataIndex: 'phone',
      key: 'phoneNumber',
      render: (text: string) => text || 'N/A',
    },
    {
      title: <span className="text-[#3A3A49]">Next Appointment</span>,
      dataIndex: 'last_visited',
      key: 'lastAppointment',
      render: (text: string) => formatDate(text) || 'N/A',
    },
    // {
    //   title: <span className="text-[#3A3A49]">Next Visit</span>,
    //   dataIndex: 'last_visited',
    //   key: 'lastVisit',
    //   render: (text: string) => formatDate(text) || 'N/A',
    // },
    {
      title: <span className="text-[#3A3A49]">Schedule </span>,
      dataIndex: 'next_scheduled_date',
      key: 'nextAppointment',
      render: (text: string, record: any) =>
        getAppointmentMessage(text, record),
    },
    // {
    //   title: <span className="text-[#3A3A49]">Actions </span>,
    //   key: 'actions',
    //   render: () => (
    //     <Icon
    //       icon="mdi:eye-outline"
    //       width="20"
    //       height="20"
    //       className="text-[#0061FF] cursor-pointer"
    //       onClick={() => setIsOpen(true)}
    //     />
    //   ),
    // },
  ]

  const filteredColumns = columns.filter((column) => {
    if (
      column.key === 'nextAppointment' &&
      (role?.toLowerCase().includes('nurse') ||
        role?.toLowerCase().includes('doctor') ||
        role?.toLowerCase().includes('accountant'))
    ) {
      return false
    }
    return true
  })

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
        columns={filteredColumns}
        dataSource={patientData?.response?.data || []}
        pagination={false}
        loading={isPatientLoading || isGenderLoading}
        rowKey="patientID"
      />

      <footer className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#3A3A49]">
            {patientData?.response?.data?.length}{' '}
          </span>
          <span className="text-[#3A3A49]">Shown on page</span>
        </div>
        <Pagination
          current={patientData?.response?.current_page || 1}
          total={patientData?.response?.total || 0}
          pageSize={perPage}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </footer>

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

      <AntdModal
        visible={isScheduleModalOpen}
        onCancel={() => setIsScheduleModalOpen(false)}
        footer={null}
        centered
      >
        <ScheduleModal
          patientId={selectedPatientData?.id}
          selectedPatientData={selectedPatientData}
          onClose={() => setIsScheduleModalOpen(false)}
        />
      </AntdModal>
    </Layout>
  )
}

export default Patients
