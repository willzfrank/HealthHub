import { Icon } from '@iconify/react'
import { Table } from 'antd'
import useGetInvoiceDetails from '../../api/hooks/useGetInvoiceData'
import usePayInvoice from '../../api/hooks/usePayInvoice'
import { formatDate } from '../../utils/utils'
import usePaymentStatus from '../../hooks/usePaymentStatus'
import useSettleInvoice from '../../api/hooks/useSettleInvoice'
import { useState } from 'react'
import PaymentMethodModal from './PaymentMethodModal'
import useInvoices from '../../api/hooks/useInvoices'

type InvoiceDetailsModalProps = {
  selectedInvoiceID: number | null
  selectedKey: string | null
  onClose: () => void
}

const InvoiceDetailsModal = ({
  selectedInvoiceID,
  onClose,
  selectedKey,
}: InvoiceDetailsModalProps) => {
  const [posReceiptNo, setPosReceiptNo] = useState('')

  const {
    data: invoiceData,
    isLoading,
    error,
  } = useGetInvoiceDetails(selectedInvoiceID?.toString() ?? '')
  const payInvoice = usePayInvoice()
  const { getStatus, isLoading: isPaymentStatusesLoading } = usePaymentStatus()
  const { settleInvoice } = useSettleInvoice()
  const [isPaymentMethodModalVisible, setPaymentMethodModalVisible] =
    useState(false)
  const { refetch: refetchInvoices } = useInvoices(1)

  // Modal table columns
  const modalTableColumns = [
    {
      title: 'Serial No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Service',
      dataIndex: 'bill_item',
      key: 'bill_item',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₦${amount?.toLocaleString()}`,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amount_paid',
      key: 'amount_paid',
      render: (amount: number) => `₦${amount?.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (status: number) =>
        isPaymentStatusesLoading ? (
          'Loading...'
        ) : (
          <span>{getStatus(status)}</span>
        ),
    },
  ]

  const handlePay = async () => {
    setPaymentMethodModalVisible(true)
  }

  const handleSelectPaymentMethod = async (
    method: 'POS' | 'CASH' | 'Online Payment',
    posReceiptNo?: string,
    posType?: 'internal' | 'external' // New posType parameter
  ) => {
    setPaymentMethodModalVisible(false)

    if (!selectedInvoiceID || !currentInvoice || !currentInvoice.items) return

    const itemsPayload = currentInvoice.items.map((item: any) => ({
      item_id: item.bill_id.toString(),
      amount: item.amount.toString(),
    }))

    const paymentData = {
      patient_id: currentInvoice.patient_id.toString(),
      invoice_id: selectedKey ?? '',
      items: itemsPayload,
    }

    const settleInvoicePayload = {
      invoice_number: currentInvoice.invoice_number || '',
      amount_paid: currentInvoice.total || '0',
      payment_method: method, // 'POS', 'Cash', or 'Online Payment'
      transaction_id: posReceiptNo || `CASH-${Date.now()}`, // Auto-generated for Cash
      channel: 'monnify',
      pos_type:
        method === 'POS' ? posType : method === 'CASH' ? 'internal' : undefined,
    }

    try {
      if (method === 'Online Payment') {
        await payInvoice.mutateAsync(paymentData)
      } else {
        await settleInvoice(settleInvoicePayload)
      }
      await refetchInvoices()
      onClose()
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  const currentInvoice = invoiceData?.response || {}
  const modalTableData = currentInvoice.items
    ? currentInvoice.items.map((item: any, index: number) => ({
        key: index + 1,
        bill_item: item.bill_item,
        quantity: item.quantity,
        amount: item.amount,
        amount_paid: item.total,
        payment_status: item.payment_status,
      }))
    : []

  return (
    <div>
      <div>
        <div className="flex items-start justify-between gap-2">
          <img src="/images/shalom-logo.svg" alt="logo" />
          <span>Invoice ID: {selectedInvoiceID}</span>
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
              Invoice Date:{' '}
              {currentInvoice.created_at
                ? formatDate(currentInvoice.created_at)
                : 'N/A'}
            </span>
            {/* <span className="text-[#404040] text-[14px]">
              Invoice Number: {currentInvoice.invoice_number || 'N/A'}
            </span> */}
            {/* <span className="text-[#404040] text-[14px]">
              Year: {currentInvoice.year || 'N/A'}
            </span> */}
          </div>

          {/* Invoice To - Dynamically Rendered */}
          {currentInvoice.patient_name ? (
            <div className="flex flex-col items-end">
              <span className="text-[#404040] text-[14px]">Invoice To:</span>
              <span className="text-[#404040] font-bold text-[16px]">
                {currentInvoice.patient_name} - {currentInvoice.file_number}
              </span>
              <span className="text-[#404040] text-[14px] mt-1.5">
                Patient ID: {currentInvoice.patient_id}
              </span>
              <span className="text-[#404040] text-[14px]">
                Phone: {currentInvoice.phone || 'N/A'}
              </span>
              {/* <span className="text-[#404040] text-[14px]">
                Email: {currentInvoice.email || 'N/A'}
              </span> */}
            </div>
          ) : (
            <p className="text-gray-500">Loading patient details...</p>
          )}
        </div>

        {/* Table */}
        {isLoading ? (
          <p className="text-gray-500">Loading invoice details...</p>
        ) : error ? (
          <p className="text-red-500">Failed to fetch invoice details</p>
        ) : modalTableData.length > 0 ? (
          <Table
            columns={modalTableColumns}
            dataSource={modalTableData}
            pagination={false}
            className="mt-4"
          />
        ) : (
          <p className="text-gray-500 mt-3">No invoice details available.</p>
        )}

        {/* Invoice Total */}
        <div className="flex my-2.5 items-center justify-end">
          <span className="font-bold text-black text-[14px]">
            Total = ₦
            {currentInvoice.total
              ? currentInvoice?.total?.toLocaleString()
              : '0'}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex my-2.5 items-center justify-between">
          <button
            className="border border-[#4880FF] rounded text-[#4880FF] px-5 py-1"
            onClick={onClose}
          >
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

            {getStatus(currentInvoice.payment_status) !== 'Paid' && (
              <button
                className="border border-[#4880FF] rounded text-[#4880FF] px-5 py-1 flex items-center"
                onClick={handlePay}
                disabled={payInvoice.isLoading || !currentInvoice.id}
              >
                <Icon icon="mingcute:send-fill" width="16" height="16" />
                {payInvoice.isLoading ? 'Processing...' : 'Pay'}
              </button>
            )}
          </div>

          <PaymentMethodModal
            visible={isPaymentMethodModalVisible}
            onCancel={() => setPaymentMethodModalVisible(false)}
            onSelectPaymentMethod={handleSelectPaymentMethod}
            setPosReceiptNo={setPosReceiptNo}
            posReceiptNo={posReceiptNo}
          />
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetailsModal
