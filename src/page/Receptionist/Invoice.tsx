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
  const { data: invoiceData, isLoading } = useInvoices(1)

  // Transform API response to match table data structure
  const transformedData: InvoiceItem[] =
    invoiceData?.response?.data?.map((invoice: IInvoice) => ({
      key: invoice.id.toString(),
      invoiceID: invoice.invoice_number,
      invoiceDate: invoice.invoice_date,
      patientName: invoice.patient_name,
      procedure: invoice.description,
      amount: `₦${invoice.total.toLocaleString()}`,
      status:
        invoice.payment_status === 1
          ? 'Paid'
          : invoice.amount_due > 0
          ? 'Pending'
          : 'Unpaid',
    })) || []

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBillModalOpen, setIsBillModalOpen] = useState(false)
  const [selectedTransactionID, setSelectedTransactionID] = useState<
    string | null
  >(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const authState = getAuthCookie()
  const role = authState?.role?.name

  const handleCancel = () => setIsModalVisible(false)
  const handlePayClick = (invoice: InvoiceItem) => {
    setSelectedTransactionID(invoice.invoiceID)
    setIsModalOpen(true)
  }
  const handleViewClick = () => setIsBillModalOpen(true)
  const handleScheduleClick = () => setIsScheduleModalOpen(true)
  const handleScheduleCancel = () => setIsScheduleModalOpen(false)
  const onSelectChange = (keys: React.Key[]) => setSelectedRowKeys(keys)

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
            render: (_text, item: InvoiceItem) => (
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
            render: (_text, item: InvoiceItem) => (
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
                    Pay
                  </Button>
                )}
              </div>
            ),
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
        title={`Transaction Details - ${selectedTransactionID}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <InvoiceDetailsModal selectedTransaction={selectedTransactionID} />
      </AntdModal>

      <AntdModal
        visible={isScheduleModalOpen}
        onCancel={handleScheduleCancel}
        footer={null}
        centered
      >
        {/* <ScheduleModal /> */}
        test
      </AntdModal>

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
