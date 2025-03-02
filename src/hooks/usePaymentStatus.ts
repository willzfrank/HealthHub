import useFetchPaymentStatuses from '../api/hooks/useFetchPaymentStatuses'

const usePaymentStatus = () => {
  const { data: paymentStatuses, isLoading } = useFetchPaymentStatuses()

  const getStatus = (statusId: number): string => {
    if (!paymentStatuses) return 'Unknown'

    const status = paymentStatuses.find(
      (status: { id: number }) => status.id === statusId
    )

    return status ? status.name : 'Unknown'
  }

  return { getStatus, isLoading }
}

export default usePaymentStatus
