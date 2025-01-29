import { useState } from 'react'
import Layout from '../layout/HealthHubLayout'
import PasswordFormModal from '../component/ModalComponent/PasswordFormModal'
import Modal from '../component/common/Modal'
import useUpdateProfile from '../api/hooks/useUpdateProfile'
import useGetProfile from '../api/hooks/useGetProfile'
import { LoadingOutlined } from '@ant-design/icons'
import { InputField } from '../component/HealthHubComponent/SettingsSection/InputField'

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const { mutate: updateProfile, isLoading, error } = useUpdateProfile()
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetProfile()

  console.log('profile', profile?.response?.profile)

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    const email = (e.target as any).email.value
    const phone = (e.target as any).phone.value
    updateProfile({ email, phone })
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  if (profileLoading) {
    return (
      <Layout>
        <div className="p-2.5 md:p-6">
          <h2 className="text-[32px] font-bold text-[#030229] mb-6 font-nunito">
            Settings
          </h2>
          {/* Profile Skeleton Loader */}
          <div className="rounded-[14px] bg-white p-6 animate-pulse">
            <div className="mb-8 max-w-lg mx-auto">
              <div className="flex items-center gap-4 flex-col">
                <div className="rounded-full w-[86px] h-[86px] bg-[#e0e0e0]" />
                <div className="w-32 h-4 bg-[#e0e0e0] mt-2 rounded-md" />
              </div>
            </div>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6 w-full">
                <div className="h-12 w-full bg-[#e0e0e0] rounded-md" />
                <div className="h-12 w-full bg-[#e0e0e0] rounded-md" />
                <div className="h-12 w-full bg-[#e0e0e0] rounded-md" />
                <div className="h-12 w-full bg-[#e0e0e0] rounded-md" />
                <div className="h-12 w-full bg-[#e0e0e0] rounded-md" />
                <div className="h-12 w-full bg-[#e0e0e0] rounded-md" />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    )
  }

  if (profileError) {
    return <div>Error loading profile: {profileError.message}</div>
  }

  return (
    <Layout>
      <div className="p-2.5 md:p-6">
        {/* Page Header */}
        <h2 className="text-[32px] font-bold text-[#030229] mb-6 font-nunito">
          Settings
        </h2>

        {/* Profile Section */}
        <div className="rounded-[14px] bg-white p-6">
          <div className="mb-8 max-w-lg mx-auto">
            <div className="flex items-center gap-4 flex-col">
              <img
                src="/images/placeholder_image.svg"
                alt="Profile"
                className="rounded-full w-[86px] h-[86px] object-cover"
              />
              <button
                type="button"
                className="text-[14px] font-[600] font-nunito text-[#4379EE] hover:text-[#355bcc] transition-colors"
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6 w-full">
              <InputField
                label="First Name"
                type="text"
                id="firstName"
                defaultValue={profile?.response?.profile?.first_name || ''}
                placeholder="Enter your first name"
              />
              <InputField
                label="Last Name"
                type="text"
                id="lastName"
                defaultValue={profile?.response?.profile?.last_name || ''}
                placeholder="Enter your last name"
              />
              <InputField
                label="Email"
                type="email"
                id="email"
                defaultValue={profile?.response?.profile?.email || ''}
                placeholder="Enter your email"
              />
              <InputField
                label="Phone Number"
                type="tel"
                id="phone"
                defaultValue={profile?.response?.profile?.phone || ''}
                placeholder="Enter your phone number"
              />
              {/* Role */}
              <div className="flex flex-col">
                <label
                  htmlFor="role"
                  className="text-[#666666] text-[15px] mb-2 font-medium"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="p-3 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA]"
                >
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
              {/* Office */}
              <div className="flex flex-col">
                <label
                  htmlFor="office"
                  className="text-[#666666] text-[15px] mb-2 font-medium"
                >
                  Office
                </label>
                <select
                  id="office"
                  name="office"
                  className="p-3 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:border-[#4379EE] focus:ring-1 focus:ring-[#4379EE] bg-[#F5F6FA]"
                >
                  <option value="shalom">Shalom, Benin</option>
                  <option value="dubai">Dubai, UAE</option>
                </select>
              </div>
            </div>

            <div className="flex items-center md:flex-row flex-col gap-2.5 max-w-4xl mx-auto justify-between">
              <button
                type="button"
                className="md:w-max w-full bg-[#0061FF] text-white p-3 rounded-md font-medium hover:bg-[#355bcc] transition-colors font-nunito"
                onClick={() => setIsOpen(true)}
              >
                Change Password
              </button>
              <div className="flex w-full md:w-auto items-center md:flex-row flex-col gap-2.5">
                <button
                  type="button"
                  className="md:w-max w-full border border-[#0061FF] text-[#0061FF] p-3 rounded-[4px] font-medium transition-colors font-nunito"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="md:w-max w-full bg-[#0061FF] text-white p-3 rounded-md font-medium hover:bg-[#355bcc] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingOutlined
                      style={{
                        fontSize: '16px',
                        marginRight: '8px',
                        color: 'white',
                      }}
                      spin
                    />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Change Password"
      >
        <PasswordFormModal
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </Modal>
    </Layout>
  )
}

export default Settings
