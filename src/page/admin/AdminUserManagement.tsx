import React, { useState } from 'react'
import { useRoles } from '../../api/hooks/useFetchRoles'
import {
  useUsers,
  useUser,
  useAddUser,
  useUpdateUser,
  useDeleteUser,
  User,
  AddUserPayload,
  UpdateUserPayload,
} from '../../api/hooks/useUsers'
import Layout from '../../layout/HealthHubLayout'
import HeaderSection from '../../component/common/HeaderSection'
import { Role } from '../../types/types'

const AdminUserManagement: React.FC = () => {
  // State management
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Fetch users data
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useUsers(page, perPage)

  // Fetch roles data
  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
  } = useRoles()

  // Fetch selected user data
  const { data: userData } = useUser(selectedUserId)

  // Mutations
  const addUserMutation = useAddUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  // Handle add user form submission
  const handleAddUser = (userData: AddUserPayload) => {
    addUserMutation.mutate(userData, {
      onSuccess: () => {
        setIsAddUserModalOpen(false)
      },
    })
  }

  // Handle update user form submission
  const handleUpdateUser = (userData: UpdateUserPayload) => {
    updateUserMutation.mutate(userData, {
      onSuccess: () => {
        setIsEditUserModalOpen(false)
        setSelectedUserId(null)
      },
    })
  }

  // Handle user deletion
  const handleDeleteUser = () => {
    if (selectedUserId) {
      deleteUserMutation.mutate(
        { user_id: selectedUserId },
        {
          onSuccess: () => {
            setIsDeleteModalOpen(false)
            setSelectedUserId(null)
          },
        }
      )
    }
  }

  // Handle view user button click
  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId)
    setIsViewModalOpen(true)
  }

  // Handle edit user button click
  const handleEditUser = (userId: number) => {
    setSelectedUserId(userId)
    setIsEditUserModalOpen(true)
  }

  // Handle delete user button click
  const handleOpenDeleteModal = (userId: number) => {
    setSelectedUserId(userId)
    setIsDeleteModalOpen(true)
  }

  // Loading state
  if (isLoadingUsers || isLoadingRoles) {
    return (
      <Layout>
        <div className="flex justify-center p-8">
          <span className="text-lg">Loading...</span>
        </div>
      </Layout>
    )
  }

  // Error state
  if (isErrorUsers) {
    return (
      <Layout>
        <div className="bg-red-100 p-4 rounded">
          {errorUsers?.message || 'An error occurred loading users'}
        </div>
      </Layout>
    )
  }

  if (isErrorRoles) {
    return (
      <Layout>
        <div className="bg-red-100 p-4 rounded">
          An error occurred loading roles
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <HeaderSection title="User Management" />
      <div className="container mx-auto p-4">
        <div className="flex justify-end items-end mb-6">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New User
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersData?.response.data.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name ||
                        `${user.first_name} ${user.middle_name ?? ''} ${
                          user.last_name
                        }`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewUser(user.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="text-yellow-600 hover:text-yellow-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="mr-2">Rows per page:</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value))
                setPage(1)
              }}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-1 border rounded ${
                page === 1
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {page} of {usersData?.response.last_page || 1}
            </span>
            <button
              onClick={() =>
                setPage((prev) =>
                  usersData?.response.last_page &&
                  prev < usersData.response.last_page
                    ? prev + 1
                    : prev
                )
              }
              disabled={!usersData?.response.next_page_url}
              className={`px-3 py-1 border rounded ${
                !usersData?.response.next_page_url
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modals */}
        {isAddUserModalOpen && rolesData && (
          <UserFormModal
            title="Add New User"
            onClose={() => setIsAddUserModalOpen(false)}
            onSubmit={handleAddUser}
            isSubmitting={addUserMutation.isLoading}
            isAdd={true}
            roles={rolesData.response}
          />
        )}

        {isEditUserModalOpen && userData && rolesData && (
          <UserFormModal
            title="Edit User"
            onClose={() => {
              setIsEditUserModalOpen(false)
              setSelectedUserId(null)
            }}
            onSubmit={handleUpdateUser}
            isSubmitting={updateUserMutation.isLoading}
            isAdd={false}
            roles={rolesData.response}
            initialData={{
              user_id: userData.response.profile.id,
              first_name: userData.response.profile.first_name,
              middle_name: userData.response.profile.middle_name || '',
              last_name: userData.response.profile.last_name,
              email: userData.response.profile.email,
              phone: userData.response.profile.phone || '',
              role: userData.response.role.id.toString(),
              hospital_id: userData.response.profile.hospital_id || undefined,
            }}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteConfirmationModal
            onClose={() => {
              setIsDeleteModalOpen(false)
              setSelectedUserId(null)
            }}
            onConfirm={handleDeleteUser}
            isDeleting={deleteUserMutation.isLoading}
          />
        )}

        {isViewModalOpen && userData && (
          <ViewUserModal
            userData={userData.response}
            onClose={() => {
              setIsViewModalOpen(false)
              setSelectedUserId(null)
            }}
          />
        )}
      </div>
    </Layout>
  )
}

// User Form Modal Component - Extracted to separate component file
interface UserFormModalProps {
  title: string
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
  isAdd: boolean
  roles: Role[]
  initialData?: UpdateUserPayload
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  title,
  onClose,
  onSubmit,
  isSubmitting,
  isAdd,
  roles,
  initialData,
}) => {
  const [formData, setFormData] = useState<any>(
    initialData || {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      role: roles.length > 0 ? roles[0].id.toString() : '',
      password: '',
      password_confirmation: '',
      hospital_id: '',
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id.toString()}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital ID
              </label>
              <input
                type="text"
                name="hospital_id"
                value={formData.hospital_id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {isAdd && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={isAdd}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required={isAdd}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </>
            )}
          </div>
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Delete Confirmation Modal
interface DeleteConfirmationModalProps {
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onConfirm,
  isDeleting,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-red-600">
            Confirm Deletion
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 disabled:bg-red-400"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Updated ViewUserModal component to match the API response format
interface ViewUserModalProps {
  userData: {
    profile: {
      id: number
      first_name: string
      middle_name: string | null
      last_name: string
      email: string
      phone: string | null
      hospital_id: number | null
      branch_id: number | null
      active: number
      hospital_name: string | null
      branch_name: string | null
      branch_address: string | null
    }
    role: {
      id: number
      slug: string
      name: string
    }
  }
  onClose: () => void
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ userData, onClose }) => {
  const { profile, role } = userData

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">User Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">ID</p>
              <p className="mt-1">{profile.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="mt-1">{role.name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1">
                {`${profile.first_name} ${profile.middle_name || ''} ${
                  profile.last_name
                }`}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{profile.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1">{profile.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1">{profile.active ? 'Active' : 'Inactive'}</p>
            </div>
            {profile.hospital_id && (
              <div>
                <p className="text-sm font-medium text-gray-500">Hospital ID</p>
                <p className="mt-1">{profile.hospital_id}</p>
              </div>
            )}
            {profile.hospital_name && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Hospital Name
                </p>
                <p className="mt-1">{profile.hospital_name}</p>
              </div>
            )}
            {profile.branch_id && (
              <div>
                <p className="text-sm font-medium text-gray-500">Branch ID</p>
                <p className="mt-1">{profile.branch_id}</p>
              </div>
            )}
            {profile.branch_name && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Branch Name</p>
                <p className="mt-1">{profile.branch_name}</p>
              </div>
            )}
            {profile.branch_address && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Branch Address
                </p>
                <p className="mt-1">{profile.branch_address}</p>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminUserManagement
