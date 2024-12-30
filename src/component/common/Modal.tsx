import React from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  centerTitle?: boolean
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  centerTitle,
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2
            className={`text-lg font-semibold flex-1 ${
              centerTitle ? 'text-center' : ''
            }`}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-[#4F4F4F] hover:text-gray-700 bg-[#E5E5E5] rounded-full hover:bg-gray-100"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
