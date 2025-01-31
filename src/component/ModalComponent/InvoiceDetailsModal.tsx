import { Icon } from '@iconify/react'
import { Table } from 'antd'
import React from 'react'
import { ITransaction } from '../../types/globaltype'

type InvoiceDetailsModalProps = {
  selectedTransaction: any
}

// Sample services data for the modal table
const modalTableData = [
  {
    key: '1',
    service: 'Tooth Removal',
    quantity: 1,
    transactionAmount: 'NGN 20,000',
  },
  {
    key: '2',
    service: 'Consultation',
    quantity: 1,
    transactionAmount: 'NGN 5,000',
  },
  {
    key: '3',
    service: 'Teeth Cleaning',
    quantity: 1,
    transactionAmount: 'NGN 25,000',
  },
]

// Modal table columns
const modalTableColumns = [
  {
    title: 'Serial No',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Transaction Amount',
    dataIndex: 'transactionAmount',
    key: 'transactionAmount',
  },
]

const InvoiceDetailsModal = ({
  selectedTransaction,
}: InvoiceDetailsModalProps) => {
  return (
    <div>
      {selectedTransaction && (
        <div>
          <div className="flex items-start justify-between gap-2">
            <img src="/images/shalom-logo.svg" alt="logo" />
            <span>Invoice ID: {selectedTransaction}</span>
          </div>

          <div className="grid grid-cols-2 ">
            {/* Invoice From */}
            <div className="flex flex-col items-start">
              <span className="text-[#404040] text-[14px]">Invoice From:</span>
              <span className="text-[#404040] font-bold text-[16px]">
                Shalom Dental Clinic{' '}
              </span>
              <span className="text-[#565656] text-[14px]">
                Salem House, State House.
              </span>

              <span className="text-[#404040] text-[14px] mt-1.5">
                Invoice Date : 12 Nov 2019
              </span>
            </div>

            {/* Invoice To */}
            <div className="flex flex-col items-start">
              <span className="text-[#404040] text-[14px]">Invoice To:</span>
              <span className="text-[#404040] font-bold text-[16px]">
                Joe Biden - CPD-5002
              </span>
              <span className="text-[#565656] text-[14px]">
                My Address, Benin, Edo State.
              </span>

              <span className="text-[#404040] text-[14px] mt-1.5">
                Due Date : 25 Dec 2019
              </span>
            </div>
          </div>

          {/* Table Here */}
          <Table
            columns={modalTableColumns}
            dataSource={modalTableData}
            pagination={false}
          />

          <div className="flex my-2.5 items-center justify-end">
            <span className="font-bold text-black text-[14px]">
              Total = ₦400,000
            </span>
          </div>

          <div className="flex my-2.5 items-center justify-between">
            <button className="border border-[#4880FF] rounded text-[#4880FF] px-5 py-1">
              Close{' '}
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
              <button className="flex items-center gap-2 border border-[#4880FF] rounded-[8px] text-white bg-[#4880FF] px-2.5 py-1.5">
                Pay{' '}
                <div className="bg-[#6e9aff] rounded-[5px] flex items-center justify-center p-1">
                  <Icon
                    icon="mingcute:send-fill"
                    width="16"
                    height="16"
                    className="text-white"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceDetailsModal
