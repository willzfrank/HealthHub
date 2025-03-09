import React, { useState } from 'react'
import { Table, Pagination, Spin, message, Modal } from 'antd'
import { Icon } from '@iconify/react'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import useInvoices from '../../api/hooks/useInvoices'
import { IInvoice } from '../../types/types'
import PatientInformationModal from '../../component/ModalComponent/PatientInformationModal'
import PayDetailsModal from '../../component/ModalComponent/PayDetailsModal'

const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Details')
  const { data: invoiceData, isLoading, error } = useInvoices(currentPage)

  if (error) {
    message.error('Failed to load invoices.')
  }

  const invoices = invoiceData?.response?.data || []
  const totalInvoices = invoiceData?.response?.total || 0

  const filteredInvoices = invoices.filter(
    (invoice: IInvoice) => invoice.payment_status === 3
  )

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

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
      render: (amount: number) => `₦${amount.toFixed(2)}`,
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

  const dataSource = filteredInvoices.map((invoice: IInvoice) => ({
    key: invoice.id,
    invoiceID: invoice.invoice_number,
    invoiceDate: new Date(invoice.invoice_date).toLocaleDateString(),
    patientName: invoice.patient_name,
    procedure: invoice.description,
    amount: invoice.total,
  }))

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null)

  const showModal = (invoice: IInvoice) => {
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
              {filteredInvoices.length} shown on page
            </span>
            <Pagination
              current={currentPage}
              total={totalInvoices}
              pageSize={10}
              onChange={setCurrentPage}
            />
          </div>

          <Modal
            title="Transaction Details"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <PayDetailsModal
              invoice={selectedInvoice}
              onClose={() => setIsModalVisible(false)}
            />
          </Modal>
        </>
      )}
    </Layout>
  )
}

export default Transaction
