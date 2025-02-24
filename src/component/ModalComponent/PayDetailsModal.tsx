import { Icon } from '@iconify/react'
import { Table } from 'antd'

type PayDetailsModalProps = {
  invoice: {
    invoice_number: string
    email: string
    phone: string
    description: string
    amount_due: number
    total: number
    patient_id: number
    created_at: string
  } | null
}

const PayDetailsModal = ({ invoice }: PayDetailsModalProps) => {
  if (!invoice) return <p>Loading...</p>

  console.log('invoice', invoice)

  return (
    <div>
      <div className="flex justify-between">
        <img src="/images/shalom-logo.svg" alt="logo" />
        <span>Invoice ID: {invoice.invoice_number}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Invoice From */}
        <div>
          <p className="text-gray-600">Invoice From:</p>
          <p className="font-bold">Shalom Dental Clinic</p>
          <p className="text-gray-500">Salem House, State House</p>
          <p className="text-gray-600 mt-1.5">
            Invoice Date: {invoice.created_at}
          </p>
        </div>

        {/* Invoice To */}
        <div>
          <p className="text-gray-600">Invoice To:</p>
          <p className="font-bold">{invoice.email}</p>
          <p className="text-gray-500">{invoice.phone}</p>
          <p className="text-gray-600 mt-1.5">Due Date: TBA</p>
        </div>
      </div>

      {/* Table for Transaction */}
      <Table
        columns={[
          { title: 'Description', dataIndex: 'service', key: 'service' },
          { title: 'Transaction Amount', dataIndex: 'amount', key: 'amount' },
        ]}
        dataSource={[
          {
            key: '1',
            service: invoice.description,
            amount: `₦${invoice.total}`,
          },
        ]}
        pagination={false}
      />

      <div className="flex justify-end mt-4">
        <span className="font-bold">Total = ₦{invoice.total}</span>
      </div>

      <div className="flex justify-between mt-4">
        <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded">
          Close
        </button>
        <button className="bg-blue-500 text-white px-5 py-2 rounded flex items-center gap-2">
          Pay
          <Icon icon="mingcute:send-fill" width="16" height="16" />
        </button>
      </div>
    </div>
  )
}

export default PayDetailsModal
