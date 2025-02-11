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

const dashboardPaths: Record<string, string> = {
  doctor: '/doctor-dashboard',
  nurse: '/nurse-dashboard',
  accountant: '/accountant-dashboard',
  admin: '/accountant-dashboard',
}

export const getDashboardPath = (roleName: string) => {
  const lowerCaseRole = roleName.toLowerCase()

  for (const key in dashboardPaths) {
    if (lowerCaseRole.includes(key)) {
      return dashboardPaths[key]
    }
  }

  return '/'
}
