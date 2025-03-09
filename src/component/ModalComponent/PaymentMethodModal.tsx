import { Modal } from 'antd'
import { Icon } from '@iconify/react'

type PaymentMethodModalProps = {
  visible: boolean
  onCancel: () => void
  onSelectPaymentMethod: (method: 'POS' | 'Monify') => void
}

const PaymentMethodModal = ({
  visible,
  onCancel,
  onSelectPaymentMethod,
}: PaymentMethodModalProps) => {
  return (
    <Modal
      title="Select Payment Method"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-between p-4 border rounded"
          onClick={() => onSelectPaymentMethod('POS')}
        >
          <span>POS</span>
          <Icon icon="mdi:credit-card" width="24" height="24" />
        </button>
        <button
          className="flex items-center justify-between p-4 border rounded"
          onClick={() => onSelectPaymentMethod('Monify')}
        >
          <span>Monify</span>
          <Icon icon="mdi:bank-transfer" width="24" height="24" />
        </button>
      </div>
    </Modal>
  )
}

export default PaymentMethodModal
