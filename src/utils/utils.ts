export const getCurrentDateTime = () => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  return date.toLocaleDateString('en-US', options)
}
