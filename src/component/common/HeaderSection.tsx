import { Icon } from '@iconify/react'
import { getCurrentDateTime } from '../../utils/utils'

type HeaderSectionProps = {
  title?: string
}

const HeaderSection = ({ title }: HeaderSectionProps) => {
  const isTitleProvided = !!title

  return (
    <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
      <span
        className={`${
          isTitleProvided
            ? 'text-lg md:text-[28px] font-extrabold text-black'
            : 'text-[#696666] text-base'
        } `}
      >
        {title ? title : getCurrentDateTime()}
      </span>

      <div className="flex items-center gap-3 w-full md:w-[70%] rounded-full bg-white px-4 py-2">
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
}

export default HeaderSection
