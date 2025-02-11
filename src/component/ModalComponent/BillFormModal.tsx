import { Table, Modal as AntdModal } from 'antd'
import { useState } from 'react'
import PayDetailsModal from './PayDetailsModal'

type BillFormModalProps = {
  onClose: (value: React.SetStateAction<boolean>) => void
}

interface BillItem {
  key: string
  service: string
  qty: number
  amount: number
  addedBy: string
}

const BillFormModal = ({ onClose }: BillFormModalProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  // Sample data for the table
  const dataSource: BillItem[] = [
    {
      key: '1',
      service: 'Consultation',
      qty: 1,
      amount: 100,
      addedBy: 'Dr. John Doe',
    },
    {
      key: '2',
      service: 'X-Ray',
      qty: 2,
      amount: 150,
      addedBy: 'Dr. Jane Roe',
    },
    {
      key: '3',
      service: 'Blood Test',
      qty: 1,
      amount: 50,
      addedBy: 'Dr. John Doe',
    },
  ]

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
    {
      title: 'Added by',
      dataIndex: 'addedBy',
      key: 'addedBy',
    },
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
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        className="mt-6"
      />

      <div className="flex items-end justify-end my-5">
        <span className="text-[21px] text-[#202224] font-[800]">Total = 0</span>
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
          onClick={() => setIsModalOpen(true)}
        >
          PAY
        </button>
      </div>

      <AntdModal
        title="Transaction Details"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <PayDetailsModal selectedTransaction={123} />{' '}
      </AntdModal>
    </div>
  )
}

export default BillFormModal
