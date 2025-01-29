import React, { useState } from 'react'
import { Table, Pagination, Button } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'

interface InvoiceItem {
  key: string
  invoiceID: string
  invoiceDate: string
  patientName: string
  procedure: string
  amount: string
  status: 'Paid' | 'Unpaid' | 'Pending'
}

const Invoice = () => {
  const [data, setData] = useState<InvoiceItem[]>([
    {
      key: '1',
      invoiceID: 'INV001',
      invoiceDate: '2023-10-01',
      patientName: 'John Doe',
      procedure: 'Check-up',
      amount: '$200',
      status: 'Paid',
    },
    {
      key: '2',
      invoiceID: 'INV002',
      invoiceDate: '2023-10-02',
      patientName: 'Jane Roe',
      procedure: 'Consultation',
      amount: '$150',
      status: 'Pending',
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
      title: 'Status',
      key: 'status',
      render: (_text: any, item: InvoiceItem) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            item.status === 'Paid'
              ? 'bg-green-100 text-green-600'
              : item.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: any, item: InvoiceItem) => (
        <div className="flex gap-2">
          {item.status === 'Pending' ? (
            <Button className="rounded-full bg-[#0061FFA1] text-white">Pay</Button>
          ) : (
            <Button className="rounded-full border border-[#0061FFA1] text-[#0061FFA1]">
              View
            </Button>
          )}
        </div>
      ),
    },
    {
      title: 'Modify',
      key: 'modify',
      render: (_text: any) => (
        <Icon
          icon="mdi:dots-vertical"
          width="20"
          height="20"
          className="cursor-pointer"
        />
      ),
    },
  ]

  return (
    <Layout>
      <HeaderSection title="Invoice" />

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

export default Invoice
