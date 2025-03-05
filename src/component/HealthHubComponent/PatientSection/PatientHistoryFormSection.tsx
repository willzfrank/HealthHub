import { Icon } from '@iconify/react'
import { Table } from 'antd'

type MedicalHistoryItem = {
  id: number
  date: string
  doctor_comment: string | null
  doctor: string
}

type Props = {
  medicalHistory: MedicalHistoryItem[]
}

const PatientHistoryFormSection = ({ medicalHistory }: Props) => {
  const columns = [
    {
      title: <span className="text-[#69686A] text-[12px]">Date</span>,
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: <span className="text-[#69686A] text-[12px]">Doctor</span>,
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: <span className="text-[#69686A] text-[12px]">Comment</span>,
      dataIndex: 'doctor_comment',
      key: 'doctor_comment',
      render: (comment: string | null) => comment || 'N/A',
    },
    {
      title: <span className="text-[#69686A] text-[12px]">Action</span>,
      key: 'action',
      render: () => (
        <div className="flex items-center gap-1 text-[#0061FF] cursor-pointer">
          <Icon icon="mdi:eye" width="16" height="16" />
          <span className="underline text-[12px]">View</span>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={medicalHistory}
        pagination={false}
        className="shadow rounded"
      />
    </div>
  )
}

export default PatientHistoryFormSection
