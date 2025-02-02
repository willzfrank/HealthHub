import { Icon } from '@iconify/react'
import { DatePicker, Select } from 'antd'

const { RangePicker } = DatePicker

type Props = {}

const Filter = (props: Props) => {
  return (
    <div>
      <span>
        <Icon icon="icomoon-free:filter" width="16" height="16" />
        Filter By
      </span>

      <div className="space-y-4">
        <div className="rounded bg-[#F2F8FF]">
          <span className="text-[#0061FF] text-[14px]">Invoice Date</span>
          <RangePicker />
        </div>

        <div className="rounded bg-[#F2F8FF]">
          <span className="text-[#0061FF] text-[14px]">Amount</span>

          <div className="flex items-center justify-between">
            <input type="number" name="" id="" />
            <Icon icon="hugeicons:arrow-left-right" width="24" height="24" />
            <input type="number" name="" id="" />
          </div>
        </div>

        <div className="rounded bg-[#F2F8FF]">
          <span className="text-[#0061FF] text-[14px]">Procedure</span>
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            disabled
            options={[{ value: 'all', label: 'All' }]}
          />
        </div>

        <div className="rounded bg-[#F2F8FF]">
          <span className="text-[#0061FF] text-[14px]">Status</span>
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            disabled
            options={[{ value: 'all', label: 'All' }]}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
