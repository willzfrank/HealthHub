import { useState } from 'react'
import Layout from '../layout/HealthHubLayout'
import { InputField } from '../component/HealthHubComponent/SettingsSection/InputField'
import PasswordFormModal from '../component/ModalComponent/PasswordFormModal'
import Modal from '../component/common/Modal'


const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <Layout role="receptionist">
      <div className="p-2.5 md:p-6">
        {/* Page Header */}
        <h2 className="text-[32px] font-bold text-[#030229] mb-6">Settings</h2>

        {/* Profile Section */}
        <div className="rounded-[14px] bg-white p-6 ">
          <div className=" mb-8 max-w-lg mx-auto">
            <div className="flex items-center gap-4 flex-col">
              <img
                src="/images/placeholder_image.svg"
                alt="Profile"
                className="rounded-full w-[86px] h-[86px] object-cover"
              />
              <button
                type="button"
                className="text-[14px] font-[600] text-[#4379EE] hover:text-[#355bcc] transition-colors"
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Section */}
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6 w-full">
              <InputField
                label="First Name"
                type="text"
                id="firstName"
                placeholder="Enter your first name"
              />
              <InputField
                label="Last Name"
                type="text"
                id="lastName"
                placeholder="Enter your last name"
              />
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              <InputField
                label="Phone Number"
                type="tel"
                id="phone"
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
                className="md:w-max w-full bg-[#0061FF] text-white p-3 rounded-md font-medium hover:bg-[#355bcc] transition-colors"
                onClick={() => setIsOpen(true)}
              >
                Change Password
              </button>
              <div className="flex items-center md:flex-row flex-col gap-2.5">
                <button
                  type="button"
                  className="md:w-max w-full border border-[#0061FF] text-[#0061FF] p-3 rounded-[4px] font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="md:w-max w-full bg-[#0061FF] text-white p-3 rounded-md font-medium hover:bg-[#355bcc] transition-colors"
                >
                  Save Changes
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
