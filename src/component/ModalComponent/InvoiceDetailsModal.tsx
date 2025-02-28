import { Icon } from '@iconify/react'
import { Table } from 'antd'
import useGetPatientInvoices from '../../api/hooks/useGetPatientInvoice'
import usePayInvoice from '../../api/hooks/usePayInvoice'

type InvoiceDetailsModalProps = {
  selectedPatientID: number | null
  onClose: () => void
}

// Modal table columns
const modalTableColumns = [
  {
    title: 'Serial No',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Service',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Amount',
    dataIndex: 'total_amount',
    key: 'total_amount',
    render: (amount: number) => `₦${amount.toLocaleString()}`,
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    render: (balance: number) => `₦${balance.toLocaleString()}`,
  },
  {
    title: 'Status',
    dataIndex: 'payment_status',
    key: 'payment_status',
    render: (status: number) => {
      switch (status) {
        case 1:
          return <span className="text-red-500">Awaiting Payment</span>
        case 2:
          return <span className="text-green-500">Paid</span>
        case 3:
          return <span className="text-yellow-500">Partial</span>
        default:
          return null
      }
    },
  },
]

const InvoiceDetailsModal = ({
  selectedPatientID,
  onClose,
}: InvoiceDetailsModalProps) => {
  const { data, isLoading, error } = useGetPatientInvoices(selectedPatientID)
  const payInvoice = usePayInvoice()

  // Extract patient details and invoices
  const patientDetails = data?.patient_details
  const invoices = data?.invoices || []

  const handlePay = async () => {
    if (!selectedPatientID || invoices.length === 0) return

    const paymentData = {
      patient_id: selectedPatientID,
      invoice_id: invoices[0].id,
      items: invoices.map((invoice: any) => ({
        item_id: invoice.id,
        amount: invoice.total_amount,
      })),
    }

    try {
      await payInvoice.mutateAsync(paymentData)
      onClose()
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  // Transform invoices for AntD Table
  const modalTableData = invoices.map((invoice: any, index: number) => ({
    key: index + 1,
    description: invoice.description,
    total_amount: invoice.total_amount,
    balance: invoice.balance,
    payment_status: invoice.payment_status,
  }))

  return (
    <div>
      <div>
        <div className="flex items-start justify-between gap-2">
          <img src="/images/shalom-logo.svg" alt="logo" />
          <span>Patient ID: {selectedPatientID}</span>
        </div>

        <div className="flex items-start justify-between">
          {/* Invoice From */}
          <div className="flex flex-col items-start">
            <span className="text-[#404040] text-[14px]">Invoice From:</span>
            <span className="text-[#404040] font-bold text-[16px]">
              Shalom Dental Clinic
            </span>
            <span className="text-[#565656] text-[14px]">
              Salem House, State House.
            </span>
            <span className="text-[#404040] text-[14px] mt-1.5">
              Invoice Date : 12 Nov 2019
            </span>
          </div>

          {/* Invoice To - Dynamically Rendered */}
          {patientDetails ? (
            <div className="flex flex-col items-end">
              <span className="text-[#404040] text-[14px]">Invoice To:</span>
              <span className="text-[#404040] font-bold text-[16px]">
                {patientDetails.name} - {patientDetails.file_number}
              </span>
              <span className="text-[#565656] text-[14px]">
                {patientDetails.address}
              </span>
              <span className="text-[#404040] text-[14px] mt-1.5">
                Age: {patientDetails.age}
              </span>
              <span className="text-[#404040] text-[14px]">
                Gender: {patientDetails.gender}
              </span>
              <span className="text-[#404040] text-[14px]">
                Phone: {patientDetails.phone}
              </span>
            </div>
          ) : (
            <p className="text-gray-500">Loading patient details...</p>
          )}
        </div>

        {/* Table */}
        {isLoading ? (
          <p className="text-gray-500">Loading invoices...</p>
        ) : error ? (
          <p className="text-red-500">Failed to fetch invoices</p>
        ) : invoices.length > 0 ? (
          <Table
            columns={modalTableColumns}
            dataSource={modalTableData}
            pagination={false}
          />
        ) : (
          <p className="text-gray-500 mt-3">
            No invoices available for this patient.
          </p>
        )}

        {/* Invoice Total */}
        <div className="flex my-2.5 items-center justify-end">
          <span className="font-bold text-black text-[14px]">
            Total = ₦
            {invoices
              .reduce(
                (acc: any, curr: { total_amount: any }) =>
                  acc + curr.total_amount,
                0
              )
              .toLocaleString()}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex my-2.5 items-center justify-between">
          <button className="border border-[#4880FF] rounded text-[#4880FF] px-5 py-1">
            Close
          </button>

          <div className="flex items-center gap-2">
            <button className="border-[0.5px] border-[#D5D5D5] rounded text-black px-2.5 py-1.5 flex items-center gap-2">
              <Icon
                icon="material-symbols:print-rounded"
                width="14"
                height="14"
                className="text-black"
              />
              <span className="text-black text-[14px]">Export</span>
              <Icon icon="bi:three-dots-vertical" width="16" height="16" />
            </button>

            <div className="flex my-2.5 items-center justify-between">
              <button
                className="border border-[#4880FF] rounded text-[#4880FF] px-5 py-1"
                onClick={handlePay}
                disabled={payInvoice.isLoading}
              >
                {payInvoice.isLoading ? 'Processing...' : 'Pay'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetailsModal
