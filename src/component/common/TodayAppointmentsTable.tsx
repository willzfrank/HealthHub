import { Icon } from '@iconify/react'
import useAdminStats from '../../api/hooks/useAdminStats'
import { IAppointmentItem } from '../../types/types'
import { formatDate } from '../../utils/utils'
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react'

interface TodayAppointmentsTableProps {
  showModal?: (record: IAppointmentItem) => void
}

const TodayAppointmentsTable = ({ showModal }: TodayAppointmentsTableProps) => {
  const { data: adminData, isLoading, error } = useAdminStats()
  const appointments = adminData?.response?.appointments_today ?? []

  const tableData = appointments.map((appointment: IAppointmentItem) => ({
    id: appointment.id,
    dateTime: formatDate(appointment.scheduled_date ?? ''),
    patientId: appointment.file_number,
    patientName: appointment.patient_name,
    purpose: appointment.consultation_name,
    doctor: appointment.doctor,
    vitals: appointment.vitals_status === 'done' ? 'Done' : 'Pending',
    record: appointment,
  }))

  return (
    <div className="mt-8 bg-white p-6 rounded-[10px] overflow-x-auto">
      <h2 className="mb-2.5 text-[#030229] text-[18px] font-bold opacity-70">
        Today’s Appointments
      </h2>
      <table className="w-full table-auto border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-[#E0E0E0]">
            <th className="px-4 pt-2 text-left text-[#69686A] text-[15px]">
              Date/Time
            </th>
            <th className="px-4 pt-2 text-left text-[#69686A] text-[15px]">
              Patient ID
            </th>
            <th className="px-4 pt-2 text-left text-[#69686A] text-[15px]">
              Patient Name
            </th>
            <th className="px-4 pt-2 text-left text-[#69686A] text-[15px]">
              Purpose
            </th>
            <th className="px-4 pt-2 text-left text-[#69686A] text-[15px]">
              Doctor
            </th>
            <th className="px-4 pt-2 text-left text-[#69686A] text-[15px]">
              Vitals
            </th>
            <th className="px-4 pt-2 text-left text-[#69686A] text-[15px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map(
              (item: {
                id: Key | null | undefined
                dateTime:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined
                patientId:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined
                patientName:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined
                purpose:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined
                doctor:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined
                vitals:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined
                record: IAppointmentItem
              }) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-[#030229] text-[15px]">
                    {item.dateTime}
                  </td>
                  <td className="px-4 py-2 text-[#030229] text-[15px]">
                    {item.patientId}
                  </td>
                  <td className="px-4 py-2 text-[#030229] text-[15px]">
                    {item.patientName}
                  </td>
                  <td className="px-4 py-2 text-[#030229] text-[15px]">
                    {item.purpose}
                  </td>
                  <td className="px-4 py-2 text-[#030229] text-[15px]">
                    {item.doctor}
                  </td>
                  <td className="px-4 py-2 text-[#030229] text-[15px]">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.vitals === 'Done'
                          ? 'bg-[#ccf0eb] text-[#70d5c7]'
                          : 'bg-[#f0edcc] text-[#bbae15]'
                      }`}
                    >
                      {item.vitals}
                    </span>
                  </td>
                  <td className="text-center px-4 py-2">
                    <Icon
                      icon="bitcoin-icons:exit-outline"
                      width="20"
                      height="20"
                      onClick={() => showModal?.(item.record)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No appointments today
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TodayAppointmentsTable
