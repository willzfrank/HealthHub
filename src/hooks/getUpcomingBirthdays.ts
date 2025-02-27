import { IPatient } from "../types/types";

export const getUpcomingBirthdays = (
  patients: IPatient[]
): Array<{ id: string; cells: React.ReactNode[] }> => {
  if (!patients || patients.length === 0) return []

  const today = new Date()
  const currentYear = today.getFullYear()

  // Process birthdays with sorting info
  const upcomingBirthdays = patients
    .filter((patient) => patient.date_of_birth) 
    .map((patient) => {
      const dob = new Date(patient.date_of_birth)
      if (isNaN(dob.getTime())) return null

      // Calculate birthday for current year
      let birthdayThisYear = new Date(
        currentYear,
        dob.getMonth(),
        dob.getDate()
      )

      // If birthday has passed, show next year's birthday
      if (birthdayThisYear < today) {
        birthdayThisYear = new Date(
          currentYear + 1,
          dob.getMonth(),
          dob.getDate()
        )
      }

      // Calculate days until birthday
      const daysUntil = Math.ceil(
        (birthdayThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )

      return {
        id: `evt-${patient.id}`,
        patient,
        birthday: birthdayThisYear,
        daysUntil,
        cells: [
          birthdayThisYear.toLocaleDateString(),
          patient.name,
          `Birthday${daysUntil === 0 ? ' (Today)' : ''}`,
        ],
      }
    })
    .filter(Boolean)
    .sort((a, b) => a!.daysUntil - b!.daysUntil) // Sort by closest upcoming birthday

  // Take first 5 upcoming birthdays or however many you want to display
  return upcomingBirthdays.slice(0, 5) as Array<{
    id: string
    cells: React.ReactNode[]
  }>
}
