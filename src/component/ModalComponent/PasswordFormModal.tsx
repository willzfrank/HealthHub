import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import useChangePassword from '../../api/hooks/useChangePassword'
import { toast } from 'react-hot-toast'

type PasswordFormModalProps = {
  showPassword: {
    current: boolean
    new: boolean
    confirm: boolean
  }
  togglePasswordVisibility: (field: 'current' | 'new' | 'confirm') => void
}

interface PasswordErrors {
  current: string
  new: string
  confirm: string
}

const PasswordFormModal = ({
  showPassword,
  togglePasswordVisibility,
}: PasswordFormModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<PasswordErrors>({
    current: '',
    new: '',
    confirm: '',
  })
  const [passwordStrength, setPasswordStrength] = useState(0)

  const changePasswordMutation = useChangePassword()

  // Password strength criteria
  const checkPasswordStrength = (password: string) => {
    let strength = 0
    const criteria = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ]

    strength = criteria.filter(Boolean).length
    setPasswordStrength(strength)
  }

  useEffect(() => {
    checkPasswordStrength(newPassword)
  }, [newPassword])

  const validateForm = () => {
    const newErrors = { current: '', new: '', confirm: '' }
    let isValid = true

    if (!currentPassword) {
      newErrors.current = 'Current password is required'
      isValid = false
    }

    if (!newPassword) {
      newErrors.new = 'New password is required'
      isValid = false
    } else if (newPassword.length < 8) {
      newErrors.new = 'Password must be at least 8 characters'
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirm = 'Please confirm your new password'
      isValid = false
    } else if (newPassword !== confirmPassword) {
      newErrors.confirm = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChangePassword = () => {
    if (!validateForm()) {
      return
    }

    changePasswordMutation.mutate({
      old_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    })
  }

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500'
      case 2:
      case 3:
        return 'bg-yellow-500'
      case 4:
      case 5:
        return 'bg-green-500'
      default:
        return 'bg-gray-200'
    }
  }

  const renderPasswordInput = (
    id: string,
    label: string,
    value: string,
    onChange: (value: string) => void,
    type: 'current' | 'new' | 'confirm',
    placeholder: string
  ) => (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="text-[#0061FF] text-[15px] mb-2 font-medium flex justify-between items-center"
      >
        {label}
        {errors[type] && (
          <span className="text-red-500 text-xs">{errors[type]}</span>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword[type] ? 'text' : 'password'}
          placeholder={placeholder}
          className={`p-3 border ${
            errors[type] ? 'border-red-500' : 'border-[#CCCCCC]'
          } rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA] w-full transition-colors`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(type)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Icon
            icon={showPassword[type] ? 'mdi:eye-off' : 'mdi:eye'}
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col gap-4">
        {renderPasswordInput(
          'currentPassword',
          'Current Password',
          currentPassword,
          setCurrentPassword,
          'current',
          'Enter your current password'
        )}

        {renderPasswordInput(
          'newPassword',
          'New Password',
          newPassword,
          setNewPassword,
          'new',
          'Enter your new password'
        )}

        {newPassword && (
          <div className="space-y-2">
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index < passwordStrength
                      ? getStrengthColor()
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-600">
              Password strength:{' '}
              {passwordStrength <= 1
                ? 'Weak'
                : passwordStrength <= 3
                ? 'Medium'
                : 'Strong'}
            </div>
          </div>
        )}

        {renderPasswordInput(
          'confirmPassword',
          'Confirm New Password',
          confirmPassword,
          setConfirmPassword,
          'confirm',
          'Confirm your new password'
        )}
      </div>

      <button
        type="button"
        onClick={handleChangePassword}
        disabled={changePasswordMutation.isLoading}
        className="w-full bg-[#0061FF] text-white p-3 rounded-md font-medium hover:bg-[#355bcc] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {changePasswordMutation.isLoading ? (
          <>
            <Icon icon="eos-icons:loading" className="animate-spin" />
            <span>Changing Password...</span>
          </>
        ) : (
          'Apply Change'
        )}
      </button>

      <div className="text-sm text-gray-600">
        <p>Password must contain:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li className={newPassword.length >= 8 ? 'text-green-600' : ''}>
            At least 8 characters
          </li>
          <li className={/[A-Z]/.test(newPassword) ? 'text-green-600' : ''}>
            One uppercase letter
          </li>
          <li className={/[a-z]/.test(newPassword) ? 'text-green-600' : ''}>
            One lowercase letter
          </li>
          <li className={/[0-9]/.test(newPassword) ? 'text-green-600' : ''}>
            One number
          </li>
          <li
            className={/[^A-Za-z0-9]/.test(newPassword) ? 'text-green-600' : ''}
          >
            One special character
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PasswordFormModal
