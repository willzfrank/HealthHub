import { Table } from 'antd'



const PayDetailsModal = ({ invoice }: any) => {
  if (!invoice) return <p>Loading...</p>

  console.log('Invoice Data:', invoice)

  // Extract values dynamically based on available properties
  const invoiceNumber = invoice.invoice_number || invoice.invoiceID || 'N/A'
  const invoiceDate = invoice.created_at || invoice.invoiceDate || 'N/A'
  const patientName = invoice.patientName || invoice.email || 'N/A'
  const procedure = invoice.description || invoice.procedure || 'N/A'
  const totalAmount = invoice.total || invoice.amount || 0

  return (
    <div>
      <div className="flex justify-between">
        <img src="/images/shalom-logo.svg" alt="logo" />
        <span>Invoice ID: {invoiceNumber}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Invoice From */}
        <div>
          <p className="text-gray-600">Invoice From:</p>
          <p className="font-bold">Shalom Dental Clinic</p>
          <p className="text-gray-500">Salem House, State House</p>
          <p className="text-gray-600 mt-1.5">Invoice Date: {invoiceDate}</p>
        </div>

        {/* Invoice To */}
        <div>
          <p className="text-gray-600">Invoice To:</p>
          <p className="font-bold">{patientName}</p>
          {invoice.phone && <p className="text-gray-500">{invoice.phone}</p>}
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
            service: procedure,
            amount: `₦${totalAmount.toFixed(2)}`,
          },
        ]}
        pagination={false}
      />

      <div className="flex justify-end mt-4">
        <span className="font-bold">Total = ₦{totalAmount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mt-4">
        <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded">
          Close
        </button>
        {/* Uncomment to enable payment button */}
        {/* <button className="bg-blue-500 text-white px-5 py-2 rounded flex items-center gap-2">
          Pay
          <Icon icon="mingcute:send-fill" width="16" height="16" />
        </button> */}
      </div>
    </div>
  )
}

export default PayDetailsModal
