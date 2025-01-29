import { Icon } from '@iconify/react'
import { Table } from 'antd'
import { getAuthCookie } from '../../../api/axiosInstance'

// New Table for Patient History
const PatientHistoryFormSection = () => {
  const authState = getAuthCookie()
  const role = authState?.role?.name
  // Define columns based on role
  const columns = [
    {
      title: <span className="text-[#69686A] text-[12px]">Date</span>,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <span className="text-[#69686A] text-[12px]">Purpose</span>,
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: <span className="text-[#69686A] text-[12px]">Doctor</span>,
      dataIndex: 'doctor',
      key: 'doctor',
    },
    ...(role === 'FACILITY NURSE' || 'FACILITY DOCTOR'
      ? [
          {
            title: (
              <span className="text-[#69686A] text-[12px]">Blood Pressure</span>
            ),
            dataIndex: 'bloodPressure',
            key: 'bloodPressure',
          },
          {
            title: (
              <span className="text-[#69686A] text-[12px]">Other Pressure</span>
            ),
            dataIndex: 'otherPressure',
            key: 'otherPressure',
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
      : [
          // {
          //   key: 'action',
          //   render: () => (
          //     <div className="flex items-center gap-1 text-[#0061FF] cursor-pointer">
          //       <Icon icon="bx:unlink" width="16" height="16" />
          //       <span className="underline text-[12px]">Unlink</span>
          //     </div>
          //   ),
          // },
        ]),
  ]

  // Sample data with additional fields for demonstration
  const data = [
    {
      key: '1',
      date: '04 Sep 2019',
      purpose: 'Consultation',
      doctor: 'Dr. Smith',
      bloodPressure: '120/80',
      otherPressure: '80/60',
    },
    {
      key: '2',
      date: '24 Sep 2019',
      purpose: 'Follow-up',
      doctor: 'Dr. Brown',
      bloodPressure: '130/85',
      otherPressure: '85/65',
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="shadow rounded"
      />
    </div>
  )
}

export default PatientHistoryFormSection
