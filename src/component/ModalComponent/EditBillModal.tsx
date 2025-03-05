import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { toast } from 'react-hot-toast'
import { useUpdateBill } from '../../api/hooks/useAddBill'

type EditBillModalProps = {
  isEditModalOpen: boolean
  setIsEditModalOpen: (open: boolean) => void
  billData: {
    id: string
    procedureName: string
    purchase_price: number
    selling_price: number
  } | null
}

const EditBillModal: React.FC<EditBillModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  billData,
}) => {
  // Type the state data correctly
  const [formData, setFormData] = useState<{
    id: string
    procedureName: string
    purchase_price: number
    selling_price: number
  }>({
    id: '',
    procedureName: '',
    purchase_price: 0,
    selling_price: 0,
  })

  const { mutate, isLoading } = useUpdateBill()

  useEffect(() => {
    if (billData) {
      setFormData({
        id: billData.id,
        procedureName: billData.procedureName,
        purchase_price: billData.selling_price,
        selling_price: billData.selling_price,
      })
    }
  }, [billData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newValue = name === 'procedureName' ? value : parseFloat(value) || 0

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(formData, {
      onSuccess: () => {
        toast.success('Bill updated successfully!')
        setIsEditModalOpen(false)
      },
    })
  }

  return (
    <Modal
      visible={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={null}
    >
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
        <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
          Edit Procedure
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="procedureName"
                className="block text-sm font-semibold text-[#0061FF]"
              >
                Procedure Name
              </label>
              <input
                type="text"
                id="procedureName"
                name="procedureName"
                value={formData.procedureName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 outline-none transition duration-200 text-gray-800 bg-white"
                placeholder="Enter procedure name"
                required
              />
            </div>

            {/* <div className="space-y-2">
              <label
                htmlFor="purchase_price"
                className="block text-sm font-semibold text-[#0061FF]"
              >
                Purchase Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₦
                </span>
                <input
                  type="number"
                  id="purchase_price"
                  name="purchase_price"
                  value={formData.purchase_price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 outline-none transition duration-200 text-gray-800 bg-white"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div> */}

            <div className="space-y-2">
              <label
                htmlFor="selling_price"
                className="block text-sm font-semibold text-[#0061FF]"
              >
                Selling Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₦
                </span>
                <input
                  type="number"
                  id="selling_price"
                  name="selling_price"
                  value={formData.selling_price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 outline-none transition duration-200 text-gray-800 bg-white"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-6 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 bg-white hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-[#0061FF] text-white text-sm disabled:bg-[#0061FF]/50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditBillModal
