import axiosInstance from '../axiosInstance'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export interface UserRole {
  id: number
  slug: string
  name: string
}

export interface User {
  profile: any
  id: number
  first_name: string
  middle_name: string | null
  last_name: string
  name: string
  email: string
  phone: string | null
  role: UserRole
  hospital_id: number | null
  branch_id: number | null
  state_id: number | null
  lga_id: number | null
  hospital_name: string | null
  active: number
  email_verified_at: string | null
  profile_image: string | null
  change_password: number
  default_password: string | null
}

export interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface ApiResponse<T> {
  status: boolean
  response: T
  message: string
}

export interface UsersResponse extends ApiResponse<PaginatedResponse<User>> {}

export interface SingleUserResponse extends ApiResponse<User> {}

export interface AddUserPayload {
  first_name: string
  middle_name?: string
  last_name: string
  email: string
  phone: string
  role: string
  password: string
  password_confirmation: string
  hospital_id?: number
  branch_id?: number
}

export interface UpdateUserPayload {
  user_id: number
  first_name: string
  middle_name?: string
  last_name: string
  email: string
  phone: string
  role: string
  hospital_id?: number
  branch_id?: number
}

export interface DeleteUserPayload {
  user_id: number
}

// Hook to fetch users with pagination
export const useUsers = (page: number = 1, perPage: number = 10) => {
  return useQuery<UsersResponse, Error>(['users', page, perPage], async () => {
    const response = await axiosInstance.get(
      `/admin/users/list?page=${page}&per_page=${perPage}`
    )
    return response.data
  })
}

// Hook to fetch a single user
export const useUser = (userId: number | null) => {
  return useQuery<SingleUserResponse, Error>(
    ['user', userId],
    async () => {
      const response = await axiosInstance.post('/admin/users/view', {
        user_id: userId,
      })
      return response.data
    },
    {
      enabled: !!userId,
    }
  )
}

// Hook to add a new user
export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<any>, Error, AddUserPayload>(
    async (userData) => {
      const response = await axiosInstance.post('/admin/users/add', userData)
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )
}

// Hook to update an existing user
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<any>, Error, UpdateUserPayload>(
    async (userData) => {
      const response = await axiosInstance.post('/admin/users/update', userData)
      return response.data
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['user', variables.user_id])
        queryClient.invalidateQueries('users')
      },
    }
  )
}

// Hook to delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<any>, Error, DeleteUserPayload>(
    async (userData) => {
      const response = await axiosInstance.post('/admin/users/delete', userData)
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )
}
