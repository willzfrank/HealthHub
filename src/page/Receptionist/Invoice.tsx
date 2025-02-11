import React, { useState } from 'react'
import {
  Table,
  Pagination,
  Button,
  Modal as AntdModal,
  Dropdown,
  Menu,
} from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'
import InvoiceDetailsModal from '../../component/ModalComponent/InvoiceDetailsModal'
import BillFormModal from '../../component/ModalComponent/BillFormModal'
import { getAuthCookie } from '../../api/axiosInstance'
import ScheduleModal from '../../component/ModalComponent/ScheduleModal'

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

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBillModalOpen, setIsBillModalOpen] = useState(false)
  const [selectedTransactionID, setSelectedTransactionID] = useState<
    string | null
  >(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false) // New state

  const authState = getAuthCookie()
  const role = authState?.role?.name

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handlePayClick = (invoice: InvoiceItem) => {
    setSelectedTransactionID(invoice.invoiceID) // Only pass the invoiceID as the transaction
    setIsModalOpen(true)
  }

  const handleViewClick = () => {
    setIsBillModalOpen(true) // Open the BillFormModal
  }

  const handleEdit = (invoiceID: string) => {
    console.log('Edit invoice:', invoiceID)
    // Add your edit logic here
  }

  const handleDelete = (invoiceID: string) => {
    console.log('Delete invoice:', invoiceID)
    // Add your delete logic here
  }

  const handleScheduleClick = () => {
    setIsScheduleModalOpen(true) // Open Schedule Modal
  }

  const handleScheduleCancel = () => {
    setIsScheduleModalOpen(false) // Close Schedule Modal
  }

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const columns = [
    {
      title: 'Bill',
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
          {role === 'RECEPTIONIST FACILITY' ? (
            item.status === 'Pending' ? (
              <Button
                className="rounded-full border border-[#0061FFA1] text-[#0061FFA1]"
                onClick={handleScheduleClick}
              >
                Schedule
              </Button>
            ) : (
              <Button
                className="rounded-full border border-[#0061FFA1] text-[#0061FFA1]"
                disabled
              >
                Schedule
              </Button>
            )
          ) : item.status === 'Pending' ? (
            <Button
              className="rounded-full border border-[#0061FFA1] text-[#0061FFA1]"
              onClick={handleViewClick}
            >
              Schedule
            </Button>
          ) : (
            <Button
              className="rounded-full bg-[#0061FFA1] text-white"
              onClick={() => handlePayClick(item)}
            >
              Schedule
            </Button>
          )}
        </div>
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

      <AntdModal
        title={`Transaction Details - ${selectedTransactionID}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <InvoiceDetailsModal selectedTransaction={selectedTransactionID} />{' '}
      </AntdModal>

      <AntdModal
        visible={isScheduleModalOpen}
        onCancel={handleScheduleCancel}
        footer={null}
        centered
      >
        <ScheduleModal />
      </AntdModal>

      {/* BillFormModal */}
      <AntdModal
        visible={isBillModalOpen}
        onCancel={() => setIsBillModalOpen(false)}
        footer={null}
      >
        <BillFormModal onClose={() => setIsBillModalOpen(false)} />
      </AntdModal>
    </Layout>
  )
}

export default Invoice
