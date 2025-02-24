import { Table, Modal as AntdModal } from 'antd'
import { useState, useEffect } from 'react'
import PayDetailsModal from './PayDetailsModal'
import { PatientBillResponse } from '../../api/hooks/useGetPatientBills'
import { useGenerateInvoice } from '../../api/hooks/generateInvoice'

type BillFormModalProps = {
  onClose: (value: React.SetStateAction<boolean>) => void
  patientBillData: PatientBillResponse | undefined
  isLoading?: boolean
}

interface BillItem {
  key: string
  service: string
  qty?: number
  amount: number
  addedBy?: string
  id: number
}

const BillFormModal = ({
  onClose,
  patientBillData,
  isLoading = false,
}: BillFormModalProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [billItems, setBillItems] = useState<BillItem[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [invoiceDetails, setInvoiceDetails] = useState<any>(null)

  const { mutate: generateInvoice, isLoading: isGenerating } =
    useGenerateInvoice()

  const handlePay = () => {
    if (selectedRowKeys.length === 0) return

    const billItemIds = selectedRowKeys.map((key) => Number(key))

    generateInvoice(
      {
        billItemIds,
        patientId: patientBillData?.response?.patient?.id.toString() ?? '',
      },
      {
        onSuccess: (data) => {
          setInvoiceDetails(data?.response.response)
          setIsModalOpen(true)
          onClose(false)
        },
        onError: (error) => {
          console.error('Error generating invoice:', error)
        },
      }
    )
  }

  useEffect(() => {
    if (patientBillData?.status && patientBillData.response) {
      const transformedBills: BillItem[] = patientBillData.response.items.map(
        (item) => ({
          key: item.id.toString(),
          id: item.id,
          service: item.name,
          qty: 1,
          amount: item.selling_price,
          // addedBy: item.added_by,
        })
      )

      setBillItems(transformedBills)
      // Calculate initial total from all items
      const initialTotal = transformedBills.reduce(
        (sum, item) => sum + item.amount * (item.qty ?? 1),
        0
      )
      setTotalAmount(initialTotal)
    } else {
      // Fallback to empty array if no data
      setBillItems([])
      setTotalAmount(0)
    }
  }, [patientBillData])

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)

    // Calculate total of selected items
    if (selectedRowKeys.length > 0) {
      const selectedBills = billItems.filter((item) =>
        selectedRowKeys.includes(item.key)
      )
      const selectedTotal = selectedBills.reduce(
        (sum, item) => sum + item.amount * (item.qty ?? 1),
        0
      )
      setTotalAmount(selectedTotal)
    } else {
      // If nothing selected, show total of all items
      const allTotal = billItems.reduce(
        (sum, item) => sum + item.amount * (item.qty ?? 1),
        0
      )
      setTotalAmount(allTotal)
    }
  }

  // Columns for the table
  const columns = [
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    // {
    //   title: 'Added by',
    //   dataIndex: 'addedBy',
    //   key: 'addedBy',
    // },
  ]

  return (
    <div>
      <h3 className="text-[#030229] text-[26px] font-[600] text-center">
        Bill Items
      </h3>

      {/* Table to display bill items */}
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        dataSource={billItems}
        columns={columns}
        pagination={false}
        className="mt-6"
        loading={isLoading}
      />

      <div className="flex items-end justify-end my-5">
        <span className="text-[21px] text-[#202224] font-[800]">
          Total = ${totalAmount.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-between my-5">
        <button
          className="border border-[#0061FF] text-[#0061FF] rounded px-20 py-2.5"
          onClick={() => onClose(false)}
        >
          CANCEL
        </button>
        <button
          className="text-white bg-[#0061FF] rounded px-20 py-2.5"
          onClick={handlePay}
          disabled={selectedRowKeys.length === 0 || isGenerating}
        >
          {isGenerating ? 'Processing...' : 'PAY'}
        </button>
      </div>

      <AntdModal
        title="Transaction Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <PayDetailsModal invoice={invoiceDetails} />
      </AntdModal>
    </div>
  )
}

export default BillFormModal
