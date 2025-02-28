import React, { useState } from 'react'
import { Table, Modal as AntdModal } from 'antd'
import { Icon } from '@iconify/react'
// import '../../../styles/AppointmentTable.css'
import InvoiceDetailsModal from '../../ModalComponent/InvoiceDetailsModal'
import { ITransaction } from '../../../types/globaltype'

const TransactionsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null)

  // Sample Transactions Data
  const transactionsData = [
    {
      key: '1',
      invoiceID: 'INV001',
      amount: 'NGN 50,000',
      status: 'Paid',
      date: '01 Dec 2024',
    },
    {
      key: '2',
      invoiceID: 'INV002',
      amount: 'NGN 75,000',
      status: 'Unpaid',
      date: '05 Dec 2024',
    },
    {
      key: '3',
      invoiceID: 'INV003',
      amount: 'NGN 30,000',
      status: 'Pending',
      date: '10 Dec 2024',
    },
  ]

  // Open modal and set transaction data
  const openModal = (record: any) => {
    setSelectedTransaction(record)
    setIsModalOpen(true)
  }

  // Columns definition
  const columns = [
    {
      title: (
        <span style={{ color: '#69686A', fontSize: '12px' }}>Invoice ID</span>
      ),
      dataIndex: 'invoiceID',
      key: 'invoiceID',
    },
    {
      title: <span style={{ color: '#69686A', fontSize: '12px' }}>Amount</span>,
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: <span style={{ color: '#69686A', fontSize: '12px' }}>Status</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`${
            status === 'Paid'
              ? 'text-green-500'
              : status === 'Unpaid'
              ? 'text-red-500'
              : 'text-yellow-500'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: <span style={{ color: '#69686A', fontSize: '12px' }}>Date</span>,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: (
        <span style={{ color: '#69686A', fontSize: '12px' }}>Actions</span>
      ),
      key: 'actions',
      render: (_: any, record: any) => (
        <div
          className="flex items-center text-blue-500 cursor-pointer"
          // onClick={() => openModal(record)}
        >
          <Icon icon="mdi:eye-outline" width="20" height="20" />
          <span className="ml-1">View</span>
        </div>
      ),
    },
  ]

  return (
    <div>
      {/* Transactions Table */}
      <Table
        columns={columns}
        dataSource={transactionsData}
        pagination={false}
        rowClassName={() => 'custom-row-class'}
      />

      {/* Transaction Details Modal */}
      <AntdModal
        title={`Transaction Details - ${selectedTransaction?.invoiceID}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {/* <InvoiceDetailsModal selectedTransaction={selectedTransaction} /> */}
        invocie details modal 
      </AntdModal>
    </div>
  )
}

export default TransactionsTable
