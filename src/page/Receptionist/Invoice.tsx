import React, { useState } from 'react'
import { Table, Pagination, Button, Modal as AntdModal } from 'antd'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import DoctorPatientViewFormModal from '../../component/ModalComponent/DoctorPatientViewFormModal'
import Modal from '../../component/common/Modal'
import InvoiceDetailsModal from '../../component/ModalComponent/InvoiceDetailsModal'
import BillFormModal from '../../component/ModalComponent/BillFormModal'
import { getAuthCookie } from '../../api/axiosInstance'
import ScheduleModal from '../../component/ModalComponent/ScheduleModal'
import useInvoices from '../../api/hooks/useInvoices'
import type { IInvoice } from '../../types/types'
import useFetchPaymentStatuses from '../../api/hooks/useFetchPaymentStatuses'

const Invoice = () => {
  const [currentPage, setCurrentPage] = useState(1) // State to manage current page
  const { data: invoiceData, isLoading } = useInvoices(currentPage) // Pass currentPage to useInvoices
  const { data: paymentStatuses, isLoading: isPaymentStatusesLoading } =
    useFetchPaymentStatuses()

  console.log('invoiceData', invoiceData?.data)

  // Transform API response to match table data structure
  const transformedData: IInvoice[] =
    invoiceData?.data?.response?.data?.map((invoice: IInvoice) => {
      // Find the matching payment status by ID
      const matchedStatus = paymentStatuses?.find(
        (status: { id: number }) => status.id === invoice.payment_status
      )?.name

      return {
        key: invoice.id.toString(),
        patient_id: invoice.patient_id,
        invoiceID: invoice.invoice_number,
        invoiceDate: invoice.invoice_date,
        patientName: invoice.patient_name,
        procedure: invoice.description,
        amount: `₦${invoice.total.toLocaleString()}`,
        status: matchedStatus || 'Unknown',
        payment_status: invoice.payment_status,
        paymentUrl: invoice.payment_url,
      }
    }) || []

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoiceID, setSelectedInvoiceID] = useState<number | null>(
    null
  )
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const handleCancel = () => setIsModalVisible(false)

  const handleViewDetails = (invoiceID: number, key: string) => {
    setSelectedInvoiceID(invoiceID)
    setSelectedKey(key)
    setIsModalOpen(true)
  }

  const onSelectChange = (keys: React.Key[]) => setSelectedRowKeys(keys)

  // Get status name from ID
  const getStatus = (statusId: number): string => {
    if (!paymentStatuses) return 'Unknown'

    const status = paymentStatuses.find(
      (status: { id: number }) => status.id === statusId
    )

    return status ? status.name : 'Unknown'
  }

  // Get CSS class based on status name
  const getStatusClass = (status: string) => {
    const statusColors: Record<string, string> = {
      'Awaiting Payment': 'bg-red-100 text-red-600',
      Paid: 'bg-green-100 text-green-600',
      Partial: 'bg-yellow-100 text-yellow-600',
    }
    return statusColors[status] || 'bg-gray-100 text-gray-600'
  }

  // Handle pagination change
  const handlePaginationChange = (page: number) => {
    setCurrentPage(page) // Update current page state
  }

  return (
    <Layout>
      <HeaderSection title="Invoice" />
      <Table
        columns={[
          { title: 'InvoiceID', dataIndex: 'invoiceID', key: 'invoiceID' },
          {
            title: 'InvoiceDate',
            dataIndex: 'invoiceDate',
            key: 'invoiceDate',
          },
          {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
          },
          { title: 'Procedure', dataIndex: 'procedure', key: 'procedure' },
          { title: 'Amount', dataIndex: 'amount', key: 'amount' },
          {
            title: 'Status',
            key: 'status',
            render: (_text, record: any) => {
              // Use the payment_status ID to get the status name
              const statusName = getStatus(record.payment_status)

              return (
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                    statusName
                  )}`}
                >
                  {statusName}
                </span>
              )
            },
          },
          {
            title: 'Action',
            key: 'action',
            render: (_text, record: any) => {
              const statusName = getStatus(record.payment_status)

              return (
                <div className="flex gap-2">
                  {statusName === 'Awaiting Payment' ||
                  statusName === 'Partial' ? (
                    <Button
                      className="rounded-full bg-[#0061FFA1] text-white"
                      onClick={() =>
                        handleViewDetails(record.invoiceID, record.key)
                      }
                    >
                      Pay
                    </Button>
                  ) : (
                    <Button
                      className="rounded-full border border-[#0061FFA1] text-[#0061FFA]"
                      onClick={() =>
                        handleViewDetails(record.invoiceID, record.key)
                      }
                    >
                      View
                    </Button>
                  )}
                </div>
              )
            },
          },
        ]}
        dataSource={transformedData}
        loading={isLoading || isPaymentStatusesLoading}
        pagination={false}
      />

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="border-[#0061FF] border-b text-[#69686A]">
            {transformedData.length}{' '}
          </span>
          <span className="text-[#69686A]"> Shown on page</span>
        </div>
        <Pagination
          current={currentPage}
          defaultCurrent={1}
          total={invoiceData?.data?.response?.total || 1}
          onChange={handlePaginationChange}
        />
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
        title={`Transaction Details - ${selectedInvoiceID}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="max"
        className="w-max"
      >
        <InvoiceDetailsModal
          selectedInvoiceID={selectedInvoiceID}
          onClose={() => setIsModalOpen(false)}
          selectedKey={selectedKey}
        />
      </AntdModal>
    </Layout>
  )
}

export default Invoice
