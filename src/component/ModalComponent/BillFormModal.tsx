import { Table, Modal as AntdModal } from 'antd'
import { useState, useEffect } from 'react'
import PayDetailsModal from './PayDetailsModal'
import { useGenerateInvoice } from '../../api/hooks/generateInvoice'
import { IPatientBill } from '../../types/types'
import toast from 'react-hot-toast'

type BillFormModalProps = {
  onClose: (value: React.SetStateAction<boolean>) => void
  patientBillData: any | undefined
  isLoading?: boolean
}

interface BillItem {
  key: string
  service: string
  qty?: number
  amount: number
  addedBy?: string
  id: number
  bill_item_id: number
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

    const billItemIds = selectedRowKeys
      .map((key) => {
        const selectedItem = billItems.find((item) => item.key === key)
        return selectedItem?.id
      })
      .filter((id) => id !== undefined) as number[]

    generateInvoice(
      {
        patientId: patientBillData?.response?.patient?.id.toString() ?? '',
        bill_items: billItemIds,
      },
      {
        onSuccess: (data) => {
          if (data?.status) {
            setInvoiceDetails(data.response)
            toast.success('Invoice Generated')
            setIsModalOpen(true)
            onClose(false)
          } else {
            console.error('Invoice Generation Failed:', data.message)
            toast.error(data.message)
          }
        },
        onError: (error) => {
          console.error('Error generating invoice:', error.message)
          toast.error(error.message)
        },
      }
    )
  }

  useEffect(() => {
    if (patientBillData?.status && patientBillData.response) {
      const transformedBills: any[] = patientBillData.response.items.map(
        (item: any) => {
          console.log('item', item)
          return {
            key: item.id.toString(),
            id: item.id,
            bill_item_id: item.bill_item_id,
            service: item.bill_item.name,
            qty: item?.quantity,
            amount: item.bill_item.selling_price,
            // addedBy: item.added_by,
          }
        }
      )

      setBillItems(transformedBills)

      // Calculate initial total from all items
      const initialTotal = transformedBills.reduce(
        (sum, item) => sum + item.amount * (item.qty ?? 1),
        0
      )
      setTotalAmount(initialTotal)
    } else {
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
      render: (amount: number) => `$${amount?.toFixed(2)}`,
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
          Total = ₦{totalAmount.toFixed(2)}
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
          {isGenerating ? 'Processing...' : 'Proceed'}
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
