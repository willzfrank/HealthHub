import axiosInstance from './axiosInstance'

export const logout = async () => {
  return await axiosInstance.post('api/admin/logout')
}
