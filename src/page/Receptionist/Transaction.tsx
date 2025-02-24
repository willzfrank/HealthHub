import React, { useState } from 'react'
import { Table, Pagination, Spin, message } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'
import useInvoices from '../../api/hooks/useInvoices'
import { IInvoice } from '../../types/types'

const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: invoiceData, isLoading, error } = useInvoices(currentPage)

  if (error) {
    message.error('Failed to load invoices.')
  }

  const invoices = invoiceData?.data || []
  const totalInvoices = invoiceData?.total || 0

  const columns = [
    {
      title: 'Trnx Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceID',
      key: 'invoiceID',
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
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IInvoice) => (
        <Icon
          icon="mdi:eye"
          width="20"
          height="20"
          onClick={() => showModal(record)}
          className="cursor-pointer text-[#0061FF]"
        />
      ),
    },
  ]

  const dataSource = invoices.map((invoice: IInvoice) => ({
    key: invoice.id,
    invoiceID: invoice.invoice_number,
    invoiceDate: new Date(invoice.invoice_date).toLocaleDateString(),
    patientName: invoice.patient_name,
    procedure: invoice.description,
    amount: invoice.total,
  }))

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const showModal = (invoice: any) => {
    setSelectedInvoice(invoice)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Layout>
      <HeaderSection title="Transactions" />
      {isLoading ? (
        <div className="flex justify-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            locale={{ emptyText: 'No transactions found' }}
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-[#69686A]">
              {invoices.length} shown on page
            </span>
            <Pagination
              current={currentPage}
              total={totalInvoices}
              pageSize={10}
              onChange={setCurrentPage}
            />
          </div>

          {/* <Modal
            isOpen={isModalVisible}
            onClose={handleCancel}
            title="Invoice Details"
          >
            <DoctorPatientViewFormModal invoice={selectedInvoice} />
          </Modal> */}
        </>
      )}
    </Layout>
  )
}

export default Transaction
