import { useQuery } from "react-query"
import axiosInstance from "../axiosInstance"

const fetchPatientBills = async (page: number, perPage: number) => {
  const { data } = await axiosInstance.get(
    `/admin/patient-bills?page=${page}&per_page=${perPage}`
  )
  return data
}

export const useFetchAllPatientBillsList = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ['patient-bills', page, perPage],
    queryFn: () => fetchPatientBills(page, perPage),
    keepPreviousData: true,
  })
}
