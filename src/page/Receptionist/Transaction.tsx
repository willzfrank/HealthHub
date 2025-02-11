import React, { useState } from 'react'
import { Table, Pagination, Dropdown } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'

interface TransactionItem {
  key: string
  invoiceID: string
  transactionDate: string
  invoiceDate: string
  patientName: string
  procedure: string
  amount: string
  channel: string
}

const Transaction = () => {
  const [data, setData] = useState<TransactionItem[]>([
    {
      key: '1',
      invoiceID: 'INV001',
      transactionDate: '2023-10-01 10:00 AM',
      invoiceDate: '2023-10-01',
      patientName: 'John Doe',
      procedure: 'Check-up',
      amount: '$200',
      channel: 'Online',
    },
    {
      key: '2',
      invoiceID: 'INV002',
      transactionDate: '2023-10-02 11:00 AM',
      invoiceDate: '2023-10-02',
      patientName: 'Jane Roe',
      procedure: 'Consultation',
      amount: '$150',
      channel: 'In-Person',
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
      title: 'Trnx Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceID',
      key: 'invoiceID',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: 'Procedure',
      dataIndex: 'procedure',
      key: 'procedure',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: 'Actions',
      key: 'actions',
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
      <HeaderSection title="Transactions" />

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

      <Modal
        isOpen={isModalVisible}
        onClose={handleCancel}
        title="Health Information"
        centerTitle
      >
        <DoctorPatientViewFormModal />
      </Modal>
    </Layout>
  )
}

export default Transaction
