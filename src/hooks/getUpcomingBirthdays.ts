import { IPatient } from '../types/types'
import { formatDate } from '../utils/utils';

export const getUpcomingBirthdays = (
  patients: IPatient[]
): Array<{ id: string; cells: React.ReactNode[] }> => {
  if (!patients || patients.length === 0) return []

  const today = new Date()
  const currentYear = today.getFullYear()

  const upcomingBirthdays = patients
    .filter((patient) => patient.date_of_birth)
    .map((patient) => {
      const dob = new Date(patient.date_of_birth)
      if (isNaN(dob.getTime())) return null

      let birthdayThisYear = new Date(
        currentYear,
        dob.getMonth(),
        dob.getDate()
      )
      if (birthdayThisYear < today) {
        birthdayThisYear = new Date(
          currentYear + 1,
          dob.getMonth(),
          dob.getDate()
        )
      }

      const daysUntil = Math.ceil(
        (birthdayThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )

      return {
        id: `evt-${patient.id}`,
        patient,
        birthday: birthdayThisYear,
        daysUntil,
        cells: [
          formatDate(birthdayThisYear.toISOString()), 
          patient.name,
          `Birthday${daysUntil === 0 ? ' (Today)' : ''}`,
        ],
      }
    })
    .filter(Boolean)
    .sort((a, b) => a!.daysUntil - b!.daysUntil)

  return upcomingBirthdays.slice(0, 5) as Array<{
    id: string
    cells: React.ReactNode[]
  }>
}
