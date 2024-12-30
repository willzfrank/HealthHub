import { Icon } from '@iconify/react'
import { getCurrentDateTime } from '../../utils/utils'

type HeaderSectionProps = {
  title?: string
}

const HeaderSection = ({ title }: HeaderSectionProps) => (
  <div className="p-4 md:p-6 flex items-center justify-between gap-4">
    <span className="text-lg font-bold text-[#696666]">
      {title ? title : getCurrentDateTime()}
    </span>
    <div className="flex items-center gap-3 w-[70%] rounded-full bg-white px-4 py-2">
      <Icon icon="material-symbols-light:search" width="24" height="24" />
      <input
        type="text"
        placeholder="Search for anything..."
        aria-label="Search"
        className="w-full text-sm outline-none bg-transparent"
      />
    </div>
  </div>
)

export default HeaderSection
