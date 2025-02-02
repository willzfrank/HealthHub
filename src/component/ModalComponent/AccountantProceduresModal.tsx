import React, { useState } from 'react'

type Props = {}

const AccountantProceduresModal = (props: Props) => {
  const [formData, setFormData] = useState({
    procedureName: '',
    price: '',
    description: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <h3 className="text-[#030229] text-2xl font-semibold text-center mb-8">
        New Procedure
      </h3>

      <form className="space-y-6">
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
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-[#0061FF]"
            >
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                ₦
              </span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 outline-none transition duration-200 text-gray-800 bg-white"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-[#0061FF]"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 outline-none transition duration-200 text-gray-800 bg-white resize-none"
            placeholder="Enter procedure description"
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            className="w-1/2 py-2.5 px-6 rounded-lg border-2 border-[#0061FF] text-[#0061FF] font-semibold hover:bg-[#0061FF]/5 transition duration-200"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="w-1/2 py-2.5 px-6 rounded-lg bg-[#0061FF] text-white font-semibold hover:bg-[#0061FF]/90 transition duration-200"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountantProceduresModal
