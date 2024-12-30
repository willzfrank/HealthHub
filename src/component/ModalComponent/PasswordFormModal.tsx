import { Icon } from '@iconify/react'
import React from 'react'

type PasswordFormModalProps = {
  showPassword: {
    current: boolean
    new: boolean
    confirm: boolean
  }
  togglePasswordVisibility: (field: 'current' | 'new' | 'confirm') => void
}

const PasswordFormModal = ({
  showPassword,
  togglePasswordVisibility,
}: PasswordFormModalProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Current Password */}
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="currentPassword"
          className="text-[#0061FF] text-[15px] mb-2 font-medium"
        >
          Current Password
        </label>
        <div className="relative">
          <input
            id="currentPassword"
            type={showPassword.current ? 'text' : 'password'}
            placeholder="Enter your current password"
            className="p-3 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('current')}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            <Icon
              icon={showPassword.current ? 'mdi:eye-off' : 'mdi:eye'}
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>

      {/* New Password */}
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="newPassword"
          className="text-[#0061FF] text-[15px] mb-2 font-medium"
        >
          New Password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            type={showPassword.new ? 'text' : 'password'}
            placeholder="Enter your new password"
            className="p-3 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('new')}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            <Icon
              icon={showPassword.new ? 'mdi:eye-off' : 'mdi:eye'}
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="confirmPassword"
          className="text-[#0061FF] text-[15px] mb-2 font-medium"
        >
          Confirm New Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showPassword.confirm ? 'text' : 'password'}
            placeholder="Enter your confirm password"
            className="p-3 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirm')}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            <Icon
              icon={showPassword.confirm ? 'mdi:eye-off' : 'mdi:eye'}
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center w-full">
        <button
          type="button"
          className="w-full md:w-max bg-[#0061FF] text-white p-3 rounded-md font-medium hover:bg-[#355bcc] transition-colors"
        >
          Apply Change
        </button>
      </div>
    </div>
  )
}

export default PasswordFormModal
