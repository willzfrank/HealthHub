import { Modal, Input } from 'antd'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

type PaymentMethodModalProps = {
  visible: boolean
  onCancel: () => void
  onSelectPaymentMethod: (
    method: 'POS' | 'Monify',
    posReceiptNo?: string
  ) => void
  setPosReceiptNo: React.Dispatch<React.SetStateAction<string>>
  posReceiptNo: string
}

const PaymentMethodModal = ({
  visible,
  onCancel,
  onSelectPaymentMethod,
  setPosReceiptNo,
  posReceiptNo,
}: PaymentMethodModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'POS' | 'Monify' | null>(null)
  const [showPosInput, setShowPosInput] = useState(false)

  const handleSelectPaymentMethod = (method: 'POS' | 'Monify') => {
    setSelectedMethod(method)

    if (method === 'POS') {
      setShowPosInput(true)
    } else {
      onSelectPaymentMethod(method)
    }
  }

  const handleSubmitPosReceipt = () => {
    if (!posReceiptNo.trim()) {
      toast.error('POS Receipt Number cannot be empty')
      return
    }

    if (posReceiptNo.trim().length < 8) {
      toast.error('The transaction ID must be at least 8 characters')
      return
    }

    onSelectPaymentMethod('POS', posReceiptNo)

    // Reset states
    setPosReceiptNo('')
    setShowPosInput(false)
    setSelectedMethod(null)
  }

  const handleCancel = () => {
    // Reset states
    setPosReceiptNo('')
    setShowPosInput(false)
    setSelectedMethod(null)
    onCancel()
  }

  return (
    <Modal title="Select Payment Method" open={visible} onCancel={handleCancel} footer={null}>
      {!showPosInput ? (
        <div className="flex flex-col gap-4">
          <button
            className="flex items-center justify-between p-4 border rounded"
            onClick={() => handleSelectPaymentMethod('POS')}
          >
            <span>POS</span>
            <Icon icon="mdi:credit-card" width="24" height="24" />
          </button>
          <button
            className="flex items-center justify-between p-4 border rounded"
            onClick={() => handleSelectPaymentMethod('Monify')}
          >
            <span>Monify</span>
            <Icon icon="mdi:bank-transfer" width="24" height="24" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="mb-2">
            <label htmlFor="posReceiptNo" className="block text-sm font-medium text-gray-700 mb-1">
              Enter POS Receipt Number:
            </label>
            <Input
              id="posReceiptNo"
              value={posReceiptNo}
              onChange={(e) => setPosReceiptNo(e.target.value)}
              placeholder="e.g., POS12345678"
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button className="border border-gray-300 rounded px-4 py-2" onClick={() => setShowPosInput(false)}>
              Back
            </button>
            <button
              className="bg-[#4880FF] text-white rounded px-4 py-2"
              onClick={handleSubmitPosReceipt}
              disabled={!posReceiptNo.trim()}
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default PaymentMethodModal
