import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const DashboardMetricCard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Today')
  const options = ['Today', 'Yesterday', 'Last Week', 'Last Month']

  return (
    <div className="rounded-lg h-[95px] bg-white p-3.5 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-gray-600">New Patients</div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <span className="border-b border-gray-300">{selected}</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {isOpen && (
              <div className="z-10 absolute right-0 top-full mt-1 w-36 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {options.map((option) => (
                  <button
                    key={option}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setSelected(option)
                      setIsOpen(false)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">20</div>
      </div>
    </div>
  )
}

export default DashboardMetricCard
