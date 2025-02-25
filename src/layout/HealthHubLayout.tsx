import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { getAuthCookie, removeAuthCookie } from '../api/axiosInstance'
import { getDashboardPath } from '../utils/utils'

type MenuItem = {
  label: string
  icon: React.ReactNode
  path: string
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <Icon icon="mage:dashboard-fill" width="24" height="24" />,
    path: '/',
  },
  {
    label: 'Patients',
    icon: <Icon icon="guidance:in-patient" width="24" height="24" />,
    path: '/patients',
  },
  {
    label: 'Appointments',
    icon: <Icon icon="teenyicons:appointments-solid" width="15" height="15" />,
    path: '/appointments',
  },
  {
    label: 'Bills',
    icon: <Icon icon="hugeicons:invoice-03" width="24" height="24" />,
    path: '/accountant-bills',
  },
  {
    label: 'Transactions',
    icon: <Icon icon="tdesign:undertake-transaction" width="24" height="24" />,
    path: '/transactions',
  },
  {
    label: 'Invoice',
    icon: <Icon icon="ph:invoice-fill" width="24" height="24" />,
    path: '/invoice',
  },
  {
    label: 'Procedures',
    icon: <Icon icon="mdi:medical-bag" width="24" height="24" />,
    path: '/accountant-procedures',
  },
  {
    label: 'Staffs',
    icon: <Icon icon="guidance:care-staff-area" width="24" height="24" />,
    path: '/staffs',
  },
  {
    label: 'Settings',
    icon: <Icon icon="weui:setting-filled" width="24" height="24" />,
    path: '/settings',
  },
]

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const authState = getAuthCookie()
  const user = authState?.user
  const role = authState?.role

  const navigate = useNavigate()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleResize = () => setIsMobile(mediaQuery.matches)

    handleResize() // Initialize on mount
    mediaQuery.addEventListener('change', handleResize)

    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true) // Always collapsed on mobile
    }
  }, [isMobile])

  const roleBasedMenu = {
    doctor: ['Dashboard', 'Patients', 'Appointments', 'Settings'],
    nurse: ['Dashboard', 'Patients', 'Appointments', 'Settings'],
    accountant: [
      'Dashboard',
      'Patients',
      'Bills',
      'Transactions',
      'Invoice',
      // 'Procedures',
      'Settings',
    ],
    admin: [
      'Dashboard',
      'Patients',
      'Bills',
      'Transactions',
      'Procedures',
      'Staffs',
      'Settings',
    ],
    receptionist: [
      'Dashboard',
      'Appointments',
      'Patients',
      'Bills',
      'Settings',
    ],
  }

  const filteredMenuItems = menuItems
    .filter((item) => {
      const roleName = role?.name?.toLowerCase() ?? ''
      if (roleName.includes('doctor'))
        return roleBasedMenu.doctor.includes(item.label)
      if (roleName.includes('nurse'))
        return roleBasedMenu.nurse.includes(item.label)
      if (roleName.includes('accountant'))
        return roleBasedMenu.accountant.includes(item.label)
      if (roleName.includes('admin'))
        return roleBasedMenu.admin.includes(item.label)
      if (roleName.includes('receptionist'))
        return roleBasedMenu.receptionist.includes(item.label)

      return true
    })
    .map((item) => {
      if (item.label === 'Dashboard') {
        return { ...item, path: getDashboardPath(role?.name ?? '') }
      }
      if (item.label === 'Appointments') {
        if (role?.name?.toLowerCase().includes('doctor')) {
          return { ...item, path: '/doctor-appointment' }
        }
        if (role?.name?.toLowerCase().includes('nurse')) {
          return { ...item, path: '/nurse-appointment' }
        }
        return { ...item, path: '/appointments' }
      }
      return item
    })

  const handleLogout = () => {
    removeAuthCookie()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-white shadow-lg flex flex-col justify-between transition-all duration-300`}
      >
        {/* Navigation Menu */}
        <div>
          <div className="flex justify-between items-center p-4">
            {!isCollapsed && !isMobile && (
              <img
                src="/images/healthhub/healthhub_logo.svg"
                alt="logo"
                className="w-[100px] h-16"
              />
            )}
            {!isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-600 hover:text-gray-800 flex items-center justify-center rounded-full p-2 bg-gray-200"
              >
                <Icon
                  icon={
                    isCollapsed
                      ? 'mdi-light:chevron-double-left'
                      : 'mdi-light:chevron-double-right'
                  }
                  width="20"
                  height="20"
                />
              </button>
            )}
          </div>
          <nav className="space-y-2 mt-8">
            {filteredMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-600 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0061FF] to-white text-white'
                      : 'hover:bg-gray-200'
                  }`
                }
                aria-label={item.label}
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Fixed Logo */}
        <div className="p-4">
          <img
            src="/images/healthhub/powered_by_blouza_image.svg"
            alt="Company Logo"
            className={`mx-auto transition-all duration-300 ${
              isCollapsed ? 'w-16' : 'w-32'
            }`}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#E8EEFF] p-2.5 md:p-5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center rounded-[10px] bg-white p-4 ">
            <div>
              <span className="text-[#030229] opacity-40 text-[22px]">
                Welcome Back,{' '}
              </span>
              <span className="font-bold text-[22px]">{user?.first_name}!</span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src="/images/placeholder_image.svg"
                alt=""
                className="rounded w-[45px] h-[45px]"
              />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="text-[10px] opacity-50">
                  {role?.name === 'RECEPTIONIST FACILITY'
                    ? 'RECEPTIONIST'
                    : role?.name}
                </span>
              </div>
              <button onClick={handleLogout} title="logout">
                <Icon
                  icon="majesticons:logout"
                  width="24"
                  height="24"
                  className="text-[#030229] opacity-40"
                />
              </button>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

export default Layout
