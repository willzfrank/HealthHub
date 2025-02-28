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
  const { data: invoiceData, isLoading } = useInvoices(1)
  const { data: paymentStatuses, isLoading: isPaymentStatusesLoading } =
    useFetchPaymentStatuses()

  // Transform API response to match table data structure
  const transformedData: IInvoice[] =
    invoiceData?.response?.data?.map((invoice: IInvoice) => {
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
        paymentUrl: invoice.payment_url,
      }
    }) || []

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBillModalOpen, setIsBillModalOpen] = useState(false)
  const [selectedPatientID, setSelectedPatientID] = useState<number | null>(
    null
  )
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const handleCancel = () => setIsModalVisible(false)

  const handleViewDetails = (patientID: number) => {
    setSelectedPatientID(patientID)
    setIsModalOpen(true)
  }

  const handleScheduleCancel = () => setIsScheduleModalOpen(false)
  const onSelectChange = (keys: React.Key[]) => setSelectedRowKeys(keys)

  const getStatus = (
    status: number
  ): 'Awaiting Payment' | 'Paid' | 'Partial' => {
    switch (status) {
      case 2:
        return 'Paid'
      case 3:
        return 'Partial'
      default:
        return 'Awaiting Payment'
    }
  }

  const getStatusClass = (status: 'Awaiting Payment' | 'Paid' | 'Partial') => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-600'
      case 'Partial':
        return 'bg-yellow-100 text-yellow-600'
      default:
        return 'bg-red-100 text-red-600'
    }
  }

  return (
    <Layout>
      <HeaderSection title="Invoice" />
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        columns={[
          { title: 'Bill', dataIndex: 'invoiceDate', key: 'invoiceDate' },
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
            render: (_text, item: IInvoice) => (
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                  getStatus(item.payment_status)
                )}`}
              >
                {getStatus(item.payment_status)}
              </span>
            ),
          },
          {
            title: 'Action',
            key: 'action',
            render: (_text, item: IInvoice) => {
              const computedStatus = getStatus(item.payment_status)
              return (
                <div className="flex gap-2">
                  {computedStatus === 'Awaiting Payment' ||
                  computedStatus === 'Partial' ? (
                    <Button
                      className="rounded-full bg-[#0061FFA1] text-white"
                      onClick={() => handleViewDetails(item.patient_id)}
                    >
                      Pay
                    </Button>
                  ) : null}
                </div>
              )
            },
          },
        ]}
        dataSource={transformedData}
        loading={isLoading}
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
          defaultCurrent={invoiceData?.response?.current_page || 1}
          total={invoiceData?.response?.total || 1}
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
        title={`Transaction Details - ${selectedPatientID}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <InvoiceDetailsModal
          selectedPatientID={selectedPatientID}
          onClose={() => setIsModalOpen(false)}
        />
      </AntdModal>

      <AntdModal
        open={isScheduleModalOpen}
        onCancel={handleScheduleCancel}
        footer={null}
        centered
      >
        {/* <ScheduleModal /> */}
        test
      </AntdModal>

      <AntdModal
        open={isBillModalOpen}
        onCancel={() => setIsBillModalOpen(false)}
        footer={null}
      >
        {/* <BillFormModal onClose={() => setIsBillModalOpen(false)} /> */}
      </AntdModal>
    </Layout>
  )
}

export default Invoice
